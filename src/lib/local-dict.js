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

export function showLocalChunk (state) {
  let dicts = state.dicts
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
  let ok = q('#dict-table-submit-ok')
  if (ok) remove(ok)

  ok = create('input', 'submit')
  ok.setAttribute('type', 'submit')
  ok.setAttribute('value', 'merge filled to current local dict')
  ok.id = 'dict-table-submit-ok'
  osection.appendChild(ok)

  let newdocs = filled.map(newdoc=> { return {_id: newdoc.plain, docs: [newdoc] } })
  ok.addEventListener('click', (ev) => {
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
        }
        locdict.size = res.size
        cfg.forEach((dict, idx)=> { dict.idx = idx})
        let dnames = cfg.map(dict=> { return dict.dname })
        // log('CFG', cfg, dnames)
        initDBs(cfg)
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
  let dicts = state.dicts
  log('_______________________________EDIT.dicts', rdict, state.dicts.length)
  if (!dicts) return
  let rdicts = state.dicts.map(dict=> { return dict.rdict })
  let dict = _.find(dicts, dict=> { return dict.rdict == rdict})
  if (!dict) return

  let osection = q(state.sid)
  let odictitem = createDictEdit(dict)
  osection.appendChild(odictitem)
  let oinput = q('.dict-item-input-text')
  oinput.focus()
  addEditButtons(state, rdict, odictitem)
}

function createDictEdit (dict) {
  if (!dict) return
  log('_____________________________ CREATE EDIT DICT', dict)
  let odictitem = q('#dict-item-container')
  if (odictitem) remove(odictitem)
  odictitem = create('div')
  odictitem.id = 'dict-item-container'
  let odictheader = create('div', 'dict-item-header')
  let ordict = create('span', 'dict-item')
  ordict.classList.add('dict-item-rdict')
  ordict.textContent = dict.rdict
  odictheader.appendChild(ordict)
  let opos = create('span', 'dict-item')
  // opos.classList.add('dict-item-pos')
  let pos = (dict.verb) ? 'verb' : (dict.name) ? 'name' : dict.pos
  opos.textContent = pos
  odictheader.appendChild(opos)

  odictitem.appendChild(odictheader)
  let obr = create('p', '')
  obr.textContent = 'translation:'
  odictitem.appendChild(obr)

  let oinput = create('input', 'dict-item-input-text')
  oinput.id = 'dict-item-input-text'
  oinput.setAttribute('type', 'text')
  if (dict.trns) oinput.value = dict.trns.join('; ')
  // oinput.setAttribute('size', 50)
  // log('O-TEXT', oinput)
  odictitem.appendChild(oinput)
  let obr1 = create('p', '')
  odictitem.appendChild(obr1)

  return odictitem
}

function addEditButtons(state, rdict, odictitem) {
  log('_________ADD EDIT BUTTONS')
  let dicts = state.dicts
  let dict = _.find(dicts, dict=> { return dict.rdict == rdict})
  if (!dict) return

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
  if (osubmitcancel) remove(osubmitok)
  osubmitcancel = create('input', 'submit')
  osubmitcancel.setAttribute('type', 'submit')
  osubmitcancel.setAttribute('value', 'cancel')
  osubmitcancel.id = 'dict-item-submit-cancel'
  // log('OK', osubmitcancel)
  odictitem.appendChild(osubmitcancel)

  osubmitok.addEventListener('click', (ev) => {
    let oinput = q('.dict-item-input-text')
    let trns = oinput.value
    dict.trns = trns.split(';')
    state.sec = 'local-chunk'
    navigate(state)
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
  let omess = q('#message')
  if (omess) remove(omess)
  if (!dicts.length) {
    log('________________________NO DICTS')
    let text = 'no items in local dict. Create dictionary for some text firstly'
    let omess = create('p')
    omess.textContent = text
    osection.appendChild(omess)
    return
  } else {
    let otable = createLocalTable(dicts)
    osection.appendChild(otable)
  }

  let odel = q('#deldict-submit')
  if (odel) remove(odel)
  odel = create('input', 'submit')
  odel.setAttribute('type', 'submit')
  odel.setAttribute('value', 'delete local dict completely')
  odel.id = 'deldict-submit'
  osection.appendChild(odel)
}

// local-table events:
document.addEventListener('click', (ev) => {
  let el = ev.target
  if (!el || el.type != 'submit') return
  if (el.id != 'deldict-submit') return
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

// export function generateChunk (state) {
//   let dname = config.ldname
//   progress.classList.remove('is-hidden')
//   generateDictChunk(upath, dname, state.pars, (res)=> {
//     state.sec = 'local-chunk'
//     // log('_____________________genDictChunk:', res)
//     state.dicts = res
//     navigate(state)
//   })
// }
