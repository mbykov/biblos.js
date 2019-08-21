//
import _ from "lodash"
import { remote, ipcRenderer, webFrame, shell } from "electron";
import { initDBs, requestRemoteDicts } from './remote'
import { showLocalChunk, editLocalDictItem, showFullLocalDict, generateChunk } from './local-dict'
import { q, qs, empty, create, remove, span, p, div } from './utils'
import { generateDictChunk } from '/home/michael/greek/dictCSV'
import Split from 'split.js'
import { config } from '../app.config'
import { showText, toggleResults, toggleOneResult } from "./parse-data"
import path from "path";
import { readDictionary } from '/home/michael/a/loigos'
const clipboard = require('electron-clipboard-extended')
import sband from "../../../../sband"

// import { signup } from "./auth"

const app = remote.app;
const apath = app.getAppPath()
// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

const log = console.log
// const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
// const slash = require('slash')
const {getCurrentWindow} = require('electron').remote
let markdown = require( "markdown" ).markdown;

let history = []
let hstate = 0
let split
// let state

// window.onbeforeunload = function () {
// }

ipcRenderer.on('action', function (event, action) {
  if (action == 'goleft') goLeft()
  else if (action == 'goright') goRight()
})

function twoPanes(state) {
  if (split) return
  let sizes = settings.get('split-sizes') || config.splitSizes

  split = Split(['#source', '#result'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      settings.set('split-sizes', sizes)
      getCurrentWindow().reload()
    }
  })
  if (state.mono) split.collapse(state.mono)
}

Mousetrap.bind(['ctrl+1', 'ctrl+2'], function(ev) {
  // let mono
  // if (ev.which == 49) mono = 1
  // else if (ev.which == 50) mono = 2
  // log('STATE', state)
})

Mousetrap.bind(['esc'], function(ev) {
  closePopups()
})

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

Mousetrap.bind(['ctrl+p'], function(ev) {
  let el = q('span.active-form:hover') || q('span.active-dict:hover')
  if (!el) return
  let href = ['http://www.perseus.tufts.edu/hopper/morph?l=', el.textContent , '&la=greek#lexicon'].join('')
  shell.openExternal(href)
})

Mousetrap.bind(['ctrl+j'], function(ev) {
  log('START  MENU')
})

// create local chunk
Mousetrap.bind(['ctrl+d'], function(ev) {
  // log('nav: CTRL-D', state)
  let state = settings.get('state')
  if (!state.pars) return
  generateChunk(state)
})

// new item for local dict
Mousetrap.bind(['ctrl+shift+d'], function(ev) {
  log('______SHIFT-d')
  let el = q('.active-form:hover')
  if (!el) return
  let wf = el.textContent
  if (!wf) return
  // let progress = q('#progress')
  // progress.classList.remove('is-hidden')
  let dname = config.ldname
  log('_____________________ local Dict item:', wf)
  let pars = sband(wf, config.code)
  if (!pars) return
  let state = settings.get('state')
  log('______PARS', pars)

  generateDictChunk(upath, dname, pars, (res)=> {
    state.sec = 'local-dict-item'
    log('_____________________SINGLE FORM:', res)
    // let data = {rdict: wf}
    state.dicts = res
    state.rdict = wf
    navigate(state)
  })

})

Mousetrap.bind(['ctrl+f'], function(ev) {
  log('== WILL BE DIGLOSSA FIND ==')
  let cfg = settings.get('cfg')
  let dnames = cfg.map(dict=> { return [dict.dname, dict.idx].join('-') })
  cfg = JSON.parse(JSON.stringify(cfg))
  log('_________CFG:', cfg, 'dnames:', dnames)
  // let state = settings.get('state')
  // state.sec = 'home'
  // navigate(state)
})

Mousetrap.bind(['ctrl+r'], function(ev) {
  log('== CTRL R ==')
  let last = _.last(history)
  history = [last]
  hstate = 0
})

Mousetrap.bind(['ctrl+c'], function(ev) {
  let el = q('.active-form:hover')
  if (!el) return
  let wf = el.textContent
  if (!wf) return
  let zerohead = [' ', wf].join('')
  clipboard.writeText(zerohead)
})

Mousetrap.bind(['ctrl+z'], function(ev) {
  let state = {sec: config.defstate}
  settings.set('state', state)
  let cfg = settings.get('cfg')
  cfg = JSON.parse(JSON.stringify(cfg))
  initDBs(cfg) // +z
  log('== INIT STATE == ', cfg)
})

Mousetrap.bind(['ctrl+shift+z'], function(ev) {
  let state = {sec: config.defstate}
  settings.set('state', state)
  let cfg = []
  settings.set('cfg', cfg)
  log('== ZERO STATE CFG == ', cfg)
})

Mousetrap.bind(['space'], function(ev) {
  toggleResults()
})

Mousetrap.bind(['tab'], function(ev) {
  toggleOneResult()
})

// TODO - здесь плохо
Mousetrap.bind(['ctrl+='], function(ev) {
  let zf = webFrame.getZoomFactor()
  let newzf = zf + 0.1
  webFrame.setZoomFactor(newzf)
})

Mousetrap.bind(['ctrl+-'], function(ev) {
  let zf = webFrame.getZoomFactor()
  let newzf = zf - 0.1
  webFrame.setZoomFactor(newzf)
})

Mousetrap.bind(['ctrl+0'], function(ev) {
  webFrame.setZoomFactor(1)
})


function goLeft() {
  if (hstate <= 0) return
  else hstate--
  navigate()
}

function goRight() {
  if (hstate >= history.length-1) return
  else hstate++
  navigate()
}

function showSection(state) {
  let lang = settings.get('lang') || 'eng'
  const sections = qs('.section')
  Array.prototype.forEach.call(sections, (osection) => {
    osection.classList.add('is-hidden')
  })
  let section, sectionId
  sectionId = ['#', state.sec, '_', lang].join('')
  section = q(sectionId)
  if (!section) {
    sectionId = ['#', state.sec, '_', config.deflang].join('')
    section = q(sectionId)
  }
  // log('____________ SEC ID', sectionId, section)
  q(sectionId).classList.remove('is-hidden')
  return sectionId
}

export function navigate(state, data) {
  if (!state) state = history[hstate]
  else {
    // if (pars && pars.length == 1  && pars[0].length == 1) pars = false // an only wordform
    let oldstate = _.clone(state)
    history.push(oldstate)
    hstate = history.length-1
  }
  let sec = state.sec
  let sid = showSection(state)
  if (data) data.sid = sid
  state.sid = sid
  let st = JSON.parse(JSON.stringify(state))
  // log('__NAV__STATE__', st)

  if (sec == 'main') twoPanes(state), showText(state.pars)
  else if (sec == 'remote-dicts') requestRemoteDicts(state)
  else if (sec == 'local-chunk') showLocalChunk(state)
  else if (sec == 'local-dict') showFullLocalDict(state)
  else if (sec == 'local-dict-item') editLocalDictItem(state)

  let progress = q('#progress')
  progress.classList.add('is-hidden')

  settings.set('state', state)
}

function closePopups() {
  let opopup = q('#popup')
  if (opopup) remove(opopup)
  let oetyrels = q('#etyrels')
  if (oetyrels) remove(oetyrels)
}
