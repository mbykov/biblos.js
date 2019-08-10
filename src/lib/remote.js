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
// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

const log = console.log
const request = require('request');
let PouchDB = require('pouchdb')

initDBs()

const getopts = {
  "url": "http://guest:guest@diglossa.org:5984/_all_dbs"
}

const postopts = {
  "method": "POST",
  "url": "http://guest:guest@diglossa.org:5984/_dbs_info",
  "json": true,
  "headers": {
    "Content-type": "application/json"
  }
}

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

export function initDBs(cfg) {
  if (!cfg) cfg = settings.get('cfg')
  if (!cfg) cfg = initCfg()
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  // dnames = ['wkt']
  checkConnection(upath, dnames)
}

function initCfg() {
  let pouchpath = path.resolve(upath, 'pouch')
  let dnames = fse.readdirSync(pouchpath)
  dnames = _.filter(dnames, dname=> { return dname != 'flex' })
  let cfg = dnames.map((dname, idx)=> { return {dname: dname, active: true, sync: true, idx: idx} })
  let locdict = _.find(cfg, dict=> { return dict.dname == 'local' })
  if (locdict) locdict = {name: 'Local', langs: 'grc,any'}
  log('__________________________INIT CFG', cfg)
  settings.set('cfg', cfg)
  return cfg
}

export function requestRemoteDicts() {
  request(getopts, function (error, response, body) {
    if (error) console.error('soket error:', error)
    // log('__get response:', response)
    if (response && response.statusCode != 200)  return

    let dblist = JSON.parse(body)
    let dnames = _.filter(dblist, dict=> { return dict[0] != '_' })
    // log('__dnames:', dnames)
    postopts.body = {keys: dnames}

    request(postopts, function (error, response, body) {
      if (error) console.error('post soket error:', error)
      // log('__post response:', response)
      if (response && response.statusCode != 200) return
      let dbinfos = body.map(dict=> { return {dname: dict.key, size: dict.info.doc_count} })
      // console.log('dbinfos:', dbinfos)
      // console.log('dnames:', dnames)

      Promise.all(dnames.map(function(dname) {
        let remotepath = ['http://diglossa.org:5984', dname].join('/')
        // log('info:', dname, remotepath)
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
          // log('info:', descrs)
          let code = config.code
          let recode = new RegExp(code)
          descrs = _.compact(descrs)
          descrs = _.filter(descrs, descr=> { return recode.test(descr.langs)})
          // let cleaninfos = []
          descrs.forEach(descr=> {
            let dbinfo = _.find(dbinfos, info=> { return info.dname == descr.dname})
            if (!dbinfo) return
            // dbinfo.descr = descr
            descr.size = dbinfo.size
            delete descr._id
            delete descr._rev
            // cleaninfos.push(dbinfo)
          })
          // log('DBINFOS', cleaninfos)
          // log('DESCRS', descrs)
          let cfg = settings.get('cfg') || []
          cfg = JSON.parse(JSON.stringify(cfg))
          log('FIRST CFG', cfg)
          descrs.forEach((descr, idx)=> {
            descr.sync = true
            cfg.forEach(dict=> {
              if (descr.dname != dict.dname) return
              descr.active = dict.active
              descr.sync = true
              descr.idx = dict.idx
              dict.ok = true
            })
            if (!descr.active) descr.idx = 100 + idx // new dict on server
          })
          let unoks = _.filter(cfg, dict=> { return !dict.ok })
          descrs.push(...unoks)
          cfg = _.sortBy(descrs, 'idx')
          cfg.forEach((dict, idx)=> { dict.idx = idx }) // , dict.active = true

          // cfg.forEach(dict=> { dict.sync = true })
          // let dvr = _.find(cfg, dict=> { return dict.dname == 'dvr' })
          // dvr.sync = false
          settings.set('cfg', cfg)
          log('DESCRS-2', cfg)
          showRemoteDicts(cfg)
        })
        .catch(err=> {
          log('possible, no connection', err)
        })
    })
  })
}

function showRemoteDicts(cfg) {
  let obefore = q('#before-remote-table')
  if (!obefore) return
  obefore.textContent = ''
  let otable = q('#table-dicts-remote')
  if (otable) remove(otable)
  otable = createRemoteTable()

  cfg.forEach(rdb=> {
    // log('_________________________RDB', rdb)
    let otr = create('tr')
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
    let olink = create('td', 'link')
    if (rdb.sync) {
      let check = checkmark()
      check.dataset.unsync = rdb.dname
      olink.appendChild(check)
    } else {
      olink.dataset.clone = rdb.dname
      olink.textContent = 'clone'
    }
    otr.appendChild(olink)
    let oact = create('td', 'link')
    if (rdb.active) {
      let check = checkmark()
      check.dataset.disable = rdb.dname
      oact.appendChild(check)
    } else {
      oact.dataset.activate = rdb.dname
      let text = (rdb.sync) ? 'activate' : '------------'
      // log('ACT:', rdb, rdb.sync, text)
      oact.textContent = text
    }
    otr.appendChild(oact)
  })

  obefore.parentNode.insertBefore(otable, obefore.nextSibling);
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
  osync.textContent = 'clone:'
  oheader.appendChild(osync)
  let oact = create('td')
  oact.textContent = 'activate:'
  oheader.appendChild(oact)
  return otable
}

function checkmark() {
  let check = create('img', 'dict-check')
  check.setAttribute('src', '../resources/check.png')
  return check
}

export function cloneDict(dname) {
  // log('CLONE DICT', dname)
  let localpath = path.resolve(upath, 'pouch', dname)
  let remotepath = ['http://guest:guest@diglossa.org:5984', dname].join('/')
  let localDB = new PouchDB(localpath)
  let remoteDB = new PouchDB(remotepath)
  // localDB.info().then(function (info) {    log('LOCAL INFO', info) })
  // localDB.info().then(function (info) {    log('REMOTE INFO', info) })
  let progress = q('#progress')
  progress.classList.remove('is-hidden')

  remoteDB.replicate.to(localDB).on('complete', function (res) {
    let cfg = settings.get('cfg')
    let dict = _.find(cfg, dict=> { return dict.dname == dname })
    if (!dict) return
    dict.active = true
    log('ok, were done!', res)
    settings.set('cfg', cfg)
    showRemoteDicts(cfg)
    progress.classList.add('is-hidden')
  }).on('error', function (err) {
    log('boo, something went wrong!', err)
  })

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
  log('_______________MOVE', cfg)
  settings.set('cfg', cfg)
  showRemoteDicts(cfg)
}

export function activateDict(dname, on) {
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return
  dict.active = (on) ? true : false
  // log('____REMOTE: ACT/DIS', dname, cfg)
  settings.set('cfg', cfg)
  initDBs(cfg)
  showRemoteDicts(cfg)
}
