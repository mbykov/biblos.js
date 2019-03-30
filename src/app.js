import "./stylesheets/main.css";

import { remote } from "electron";
import env from "env";
import sband from "speckled-band"
import { q, qs, empty, create, remove, span, p, div, getInnermostHovered } from './lib/utils'
import { loadSections } from './lib/load-sections'
import { navigate } from './lib/nav'

const log = console.log
const app = remote.app;
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
let code = 'grc'

clipboard
  .on('text-changed', () => {
    let txt = clipboard.readText()
    // let pars = sband(txt, code)
    // if (!pars || !pars.length) return
    // let state = {section: 'main', pars: pars}
    // navigate(state)
    // let state = {section: 'help'}
    // navigate(state)
    log('CLP', txt)
  })
  .startWatching()

let progress = q('#progress')
let message = q('#message')

// let container = q('#container')
// let imports = qs('link[rel="import"]')
// imports.forEach(link=> {
//   let content = link.import
//   let section = content.querySelector('.section')
//   container.appendChild(section.cloneNode(true))
// })

if (!settings.get('ilang')) settings.set('ilang', 'en')
loadSections()

let state = {section: 'home'}
navigate(state)


// let home = q('#home_en')
// home.classList.remove('is-hidden')
