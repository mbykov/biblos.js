import "./stylesheets/main.css";

import _ from "lodash"
import { remote, ipcRenderer, shell } from "electron";
import env from "env";
import sband from "../../../sband"
// import sband from "speckled-band"
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

window.onbeforeunload = function () {
  // let state = settings.get('state')
  settings.set('state', state)
  ipcRenderer.send('unload', state)
}


ipcRenderer.on('section', function (event, section) {
  // let state = settings.get('state')
  state.sec = section
  navigate(state)
})

ipcRenderer.on('lang', function (event, lang) {
  state.lang = lang
  settings.set('state', state)
  ipcRenderer.send('lang', lang)
  remote.getCurrentWindow().reload()
})

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    let pars = sband(txt, config.code)
    if (!pars) return
    // let state = settings.get('state')
    state.sec = 'main'
    state.pars = pars
    navigate(state)
  })
  .startWatching()

let progress = q('#progress')
let message = q('#message')

// let home = q('#home_en')
// home.classList.remove('is-hidden')

document.addEventListener('click', (ev) => {
  let data = ev.target.dataset
  if (!data) return
  // let state = settings.get('state')
  if (ev.target.classList.contains('external')) {
    let href = ev.target.textContent
    shell.openExternal(href)
  } else if (data.href) {
    let over = q("#new-version")
    over.classList.add('is-hidden')
    shell.openExternal(data.href)
  } else if (data.section) {
    state.sec = data.section
    navigate(state)
  }
})

document.addEventListener("mouseover", function(ev) {
  if (!ev.target.textContent) return
  if (ev.ctrlKey == true) return
  // let tpar = ev.target.closest('.tibpar')
  // if (tpar) hidePopups()

  if (ev.target.classList.contains('active-form')) {
    if (ev.shiftKey != true) {
      queryDBs(ev.target)
    }
  // } else if (ev.target.classList.contains('tibwf')) {
    // showResults(ev.target)
  // } else if (ev.target.classList.contains('tibambi')) {
    // showPopup(ev.target) // mouseover, tibambi
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
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 32 : -32
  let opane = q('.section:not(.is-hidden)')
  if (!opane) return
  opane.scrollTop += delta
}
