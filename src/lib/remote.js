import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib/utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../app.config'
import path from "path"
import { antrax, getCfg, checkConnection, readDictionary } from 'antrax'
// import { antrax, getCfg, checkConnection, delDictionary } from '/home/michael/a/loigos'
const fse = require('fs-extra')
import { navigate } from './nav'

const upath = app.getPath("userData")
const apath = app.getAppPath()

const log = console.log
const request = require('request');
let PouchDB = require('pouchdb')
let progress = q('#progress')

const getopts = {
  "url": [config.host, '_all_dbs'].join('/')
}

const postopts = {
  "method": "POST",
  "url": [config.host, '_dbs_info'].join('/'),
  "json": true,
  "headers": {
    "Content-type": "application/json"
  }
}

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

let cfg = settings.get('cfg')
// cfg = null

if (!cfg || !cfg.length) {
  getCfg(apath, upath)
    .then(cfg=> {
      initDBs(cfg)
      settings.set('cfg', cfg)
    })
    .catch(err=> { log('CFG-ERR:', err) })
} else {
  initDBs(cfg)
}

export function initDBs(cfg) {
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  // log('____check conn:', dnames)
  checkConnection(upath, dnames)
}

export function requestRemoteDicts() {
  let cfg = settings.get('cfg')
  showDicts(cfg)

  request(getopts, function (error, response, body) {
    if (error) console.error('soket error:', error)
    if (error) return
    if (response && response.statusCode != 200)  return

    let dblist = JSON.parse(body)
    let dnames = _.filter(dblist, dict=> { return dict[0] != '_' })
    postopts.body = {keys: dnames}

    request(postopts, function (error, response, body) {
      if (error) console.error('post soket error:', error)
      if (response && response.statusCode != 200) return
      let dbinfos = body.map(dict=> { return {dname: dict.key, size: dict.info.doc_count} })

      Promise.all(dnames.map(function(dname) {
        let remotepath = [config.host, dname].join('/')
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
          let rcfg = []
          let cfg = settings.get('cfg') || []
          descrs.forEach(descr=> {
            let dbinfo = _.find(dbinfos, info=> { return info.dname == descr.dname})
            if (!dbinfo) return
            let cfgdict = _.find(cfg, dict=> { return dict.dname == descr.dname})
            if (cfgdict) cfgdict.name = descr.name, cfgdict.langs = descr.langs
            if (cfgdict) return
            descr.size = dbinfo.size
            delete descr._id
            delete descr._rev
            rcfg.push(descr)
          })
          cfg.push(...rcfg)
          cfg.forEach((dict, idx)=> { dict.idx  = idx })
          cfg = _.sortBy(cfg, 'idx')
          cfg = JSON.parse(JSON.stringify(cfg)) // убрать вместе с log()
          settings.set('cfg', cfg)
          showDicts(cfg)
        })
        .catch(err=> {
          console.log('ERR: possible, no connection', err)
        })

    })
  })
}

function showDicts(cfg) {
  createRemoteTable()
  let otable = q('#table-dicts-remote')
  cfg.forEach(rdb=> {
    let otr = create('tr')
    otr.dataset.dname = rdb.dname
    otable.appendChild(otr)
    let odt = create('td', 'dname')
    otr.appendChild(odt)
    odt.textContent = rdb.name
    odt.dataset.dname = rdb.dname
    let osize = create('td', 'dsize')
    osize.textContent = rdb.size
    otr.appendChild(osize)
    let olang = create('td', 'dlang')
    olang.textContent = rdb.langs
    otr.appendChild(olang)
    let oinfo = create('td', 'dinfo')
    oinfo.textContent = 'info'
    oinfo.dataset.dinfo = rdb.dname
    let descr = JSON.stringify(rdb)
    oinfo.setAttribute('title', descr)
    otr.appendChild(oinfo)
    let osync = create('td', 'link')
    if (rdb.sync) {
      let check = checkmark()
      // check.dataset._sync = rdb.dname
      osync.appendChild(check)
    } else {
      osync.dataset.sync = rdb.dname
      let synctxt = (rdb.dname == config.ldname) ? '---' : 'clone'
      osync.textContent = synctxt
    }
    otr.appendChild(osync)

    let oact = create('td', 'link')
    if (rdb.active) {
      let check = checkmark()
      check.dataset.disable = rdb.dname
      oact.appendChild(check)
    } else {
      oact.dataset.activate = rdb.dname
      let text = (rdb.sync || rdb.dname == config.ldname) ? 'activate' : ''
      oact.textContent = text
    }
    otr.appendChild(oact)
  })
}

function createRemoteTable() {
  let otplace = q('#dicts-remote')
  if (otplace) empty(otplace)
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
  osync.textContent = 'clone:'
  oheader.appendChild(osync)
  let oact = create('td')
  oact.textContent = 'activate:'
  oheader.appendChild(oact)
  otplace.appendChild(otable)
  // return otable
}

function checkmark() {
  let check = create('img', 'dict-check')
  check.setAttribute('src', '../resources/check.png')
  return check
}

export function cloneDict(dname) {
  progress.classList.remove('is-hidden')
  let localpath = path.resolve(upath, 'pouch', dname)
  let remotepath = [config.host, dname].join('/')
  let localDB = new PouchDB(localpath)
  let remoteDB = new PouchDB(remotepath)

  remoteDB.replicate.to(localDB, { retry: true, batch_size: 1000 })
    .on('change', function (info) {
      console.log('written', info.docs_written)
    }).on('paused', function (res) {
      console.log('paused', res)
    })
    .on('complete', function (res) {
      console.log('ok, were done!', res)
      let cfg = clonedCfg(dname)
      initDBs(cfg)
      showDicts(cfg)
      progress.classList.add('is-hidden')
    })
    .on('error', function (err) {
      console.log('boo, something went wrong!', err)
    })
}

function clonedCfg(dname) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return cfg
  dict.active = true
  dict.sync = true
  cfg = JSON.parse(JSON.stringify(cfg))
  settings.set('cfg', cfg)
  return cfg
}


export function moveDict(dname, shift) {
  let cfg = settings.get('cfg')
  cfg = JSON.parse(JSON.stringify(cfg))
  cfg.forEach((dict,idx)=> { dict.idx = idx })
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return
  if (shift) {
    if (dict.idx >= cfg.length -1) return
    let after = cfg[dict.idx+1]
    after.idx = dict.idx
    dict.idx = dict.idx + 1
  } else {
    if (dict.idx < 1) return
    let before = cfg[dict.idx-1]
    before.idx = dict.idx
    dict.idx = dict.idx - 1
  }
  cfg = _.sortBy(cfg, 'idx')
  settings.set('cfg', cfg)
  showDicts(cfg)
}

export function activateDict(dname, on) {
  let cfg = settings.get('cfg')
  cfg = JSON.parse(JSON.stringify(cfg))
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return
  dict.active = (on) ? true : false
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  settings.set('cfg', cfg)
  initDBs(cfg)
  showDicts(cfg)
}

export function delDict(dname) {
  progress.classList.remove('is-hidden')
}

// function getCfg (apath, upath) {
//   let pouchpath = path.resolve(upath, 'pouch')
//   fse.ensureDirSync(pouchpath)
//   let dnames = fse.readdirSync(pouchpath)
//   // if (!dnames.length) return installDBs(apath, upath)
//   // else return checkCfg(apath, upath, dnames)
// }
