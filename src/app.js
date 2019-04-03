import "./stylesheets/main.css";

import { remote, ipcRenderer } from "electron";
import env from "env";
import sband from "speckled-band"
import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { loadSections } from './lib/load-sections'
import { navigate } from './lib/nav'
// import { pageList, langList } from './lib/consts'
import { config } from './configs/app.config'
import "./locales/context-menu.js";

const log = console.log
const app = remote.app;
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
let code = 'grc'

loadSections(config)

if (!settings.get('lang')) settings.set('lang', 'eng')

let state = settings.get('state')
if (!state) {
  state = {sec: 'home'}
  settings.set('state', state)
}
navigate(state)

ipcRenderer.on('section', function (event, section) {
  navigate({sec: section})
})


ipcRenderer.on('lang', function (event, lang) {
  settings.set('lang', lang)
  ipcRenderer.send('lang', lang)
  log('LANG set:', lang)
  // let lang2 = settings.get('lang')
  // log('LANG2:', lang)
})

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    // let pars = sband(txt, code)
    // if (!pars || !pars.length) return
    // let state = {sec: 'main', pars: pars}
    // navigate(state)
    // let state = {sec: 'help'}
    // navigate(state)
  })
  .startWatching()

let progress = q('#progress')
let message = q('#message')

// let home = q('#home_en')
// home.classList.remove('is-hidden')
