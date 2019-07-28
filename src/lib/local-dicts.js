// шапку потом дочистить

import _ from "lodash"
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib//utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../configs/app.config'
import path from "path";
import { updateCurrent } from '/home/michael/a/loigos'
import { navigate } from './nav'
import { generateDictChunk, mergeDictChunk } from '/home/michael/greek/dictCSV'

// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

const log = console.log

export function createLocalChunk (state, data) {
  if (!data) return
  let dicts = data.dicts
  // log('______________________chunk-dicts', dicts)
  if (!dicts) return
  let osection = q(data.sid)
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
  let okey = create('td')
  okey.textContent = 'key'
  oheader.appendChild(okey)
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

    let okey = create('td')
    okey.textContent = dict.key
    oline.appendChild(okey)

    let otrns = create('td')
    otrns.textContent = dict.trns
    oline.appendChild(otrns)
  })

  osection.appendChild(otable)

  let filled = _.filter(dicts, dict=> { return dict.trns })
  if (filled.length) {
    let ok = q('#dict-table-submit-ok')
    if (ok) remove(ok)
    ok = create('input', 'submit')
    ok.setAttribute('type', 'submit')
    ok.setAttribute('value', 'merge to current local dict')
    ok.id = 'dict-table-submit-ok'
    // log('OK', osubmitok)
    osection.appendChild(ok)
    ok.addEventListener('click', (ev) => {
      log('_____SUBMIT MERGE OK FILLED:', filled)
      // filled.forEach(dict=> { dict.trns = dict.trns.split(';') })
      updateCurrent (upath, filled)
        .then(res=> {
          log('MERGE-RES', res)
          state.sec = 'main'
          navigate(state)
        })
    })
  }
}

export function editLocalDictItem(state, data) {
  // log('_______________ edit-data', data)
  if (!data) return
  let rdict = data.rdict
  let dict = _.find(data.dicts, dict=> { return dict.rdict == rdict})
  if (!dict) return
  // log('_______________ eDICT', dict)

  let osection = q(data.sid)
  // log('OSEC', osection)
  let odictitem = q('.dict-item-container')
  if (odictitem) remove(odictitem)

  odictitem = createDictEdit(dict)
  osection.appendChild(odictitem)
  let oinput = q('.dict-item-input-text')
  oinput.focus()

  let ok = q('#dict-item-submit-ok')
  ok.addEventListener('click', (ev) => {
    let oinput = q('.dict-item-input-text')
    let trns = oinput.value
    dict.trns = trns.split(';')
    log('_____SUBMIT OK DICT:', dict)
    state.sec = 'local-chunk'
    navigate(state, data)
  })
  let cancel = q('#dict-item-submit-cancel')
  cancel.addEventListener('click', (ev) => {
    // log('_____SUBMIT CANCEL')
    state.sec = 'local-chunk'
    navigate(state, data)
  })
}

function createDictEdit (dict) {
  if (!dict) return
  let odictitem = create('div', 'dict-item-container')
  let odictheader = create('div', 'dict-item-header')
  let ordict = create('span', 'dict-item')
  ordict.classList.add('dict-item-rdict')
  ordict.textContent = dict.rdict
  odictheader.appendChild(ordict)
  let opos = create('span', 'dict-item')
  // opos.classList.add('dict-item-pos')
  opos.textContent = dict.pos
  odictheader.appendChild(opos)
  let okey = create('span', 'dict-item')
  okey.id = 'dict-item-key'
  okey.textContent = dict.key
  odictheader.appendChild(okey)
  odictitem.appendChild(odictheader)
  let obr = create('p', '')
  obr.textContent = 'translation:'
  odictitem.appendChild(obr)

  let oinput = create('input', 'dict-item-input-text')
  oinput.id = 'dict-item-input-text'
  oinput.setAttribute('type', 'text')
  // oinput.setAttribute('size', 50)
  // log('O-TEXT', oinput)
  odictitem.appendChild(oinput)

  let obr1 = create('p', '')
  odictitem.appendChild(obr1)

  let osubmitok = create('input', 'submit')
  osubmitok.setAttribute('type', 'submit')
  osubmitok.setAttribute('value', 'ok')
  osubmitok.id = 'dict-item-submit-ok'
  // log('OK', osubmitok)
  odictitem.appendChild(osubmitok)

  let osubmitcancel = create('input', 'submit')
  osubmitcancel.setAttribute('type', 'submit')
  osubmitcancel.setAttribute('value', 'cancel')
  osubmitcancel.id = 'dict-item-submit-cancel'
  // log('OK', osubmitcancel)
  odictitem.appendChild(osubmitcancel)

  return odictitem
}
