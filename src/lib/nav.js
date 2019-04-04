//
import _ from "lodash"
import { remote, ipcRenderer, webFrame } from "electron";
import { remoteDicts, remoteDBInfo } from '../dbs/remote'
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
// import { showText } from "./parsedata";
// import { serverDicts, showActiveDicts } from "./dict";
// import { signup } from "./auth";

const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")

const log = console.log
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const path = require('path')
// const slash = require('slash')
const {getCurrentWindow} = require('electron').remote
let markdown = require( "markdown" ).markdown;

let history = []
let hstate = 0
let split

function twoPanes(state) {

  let sizes = settings.get('split-sizes') || [50, 50]
  if (split && state.mono) split.collapse(1)
  else if (split) split.setSizes(sizes)

  if (split) return
  settings.set('split-sizes', sizes)

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
  if (state.mono) split.collapse(1)
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

// Mousetrap.bind(['alt+1', 'alt+2'], function(ev) {
//   // if (ev.which == 49) log('----1')
//   // else if (ev.which == 50) log('----2')
// })

Mousetrap.bind(['esc'], function(ev) {
  hidePopups()
})

// Mousetrap.bind(['ctrl+s'], function(ev) {
//   let datapath = '/home/michael/diglossa.texts/Tibetan'
//   ipcRenderer.send('scanDirectory', datapath)
// })

Mousetrap.bind(['ctrl+j'], function(ev) {
  let html = markdown.toHTML( "Hello *World*!" )
  log('START  MD', html)
})

Mousetrap.bind(['ctrl+d'], function(ev) {
  let state = settings.get('state')
  state.sec = 'help'
  settings.set('state', state)
  navigate(state)
})

Mousetrap.bind(['ctrl+f'], function(ev) {
  let state = settings.get('state')
  state.sec = 'home'
  settings.set('state', state)
  navigate(state)
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
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  if (hstate >= history.length-1) return
  else hstate++
  let state = history[hstate]
  state.old = true
  navigate(state)
}

export function navigate(state) {
  showSection(state)

  // бред?
  if (!state.old) {
    state.old = false
    delete state.old
    history.push(state)
    hstate = history.length-1
  }

  if (state.sec == 'main') twoPanes(state), showText(state)
  else if (state.sec == 'remotedicts') remoteDicts()
  else if (state.sec == 'db-info') remoteDBInfo(state)
  // else if (section == 'activedicts') showActiveDicts()

  let progress = q('#progress')
  progress.classList.add('is-hidden')

  settings.set('state', state)
}

function showSection(state) {
  let lang = settings.get('lang')
  const sections = qs('.section')
  Array.prototype.forEach.call(sections, (osection) => {
    osection.classList.add('is-hidden')
  })
  let sectionId = ['#', state.sec, '_', lang].join('')
  // log('showsec: lang, state', lang, state)
  // log('S_id', sectionId)
  if (!q(sectionId)) sectionId = ['#', state.sec, '_', 'eng'].join('')
  if (!q(sectionId)) return
  log('Sec____ is here', sectionId)

  q(sectionId).classList.remove('is-hidden')
  hidePopups ()
}

function hidePopups () {
  let otrans = q('#transcript')
  otrans.classList.add('is-hidden')
}
