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
const Mousetrap = require('mousetrap')
let progress = q('#progress')


// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

const log = console.log

function createLocalTable (dicts) {
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
  // let okey = create('td')
  // okey.textContent = 'key'
  // oheader.appendChild(okey)
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
    opos.textContent = (dict.verb) ? 'verb' : 'name'
    oline.appendChild(opos)

    // let okey = create('td')
    // okey.textContent = dict.key
    // oline.appendChild(okey)

    let otrns = create('td')
    otrns.textContent = dict.trns
    oline.appendChild(otrns)
  })
  return otable
}

export function showLocalChunk (state, dicts) {
  // let dicts = state.dicts
  // state = JSON.parse(JSON.stringify(state))
  // log('_____________NDICTS-state', state)
  if (!dicts) return
  // let dicts = _.flatten(rdicts.map(rdict=> { return rdict.docs }))
  // log('_____________NDICTS', dicts)
  let osection = q(state.sid)
  // empty(osection)
  let onewitem = q('#new-dict-item-link')
  let otable = createLocalTable(dicts)
  osection.insertBefore(otable, onewitem)
  // osection.appendChild(otable)

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
  okmerge.addEventListener('click', (ev) => {
    log('____________click update')
    updateCurrent (upath, newdocs)
      .then(res=> {
        log('MERGE-RES-update-dict', res)
        let cfg = settings.get('cfg')
        cfg = JSON.parse(JSON.stringify(cfg))
        let locdict = _.find(cfg, dict=> { return dict.dname == config.ldname })
        if (!locdict) {
          locdict = {active: true, dname: 'local', name: 'Local', idx: 0, langs: 'grc,any'}
          cfg.unshift(locdict)
        // }
          locdict.size = res.size
          cfg.forEach((dict, idx)=> { dict.idx = idx})
          // let dnames = cfg.map(dict=> { return dict.dname })
          // log('CFG', cfg, dnames)
          initDBs(cfg)
          settings.set('cfg', cfg)
        }
        state.sec = 'main'
        navigate(state)
      })
      .catch(err=> {
        console.log('ERR: update local dict', err)
      })
  })

}

export function editLocalDictItem(state, rdict) {
  let dicts = state.dicts
  // log('_______________________________EDIT.dicts', rdict, state.dicts)
  let astate = settings.get('state')
  // log('_______________________________EDIT.dicts', state)
  if (!dicts) return
  let rdicts = state.dicts.map(dict=> { return dict.rdict })
  let dict = _.find(dicts, dict=> { return dict.rdict == rdict})
  // log('_______________________________EDIT.dict', dict)
  // if (!dict) return

  let osection = q(state.sid)
  let odictitem = createDictEdit(dict)
  osection.appendChild(odictitem)
  let oinput = q('#dict-item-input-text')
  oinput.focus()
  addEditButtons(state, rdict, odictitem)
}

function createDictEdit (dict) {
  // if (!dict) return
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
    log('______________dict exists')
    let odictheader = q('#dict-item-header')
    let ordict = q('#dict-item-rdict')
    ordict.textContent = dict.rdict
    let opos = q('span', 'dict-item-pos')
    let pos = (dict.verb) ? 'verb' : (dict.name) ? 'name' : dict.pos
    opos.textContent = pos
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

function addEditButtons(state, rdict, odictitem) {
  log('_________ADD EDIT BUTTONS')
  let dicts = state.dicts
  let dict = _.find(dicts, dict=> { return dict.rdict == rdict})
  // if (!dict) return
  log('_________ADD EDIT BUTTONS-dict', dict)

  if (!dict) {
    dict = {new: true}
    let oinputnew = q('#new-item-input-wf')
    oinputnew.focus()
    log('________________NEW DICT')
  }

  let osubmitok = q('#dict-item-submit-ok')
  if (osubmitok) remove(osubmitok)
  osubmitok = create('input', 'submit')
  osubmitok.setAttribute('type', 'submit')
  osubmitok.setAttribute('value', 'ok')
  osubmitok.setAttribute('rdict', rdict)
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
      log('______________________osubmitok -dicts', dicts)
      dict.rdict = oinputnewf.value
      dict.trns = oinputnewt.value.split(';')
    } else {
      dict.trns = oinput.value.split(';')
    }
    // πρόσωπον
    log('______________________osubmitok-dict', dict)
    state.sec = 'local-chunk'
    navigate(state, dicts)
  })

  osubmitcancel.addEventListener('click', (ev) => {
    state.sec = 'local-chunk'
    navigate(state)
  })
}


export function showFullLocalDict (state) {
  log('___________________showFullLocalDict')
  let osection = q(state.sid)
  let dicts = state.dicts
  // let omess = q('#message')
  // if (omess) remove(omess)
  // if (!dicts.length) {
  //   log('________________________NO DICTS')
  //   let text = 'no items in local dict. Create dictionary for some text firstly'
  //   let omess = create('p')
  //   omess.textContent = text
  //   osection.appendChild(omess)
  //   return
  // } else {
  //   let otable = createLocalTable(dicts)
  //   osection.appendChild(otable)
  // }
  let obanner = q('#full-local-dict-banner')
  let otable = createLocalTable(dicts)

  osection.insertBefore(otable, obanner)

  // let odel = q('#deldict-submit')
  // if (odel) remove(odel)
  // odel = create('input', 'submit')
  // odel.setAttribute('type', 'submit')
  // odel.setAttribute('value', 'delete local dict completely')
  // odel.id = 'deldict-submit'
  // osection.appendChild(odel)
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
      state.dicts = []
      let cfg = settings.get('cfg')
      cfg = JSON.parse(JSON.stringify(cfg))
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
        log('_____________________showFullDict:', res)
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
