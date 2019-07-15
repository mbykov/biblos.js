import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib//utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../configs/app.config'
import path from "path";
import { antrax, checkConnection } from '/home/michael/a/loigos'
const fse = require('fs-extra')
import { navigate } from './nav'

const log = console.log
const request = require('request');
let PouchDB = require('pouchdb')

initDBs()

// пока что terms отдельно от wkt
function initDBs() {
  // UPATH
  let upath = app.getPath("userData")
  upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

  let cfg = settings.get('cfg')
  if (!cfg) cfg = initCfg(upath)
  let dnames = cfg.map(dict=> { return dict.dname })
  // TODO:  cfg и все localdicts - еще предстоит сделать <<<<=========================== TODO ========================
  dnames = ['local', 'wkt', 'dvr', 'lsj']
  // dnames = ['wkt', 'dvr', 'lsj']
  // dnames = ['wkt']
  // dnames = ['local']
  checkConnection(upath, dnames)
}

function initCfg(upath) {
  let pouchpath = path.resolve(upath, 'pouch')
  let dnames = fse.readdirSync(pouchpath)
  let cfg = dnames.map((dname, idx)=> { return {dname: dname, active: true, idx: idx} })
  settings.set('cfg', cfg)
  return cfg
}

export function remoteDicts() {

  const getopts = {
    "url": "http://guest:guest@localhost:5984/_all_dbs"
  }

  const postopts = {
    "method": "POST",
    "url": "http://guest:guest@localhost:5984/_dbs_info",
    "json": true,
    "headers": {
      "Content-type": "application/json"
    }
  }

  request(getopts, function (error, response, body) {
    if (error) console.error('soket error')
    if (response && response.statusCode != 200)  return

    let dblist = JSON.parse(body)
    let dnames = _.filter(dblist, dict=> { return dict[0] != '_' })
    postopts.body = {keys: dnames}

    request(postopts, function (error, response, body) {
      if (error) console.error('soket error')
      if (response && response.statusCode != 200) return
      let dbinfos = body.map(dict=> { return {dname: dict.key, size: dict.info.doc_count} })
      // console.log('dbinfos:', dbinfos)
      // console.log('dnames:', dnames)

      Promise.all(dnames.map(function(dname) {
        let remotepath = ['http://localhost.org:5984/', dname].join('')
        let remoteDB = new PouchDB(remotepath)
        return remoteDB.get('description')
          .then(descr=> {
            descr.dname = dname
            return descr
          })
          .catch(err=> {
            if (err.reason == 'missing') return
            log('REMOTE-ERR:', err.reason)
          })
      }))
        .then(function(descrs) {
          let code = config.code
          let recode = new RegExp(code)
          descrs = _.compact(descrs)
          descrs = _.filter(descrs, descr=> { return recode.test(descr.langs)})
          let cleaninfos = []
          descrs.forEach(descr=> {
            let dbinfo = _.find(dbinfos, info=> { return info.dname == descr.dname})
            if (!dbinfo) return
            dbinfo.descr = descr
            cleaninfos.push(dbinfo)
          })
          settings.set('dbinfos', dbinfos)
          // log('DBINFOS', cleaninfos)
          showRemoteDicts(cleaninfos)
        })
    })
  })
}

function showRemoteDicts(dbinfos) {
  let cfg = settings.get('cfg') || []
  let state = settings.get('state')
  let locals = _.uniq(cfg.map(dict=> { return dict.dname }))

  let obefore = q('#before-remote-table')
  if (!obefore) return
  obefore.textContent = ''
  let otable = q('#table-dicts-remote')
  if (otable) remove(otable)
  let sec_id = ['#remote-dicts', state.lang].join('_')
  let osection = q(sec_id)
  otable = createRemoteTable()
  osection.appendChild(otable)

  dbinfos.forEach(rdb=> {
    let otr = create('tr')
    otable.appendChild(otr)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = rdb.descr.name
    let osize = create('td', 'dsize')
    osize.textContent = rdb.size
    otr.appendChild(osize)
    let olang = create('td', 'dlang')
    olang.textContent = rdb.descr.langs
    otr.appendChild(olang)
    let oinfo = create('td', 'dinfo')
    oinfo.textContent = 'info'
    oinfo.dataset.dinfo = rdb.dname
    otr.appendChild(oinfo)
    let olink = create('td', 'link')
    if (locals.includes(rdb.dname)) {
      let check = checkmark()
      olink.appendChild(check)
    } else {
      olink.textContent = 'sync'
    }
    olink.dataset.clone = rdb.dname
    otr.appendChild(olink)
  })
}

function createRemoteTable() {
  let otable = create('table', 'dicts-table')
  otable.id = 'table-dicts-remote'
  let oheader = create('tr', 'table-header')
  oheader.id = 'table-header-remote'
  otable.appendChild(oheader)
  let oname = create('td')
  oname.textContent = 'dict\'s name'
  oheader.appendChild(oname)
  let osize = create('td')
  osize.textContent = 'docs'
  oheader.appendChild(osize)
  let olang = create('td')
  olang.textContent = 'langs'
  oheader.appendChild(olang)
  let oinfo = create('td')
  oinfo.textContent = 'info'
  oheader.appendChild(oinfo)
  let osync = create('td')
  osync.textContent = 'synchronize!'
  oheader.appendChild(osync)
  return otable
}

function checkmark() {
  let check = create('img', 'dict-check')
  check.setAttribute('src', '../resources/check.png')
  return check
}

export function localDicts() {
  // showLocalDicts()
}

function showLocalDicts() {
  let cfg = settings.get('cfg')
  if (!cfg) return
  let state = settings.get('state')
  let dnames = _.uniq(cfg.map(dict=> { return dict.dname }))
  log('SHOW LOCAL DICTS CFG:', cfg)
  let obefore = q('#before-local-table')
  if (!obefore) return
  obefore.textContent = ''
  let otable = q('#table-local')
  if (otable) empty(otable)
  else {
    let sec_id = ['#arrange-dicts', state.lang].join('_')
    let osection = q(sec_id)
    if (!osection) return
    otable = createLocalTable()
    osection.appendChild(otable)
  }
  // let oheader = q('#table-header-local')
  let dbinfos = settings.get('dbinfos')
  log('DIN', dbinfos)

  dbinfos.forEach(rdb=> {
    if (!dnames.includes(rdb.dname)) return
    let otr = create('tr')
    otable.appendChild(otr)
    // insertAfter(otr, oheader)
    let odt = create('td')
    otr.appendChild(odt)
    odt.textContent = rdb.descr.name
    let osize = create('td', 'dsize')
    osize.textContent = rdb.size
    otr.appendChild(osize)
    let olang = create('td', 'dlang')
    olang.textContent = rdb.descr.langs
    otr.appendChild(olang)
    let oinfo = create('td', 'dinfo')
    oinfo.textContent = 'info'
    oinfo.dataset.dinfo = rdb.dname
    otr.appendChild(oinfo)
  })

}

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

function createLocalTable() {
  let otable = create('table', 'dicts-table')
  otable.id = 'table-local'
  let oheader = create('tr', 'table-header')
  oheader.id = 'table-header-local'
  otable.appendChild(oheader)
  let odname = create('td')
  odname.textContent = 'dict\'s name'
  oheader.appendChild(odname)
  let osize = create('td')
  osize.textContent = 'docs'
  oheader.appendChild(osize)
  let olang = create('td')
  olang.textContent = 'langs'
  oheader.appendChild(olang)
  let oinfo = create('td')
  oinfo.textContent = 'info'
  oheader.appendChild(oinfo)
  return otable
}

export function showDBinfo(state) {
  log('INFO', state.dname)
  let dbinfos = settings.get('dbinfos')
  let dbinfo = _.find(dbinfos, dbinfo=> { return dbinfo.dname == state.dname})
  log('DINFO:', dbinfo)
  let sec_id = ['#db-info', state.lang].join('_')
  let osection = q(sec_id)
  let oinfo = q('#db-info-table')
  if (oinfo) remove(oinfo)
  oinfo = createInfoTable(dbinfo)
  osection.appendChild(oinfo)
}

function createInfoTable(dbinfo) {
  let oinfo = create('ul', 'info-table')
  let oremote = create('li', '')
  oremote.textContent = ['dict\'s remote name: ', dbinfo.dname].join('')
  oinfo.appendChild(oremote)
  let oname = create('li', '')
  oname.textContent = ['dict\'s full name: ', dbinfo.descr.name].join('')
  oinfo.appendChild(oname)
  let olangs = create('li', '')
  olangs.textContent = ['langs: ', dbinfo.descr.langs].join('')
  oinfo.appendChild(olangs)
  let osource = create('li', '')
  osource.textContent = ['source: ', dbinfo.descr.source].join('')
  oinfo.appendChild(osource)
  let oeditor = create('li', '')
  oeditor.textContent = ['editor: ', dbinfo.descr.email].join('')
  oinfo.appendChild(oeditor)
  return oinfo
}

export function showLocalChunk(state) {
  // log('LocalChunk state:', state.localChunk)
  let sec_id = ['#local-chunk', state.lang].join('_')
  let osection = q(sec_id)
  // log('OSEC', osection)
  if (!state.localChunk) return
  log('__SHOW LOCAL CHUNK STATE:', state)
  let ochunk = createLocalChunk(state)
  osection.appendChild(ochunk)
}

function createLocalChunk (state) {
  let otable = q('#table-local-chunk')
  if (otable) remove(otable)

  let dicts = state.localChunk

  otable = create('table', 'dicts-table')
  otable.id = 'table-local-chunk'
  if (!dicts) return
  // log('______________________odicts', dicts)
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
    // log('______________________odict', dict)
    let oline = create('tr', 'table-line')
    oline.dataset.localdict = JSON.stringify(dict)
    otable.appendChild(oline)

    let ordict = create('td')
    ordict.textContent = dict.rdict
    oline.appendChild(ordict)

    let opos = create('td')
    opos.textContent = dict.pos
    oline.appendChild(opos)

    let okey = create('td')
    okey.textContent = dict.key
    oline.appendChild(okey)

    let otrns = create('td')
    otrns.textContent = dict.trns
    oline.appendChild(otrns)

  })

  return otable
}

export function editLocalDictItem(state) {
  log('_______________ editLocalDictItem', state)
  if (!state.rdict) return
  let dict = _.find(state.localChunk, dict=> { return dict.rdict == state.rdict})
  // delete state.rdict
  if (!dict) return

  let sec_id = ['#local-dict-item', state.lang].join('_')
  let osection = q(sec_id)
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
    dict.trns = trns
    // settings.set('state', state)
    log('_____SUBMIT OK_2', state)
    state.sec = 'local-chunk'
    navigate(state)
  })
  let cancel = q('#dict-item-submit-cancel')
  cancel.addEventListener('click', (ev) => {
    log('_____SUBMIT CANCEL')
    state.sec = 'local-chunk'
    navigate(state)
  })

}

function createDictEdit (dict) {
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
