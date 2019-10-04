import "./stylesheets/main.css";

import _ from "lodash"
import { remote, ipcRenderer, shell } from "electron";
import env from "env";
// import sband from "../../../sband"
import sband from "speckled-band"
import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { cloneDict, moveDict, activateDict } from './lib/remote'
import { loadSections } from './lib/load-sections'
import { navigate } from './lib/nav'
import { mouseMenu } from './lib/context-menu'
import { config } from './app.config'
import { queryDBs, showSegResult, showCognate, createCognateList, showTranslit, closePopups } from "./lib/parse-data"
import { initCfg, initDBs } from './lib/remote'
import { initialReplication } from 'antrax/dist/lib/pouch'
// import { initialReplication } from '/home/michael/a/loigos/dist/lib/pouch'
const Mousetrap = require('mousetrap')

const log = console.log
const app = remote.app;
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const axios = require('axios')
const upath = app.getPath("userData")
const apath = app.getAppPath()


loadSections(config)
document.onmousedown = mouseMenu

let skip = false
let progress = q('#progress')
let state = initState()
// navigate(state)

ipcRenderer.on('section', function (event, section) {
  log('_______________ipc-section', section)
  let state = settings.get('state')
  state.sec = section
  navigate(state)
})

ipcRenderer.on('lang', function (event, lang) {
  settings.set('lang', lang)
  ipcRenderer.send('lang', lang)
  let state = settings.get('state')
  navigate(state)
  // remote.getCurrentWindow().reload()
})

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    if (skip) return
    let clean = cleanStr(txt)
    let pars = sband(clean, config.code)
    if (!pars) return
    state.sec = 'main'
    state.pars = pars
    settings.set('state', state)
    navigate(state)
    skip = false
  })
  .startWatching()

// let progress = q('#progress')
// let message = q('#message')

document.addEventListener('click', (ev) => {
  let el = ev.target
  let parent = el.parentElement
  if (el.classList.contains('external')) {
    let href = el.getAttribute('href')
    if (!href) href = el.textContent
    ev.preventDefault()
    shell.openExternal(href)
  } else if (el.classList.contains('dict-dname')) {
    state.sec = 'dict-edit'
    navigate(state)
  }  else if (parent && parent.classList.contains('table-line')) {
    // new local item
    // ============================================ унести в local !!!!!!
    let ordict = parent.firstChild
    if (!ordict) return
    let rdict = ordict.textContent
    if (!rdict) return
    state.sec = 'local-dict-item'
    navigate(state, rdict)
  }  else if (el.classList.contains('active-form') || el.classList.contains('active-dict')) {
    if (ev.ctrlKey) createCognateList(el)
    else queryDBs(el, true)
  } else if (el.classList.contains('dict-query')) {
    let odictCont = el.nextSibling
    if (odictCont && odictCont.classList.contains('is-hidden')) odictCont.classList.remove('is-hidden')
    else if (odictCont) odictCont.classList.add('is-hidden')
  } else if (el.classList.contains('dict-header') || el.classList.contains('dict-rdict') || el.classList.contains('dict-pos') || el.classList.contains('dict-gends')) {
    let ocont = el.closest('.dict-container')
    let ofls = ocont.querySelector('.dict-fls')
    let otrns = ocont.querySelector('.dict-trns')
    if (ofls && ofls.classList.contains('is-hidden')) ofls.classList.remove('is-hidden')
    else if (ofls) ofls.classList.add('is-hidden')
    if (otrns.classList.contains('is-hidden')) otrns.classList.remove('is-hidden')
    else otrns.classList.add('is-hidden')
  } else if (el.classList.contains('dict-trns-li-shown')) {
    let ohidden = el.nextSibling
    if (!ohidden) return
    if (ohidden.classList.contains('is-hidden')) {
      ohidden.classList.remove('is-hidden')
      el.classList.remove('ellipsis')
    } else {
      ohidden.classList.add('is-hidden')
      el.classList.add('ellipsis')
    }
  } else if (el.classList.contains('dict-trns-li-hidden')) {
    let oshown = el.previousSibling
    if (oshown) {
      el.classList.add('is-hidden')
      oshown.classList.add('ellipsis')
    }
  }
})

// remote-table events:
document.addEventListener('click', (ev) => {
  let el = ev.target
  let data = el.dataset
  if (!data) return
  if (data.href) {
    let over = q("#new-version")
    over.classList.add('is-hidden')
    shell.openExternal(data.href)
  } else if (data.dname) {
    moveDict(data.dname, ev.shiftKey)
  } else if (data.activate) {
    if (el.textContent != 'activate') return
    activateDict(data.activate, true)
  } else if (data.disable) {
    activateDict(data.disable, false)
  } else if (data.sync) {
    if (el.textContent != 'clone') return
    log('______________CLONE', data.sync)
    cloneDict(data.sync)
  } else if (data.section) {
    state.sec = data.section
    navigate(state)
  }
})

document.addEventListener("mouseover", function(ev) {
  let el = ev.target
  if (!el.textContent) return
  if (ev.ctrlKey) return
  if (ev.altKey) {
    if (!el.classList.contains('active-form')) return
    showTranslit(el, ev.shiftKey)
  } else if (el.classList.contains('active-form')) {
    if (el.classList.contains('active-form')) closePopups()
    queryDBs(el)
  } else if (el.classList.contains('active-dict')) {
    showSegResult(el)
  } else if (el.classList.contains('cognate-line')) {
    showCognate(el) // mouseover
  }
}, false)


ipcRenderer.on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/biblos.js/releases/latest')
    .then(function (response) {
      if (!response || !response.data) return
      let newver = response.data.name
      if (oldver && newver && newver > oldver) {
        let over = q("#new-version")
        let verTxt = ['new version available:', newver].join(' ')
        over.textContent = verTxt
        over.classList.remove('is-hidden')
      }
    })
    .catch(function (error) {
      console.log('API.GITHUB ERR')
    })
})

document.addEventListener("wheel", function(ev) {
  scrollPane(ev)
}, false)


function scrollPane(ev) {
  let oclosest = ev.target.closest('#source') || ev.target.closest('#result')  || ev.target.closest('.section')
  if (!oclosest) return
  let closeid = oclosest.id
  let osource = q('#source')
  let oresult = q('#result')
  let opane
  if (ev.shiftKey == true || ev.ctrlKey == true) {
    if (closeid == 'source') opane = oresult
    else opane = osource
  } else {
    opane = oclosest
  }
  if (!opane) return
  let delta = (ev.deltaY > 0) ? 32 : -32
  // let opane = q('.section:not(.is-hidden)')
  opane.scrollTop += delta
}

function cleanStr(row) {
  let clean = row.trim()
  clean = clean.replace(/ᾰ/gi, 'α').replace(/ᾱ/gi, 'α').replace(/ῑ/gi, 'ι').replace(/ῐ/gi, 'ι').replace(/ῠ/gi, 'υ').replace(/ῡ/gi, 'υ')
  clean = clean.replace(/̆/gi, '')
  clean = clean.replace(/-/g, '')
  clean = clean.replace(/\' /g, '᾽ ').replace(/\’ /g, '᾽ ')
  return clean
}

function initState() {
  let state = settings.get('state')
  if (!state) {
    state = {sec: config.defstate}
    settings.set('state', state)
  }

  let cfg = settings.get('cfg')
  if (!cfg) {
    progress.classList.remove('is-hidden')
    let ocloning = q('#dicts-cloning').classList.remove('is-hidden')
    let ocloned = q('#dicts-cloned').classList.add('is-hidden')
    initCfg() // +t
      .then(rcfg=> {
        rcfg = JSON.parse(JSON.stringify(rcfg))
        initialReplication(upath, rcfg, config.batch_size) // +t
          .then(cfg=>{
            initDBs(cfg)
            settings.set('cfg', cfg)
            let ocloning = q('#dicts-cloning').classList.add('is-hidden')
            let ocloned = q('#dicts-cloned').classList.remove('is-hidden')
            // progress.classList.add('is-hidden')
            navigate(state)
          })
          .catch(err=>{ log('ERR-initReplication', err.message) })
      })
  } else {
    cfg = JSON.parse(JSON.stringify(cfg))
    initDBs(cfg)
    navigate(state)
}

  let lang = settings.get('lang')
  if (!lang) {
    lang = config.deflang
    settings.set('lang', lang)
  }
  return state
}


Mousetrap.bind(['ctrl+shift+c'], function(ev) {
  let el = q('.active-form:hover')
  if (!el) return
  let wf = el.textContent
  if (!wf) return
  skip = true
  clipboard.writeText(wf)
})

Mousetrap.bind(['ctrl+c'], function(ev) {
  let el = q('.active-form:hover')
  if (!el) return
  let wf = el.textContent
  if (!wf) return
  clipboard.writeText(wf)
})

// Mousetrap.bind(['ctrl+t'], function(ev) {
//   progress.classList.remove('is-hidden')
// })

// Mousetrap.bind(['ctrl+e'], function(ev) {
//   let state = settings.get('state')
//   state.sec = 'remote-dicts'
//   navigate(state)
// })
