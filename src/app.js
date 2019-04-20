import "./stylesheets/main.css";

import _ from "lodash"
import { remote, ipcRenderer, shell } from "electron";
import env from "env";
// import sband from "../../../sband"
import sband from "speckled-band"
import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { loadSections } from './lib/load-sections'
import { navigate } from './lib/nav'
import { config } from './configs/app.config'
import "./locales/context-menu.js";
// import { showResults, showPopup, queryDBs } from "./lib/parse-data"
import { queryDBs } from "./lib/parse-data"

const log = console.log
const app = remote.app;
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const axios = require('axios')

loadSections(config)
let state = settings.get('state')
if (!state || !state.lang) {
  state = {sec: config.defstate, lang: config.deflang}
}
navigate(state)

ipcRenderer.on('section', function (event, section) {
  state.sec = section
  navigate(state)
})

ipcRenderer.on('lang', function (event, lang) {
  state.lang = lang
  settings.set('state', state)
  ipcRenderer.send('lang', lang)
  remote.getCurrentWindow().reload()
})

// let coronis = "᾽"
// let rscm = "’"

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband(txt, config.code)
    log('SBAND', pars)
    if (!pars) return
    // let state = settings.get('state')
    state.sec = 'main'
    state.pars = pars
    navigate(state)
  })
  .startWatching()

let progress = q('#progress')
let message = q('#message')

document.addEventListener('click', (ev) => {
  let el = ev.target
  let data = el.dataset
  if (el.classList.contains('external')) {
    let href = el.textContent
    shell.openExternal(href)
  } else if (el.classList.contains('dict-dname')) {
    log('D-DNAME', el)
    state.sec = 'dict-edit'
    navigate(state)
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
  } else if (el.classList.contains('dict-trns-li')) {
    let ohidden = el.querySelector('.is-hidden')
    if (ohidden) ohidden.classList.remove('is-hidden')
    else {
      ohidden = el.querySelector('.dict-trns-li-hidden')
      ohidden.classList.add('is-hidden')
    }
  }
  if (!data) return
  if (data.href) {
    let over = q("#new-version")
    over.classList.add('is-hidden')
    shell.openExternal(data.href)
  } else if (data.dinfo) {
    state.sec = 'db-info'
    state.dname = data.dinfo
    navigate(state)
  } else if (data.section) {
    state.sec = data.section
    navigate(state)
  }
})

document.addEventListener("mouseover", function(ev) {
  let el = ev.target
  if (!el.textContent) return
  if (ev.ctrlKey == true) return
  // let tpar = el.closest('.tibpar')
  // if (tpar) hidePopups()

  if (el.classList.contains('active-form')) {
    if (ev.shiftKey != true) {
      queryDBs(el)
    }
  // } else if (el.classList.contains('tibwf')) {
    // showResults(el)
  // } else if (el.classList.contains('tibambi')) {
    // showPopup(el) // mouseover, tibambi
  }
}, false)


ipcRenderer.on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/pecha.js/releases/latest')
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
  let oclosest = ev.target.closest('#source') || ev.target.closest('#result')
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
