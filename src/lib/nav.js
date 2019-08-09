//
import _ from "lodash"
import { remote, ipcRenderer, webFrame, shell } from "electron";
import { requestRemoteDicts } from './remote'
import { createLocalChunk, editLocalDictItem, showFullLocalDict } from './local-dict'
import { q, qs, empty, create, remove, span, p, div } from './utils'
import { generateDictChunk } from '/home/michael/greek/dictCSV'
import Split from 'split.js'
import { config } from '../configs/app.config'
import { showText, toggleResults, toggleOneResult } from "./parse-data";
import path from "path";
import { readDictionary } from '/home/michael/a/loigos'
// import { serverDicts, showActiveDicts } from "./dict";
// import { signup } from "./auth";

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

// какой смысл? Здесь прочитал, в back обратно записал. Нонсенс
// window.onbeforeunload = function () {
//   let state = settings.get('state')
//   let lang = settings.get('lang')
//   // settings.set('state', state)
//   ipcRenderer.send('unload', state, lang)
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
  let progress = q('#progress')
  progress.classList.remove('is-hidden')
  let state = settings.get('state')
  // log('_____________________D', state)
  if (!state.pars) return
  // log('nav: CTRL-D', state)
  let dname = 'local'
  generateDictChunk(upath, dname, state, (res)=> {
    state.sec = 'local-chunk'
    log('_____________________genDictChunk:', res)
    let data = {dicts: res}
    navigate(state, data)
  })
})

// show full local dict
Mousetrap.bind(['ctrl+shift+d'], function(ev) {
  let progress = q('#progress')
  progress.classList.remove('is-hidden')
  let state = settings.get('state')
  let dname = 'local'
  readDictionary(upath, dname)
    .then(res=> {
      let docs = _.flatten(res.map(dict=> { return dict.docs }))
      state.sec = 'local-dict'
      log('_____________________showFullDict:', res)
      let data = {dicts: docs}
      navigate(state, data)
    })
 })

Mousetrap.bind(['ctrl+f'], function(ev) {
  log('== WILL BE DIGLOSSA FIND ==')
  let cfg = settings.get('cfg')
  let dnames = cfg.map(dict=> { return dict.dname })
  log('_________CFG', cfg, dnames)
  // let state = settings.get('state')
  // state.sec = 'home'
  // navigate(state)
})

Mousetrap.bind(['ctrl+z'], function(ev) {
  log('== ZERO STATE ==')
  let state = {sec: config.defstate}
  settings.set('state', state)
  settings.set('lang', config.deflang)
  navigate(state)
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
  if (!state.sec) throw new Error('NO SECTION!')
  let lang = settings.get('lang') || 'eng'
  const sections = qs('.section')
  Array.prototype.forEach.call(sections, (osection) => {
    osection.classList.add('is-hidden')
  })
  let sectionId = ['#', state.sec, '_', lang].join('')
  // log('____________ SEC ID', sectionId)
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
  // log('__STATE__PARS', state, 'data:', data)
  let sec = state.sec
  let sid = showSection(state)
  if (data) data.sid = sid

  if (sec == 'main') twoPanes(state), showText(state.pars)
  else if (sec == 'remote-dicts') requestRemoteDicts()
  else if (sec == 'local-chunk') createLocalChunk(state, data)
  else if (sec == 'local-dict') showFullLocalDict(state, data)
  else if (sec == 'local-dict-item') editLocalDictItem(state, data)

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
