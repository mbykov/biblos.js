import "./stylesheets/main.css";

import { remote, ipcRenderer } from "electron";
import env from "env";
import sband from "speckled-band"
import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { loadSections } from './lib/load-sections'
import { navigate } from './lib/nav'
import { pageList, langList } from './lib/consts'

const log = console.log
const app = remote.app;
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
let code = 'grc'

loadSections(langList, pageList)

let state = settings.get('state')
state = {sec: 'home', lang: 'en'}, settings.set('state', state)
navigate(state)

ipcRenderer.on('lang', function (event, lang) {
  // let state = settings.get('state')
  // state.lang = lang
  settings.set('lang', lang)
  ipcRenderer.send('lang', lang)
  log('LANG:', lang)
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
    log('CLP', txt)
  })
  .startWatching()

let progress = q('#progress')
let message = q('#message')

// let home = q('#home_en')
// home.classList.remove('is-hidden')
