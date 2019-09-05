// шапку потом дочистить

import _ from "lodash"
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib/utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../app.config'
import path from "path";
import { updateCurrent, readDictionary, delDictionary } from '/home/michael/a/loigos'
import { navigate } from './nav'
import { initDBs } from './remote'
import { generateDictChunk } from './generateChunk'
// import {oxia, comb, plain, strip} from '../../../../greek/orthos'
import {oxia, comb, plain, strip} from 'orthos'
const Mousetrap = require('mousetrap')
let progress = q('#progress')


// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

const log = console.log

function createLocalTable (dicts, key) {
  let otable = q('#table-local-chunk')
  if (otable) remove(otable)

  otable = create('table', 'dicts-table')
  otable.id = 'table-local-chunk'
  otable.dataset.dicts = JSON.stringify(dicts)
  let oheader = create('tr', 'table-chunk-header')
  otable.appendChild(oheader)

  let oname = create('td')
  oname.textContent = 'wordform'
  oheader.appendChild(oname)
  let opos = create('td')
  opos.textContent = 'pos'
  oheader.appendChild(opos)

  if (key) {
    let okey = create('td')
    okey.textContent = 'key'
    oheader.appendChild(okey)
  }

  let otrns = create('td')
  otrns.textContent = 'translation'
  oheader.appendChild(otrns)

  dicts.forEach(dict=> {
    let oline = create('tr', 'table-line')
    otable.appendChild(oline)

    let ordict = create('td')
    ordict.textContent = dict.rdict
    oline.appendChild(ordict)

    let opos = create('td')
    opos.textContent = (dict.verb) ? 'verb' : (dict.name) ? 'name' : '-'
    oline.appendChild(opos)

    if (key) {
      let okey = create('td')
      okey.textContent = dict.key
      oline.appendChild(okey)
    }

    let otrns = create('td')
    otrns.textContent = dict.trns
    oline.appendChild(otrns)
  })
  return otable
}

export function showLocalChunk (state, dicts) {
  if (!dicts) return
  // log('_________ show-local-chunk-dicts', dicts)
  let osection = q(state.sid)
  let onewitem = q('#new-dict-item-link')
  let otable = createLocalTable(dicts)
  osection.insertBefore(otable, onewitem)

  let filled = _.filter(dicts, dict=> { return dict.trns })
  if (!filled.length) return

  let okmerge = q('#dict-table-submit-ok')
  if (okmerge) remove(okmerge)
  okmerge = create('input', 'submit')
  okmerge.setAttribute('type', 'submit')
  okmerge.setAttribute('value', 'merge filled to current local dict')
  okmerge.id = 'dict-table-submit-ok'
  osection.appendChild(okmerge)

  let newdocs = filled.map(newdoc=> { return {_id: newdoc.plain, docs: [newdoc] } })
  log('____newdocs:', newdocs)
  okmerge.addEventListener('click', (ev) => {
    // log('____________click update')
    updateCurrent (upath, newdocs)
      .then(res=> {
        log('MERGE-DICT', res)
        let cfg = settings.get('cfg')
        // cfg = JSON.parse(JSON.stringify(cfg))
        let locdict = _.find(cfg, dict=> { return dict.dname == config.ldname })
        if (!locdict) {
          locdict = {active: true, dname: 'local', name: 'Local', idx: 0, langs: 'grc,any'}
          cfg.unshift(locdict)
          cfg.forEach((dict, idx)=> { dict.idx = idx})
          // let dnames = cfg.map(dict=> { return dict.dname })
          // log('CFG', cfg, dnames)
          initDBs(cfg)
        }
        locdict.size = res.size
        settings.set('cfg', cfg)
        state.sec = 'main'
        navigate(state)
      })
      .catch(err=> {
        console.log('ERR: update local dict', err)
      })
  })

}

export function editLocalDictItem(state, rdict) {
  log('_____________________________ editLocalDictItem', rdict)
  let otable = q('#table-local-chunk')
  if (!otable) return
  let dicts = JSON.parse(otable.dataset.dicts)
  if (!dicts.length) return
  let dict = _.find(dicts, dict=> { return dict.rdict == rdict})

  let osection = q(state.sid)
  let odictitem = createDictEdit(dict)
  osection.appendChild(odictitem)
  let oinput = q('#dict-item-input-text')
  oinput.focus()

  addEditButtons(dicts, dict, odictitem)
}

function createDictEdit (dict) {
  log('_____________________________ CREATE EDIT DICT', dict)
  let odictcontaiter = q('#dict-item-container')
  // if (odictitem) remove(odictitem)
  // odictitem = create('div')
  // odictitem.id = 'dict-item-container'

  let choosepos = q('#choose-item-pos')
  let itemdict = q('#item-dict')
  if (dict) {
    choosepos.classList.add('is-hidden')
    itemdict.classList.remove('is-hidden')
    let odictheader = q('#dict-item-header')
    let ordict = q('#dict-item-rdict')
    ordict.textContent = dict.rdict
    let opos = q('#dict-item-pos')
    let pos = (dict.verb) ? 'verb' : (dict.name) ? 'name' : dict.pos
    opos.textContent = pos
    log('______________dict exists, pos', opos, dict.rdict, pos)
    let oinput = q('#dict-item-input-text')
    oinput.value = ''
    // log('______________oinput', oinput)
    if (dict.trns) oinput.value = dict.trns.join('; ')
  } else {
    choosepos.classList.remove('is-hidden')
    itemdict.classList.add('is-hidden')
  }

  // let obr = create('p', '')
  // odictitem.appendChild(obr)

  return odictcontaiter
}

function addEditButtons(dicts, dict, odictitem) {
  log('_________ADD EDIT BUTTONS-dict', dict)
  let state = settings.get('state')

  if (!dict) {
    dict = {new: true}
    let oinputnew = q('#new-item-input-wf')
    oinputnew.focus()
    // log('________________NEW DICT')
  }

  let osubmitok = q('#dict-item-submit-ok')
  if (osubmitok) remove(osubmitok)
  osubmitok = create('input', 'submit')
  osubmitok.setAttribute('type', 'submit')
  osubmitok.setAttribute('value', 'ok')
  // osubmitok.setAttribute('rdict', rdict)
  osubmitok.id = 'dict-item-submit-ok'
  // log('OK', osubmitok)
  odictitem.appendChild(osubmitok)

  let osubmitcancel = q('#dict-item-submit-cancel')
  if (osubmitcancel) remove(osubmitcancel)
  osubmitcancel = create('input', 'submit')
  osubmitcancel.setAttribute('type', 'submit')
  osubmitcancel.setAttribute('value', 'cancel')
  osubmitcancel.id = 'dict-item-submit-cancel'
  // log('OK', osubmitcancel)
  odictitem.appendChild(osubmitcancel)

  let oinput = q('#dict-item-input-text')
  oinput.onkeydown = function(ev) {
    if (ev.key != 'Escape') return
    oinput.blur()
  }

  let oinputnewf = q('#new-item-input-wf')
  oinputnewf.onkeydown = function(ev) {
    if (ev.key != 'Escape') return
    oinputnewf.blur()
  }

  let oinputnewt = q('#new-item-input-trns')
  oinputnewt.onkeydown = function(ev) {
    if (ev.key != 'Escape') return
    oinputnewt.blur()
  }

  osubmitok.addEventListener('click', (ev) => {
    if (dict.new) {
      // let dpos = q('[name = "dictpos"]:checked')
      // log('______________________osubmitok -dpos', dpos)
      let pos = q('[name = "dictpos"]:checked').value
      if (pos == 'verb') dict.verb = true
      else if (pos == 'name') dict.name = true
      dict.rdict = oinputnewf.value.trim()
      dict.plain = plain(dict.rdict)
      dict.trns = oinputnewt.value.split(';')
      log('______________________osubmitok -dicts-new', pos, dict)
      dicts.push(dict)
    } else {
      dict.trns = oinput.value.split(';')
    }
    // πρόσωπον
    log('______________________osubmitok-dict', dicts)
    state.sec = 'local-chunk'
    navigate(state, dicts)
  })

  osubmitcancel.addEventListener('click', (ev) => {
    state.sec = 'local-chunk'
    navigate(state, dicts)
  })
}

export function showFullLocalDict (state, dicts) {
  log('___________________show: showFullLocalDict', dicts)
  if (!dicts) return
  let osection = q(state.sid)
  let obanner = q('#full-local-dict-banner')
  let otable = createLocalTable(dicts, true)
  osection.insertBefore(otable, obanner)
}

// local-table events:
document.addEventListener('click', (ev) => {
  let el = ev.target
  if (!el || el.id != 'deldict-submit') return
  progress.classList.remove('is-hidden')
  if (el.id == 'deldict-submit') log('DEL DICT SUBM')
  let dname = config.ldname
  delDictionary(upath, dname)
    .then(res=> {
      if (!res) return
      log('del result complete', res)
      let state = settings.get('state')
      // state.dicts = []
      let cfg = settings.get('cfg')
      // cfg = JSON.parse(JSON.stringify(cfg))
      // let dnames = cfg.map(dict=> { return dict.dname })
      // log('CFG', cfg, dnames)
      cfg = _.filter(cfg, dict=> { return dict.dname != config.ldname })
      initDBs(cfg)
      settings.set('cfg', cfg)
      progress.classList.add('is-hidden')
      state.sec = 'main'
      navigate(state)
    })

})

document.addEventListener('click', (ev) => {
  let el = ev.target
  let data = el.dataset
  if (!data) return
  let dname = config.ldname
  let state = settings.get('state')
  if (data.localdictfull) {
    log('___________click read local dict full')
    readDictionary(upath, dname)
      .then(res=> {
        let dicts = _.flatten(res.map(dict=> { return dict.docs }))
        state.sec = 'local-dict-full'
        log('_____________________click-read showFullDict:', res)
        navigate(state, dicts)
      })
  } else if (data.createlocalchunk) {
    log('___________click create local chunk')
    if (!state.pars) return
    generateDictChunk(upath, dname, state.pars, (res)=> {
      state.sec = 'local-chunk'
      log('_____________________: genDictChunk:', res)
      navigate(state, res)
    })
  } else if (data.deletelocaldict) {
    log('DEL DICT START')
    let dname = config.ldname
    delDictionary(upath, dname)
      .then(res=> {
        if (!res) return
        log('del result complete', res)
        let state = settings.get('state')
        let cfg = settings.get('cfg')
        cfg = _.filter(cfg, dict=> { return dict.dname != config.ldname })
        initDBs(cfg)
        settings.set('cfg', cfg)
        progress.classList.add('is-hidden')
        state.sec = 'main'
        log('DEL DICT END')
        navigate(state)
      })

  }
})

// create local chunk
Mousetrap.bind(['ctrl+d'], function(ev) {
  log('______+-d')
  let state = settings.get('state')
  if (!state.pars) return
  // generateChunk(state)
  let dname = config.ldname
  generateDictChunk(upath, dname, state.pars, (res)=> {
    state.sec = 'local-chunk'
    log('_____________________+d: genDictChunk:', res)
    // state.dicts = res
    // settings.set('state', state)
    navigate(state, res)
  })
})

// new item for local dict
Mousetrap.bind(['ctrl+shift+d'], function(ev) {
  log('______SHIFT-d')
  progress.classList.remove('is-hidden')
  let state = settings.get('state')
  let dname = config.ldname
  readDictionary(upath, dname)
    .then(res=> {
      let dicts = _.flatten(res.map(dict=> { return dict.docs }))
      state.sec = 'local-dict-full'
      // state.dicts = dicts
      log('_____________________showFullDict:', res)
      navigate(state, dicts)
    })

})
