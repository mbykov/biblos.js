import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib/utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../app.config'
import path from "path";
import { antrax, checkConnection, delDictionary } from '/home/michael/a/loigos'
import { getCfg, installDBs } from '/home/michael/a/loigos/src/lib/pouch'
const fse = require('fs-extra')
import { navigate } from './nav'
// UPATH
// const upath = app.getPath("userData")
const upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')
const apath = app.getAppPath()

const log = console.log
const request = require('request');
let PouchDB = require('pouchdb')
let progress = q('#progress')

getCfg(apath, upath)
  .then(cfg=> {
    log('__________ GET CFG:', cfg)
    initDBs(cfg)
    settings.set('cfg', cfg)
  })
  .catch(err=> {
    log('CFG-ERR:', err)
  })


// initDBs()

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

log('______________INSTALL APATH', apath)
// installDBs(apath, upath)

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

// cfg + connection
export function initDBs(cfg) {
  if (!cfg) cfg = settings.get('cfg')
  if (!cfg || !cfg.length) cfg = initCfg()
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  checkConnection(upath, dnames)
}

function initCfg() {
  let pouchpath = path.resolve(upath, 'pouch')
  let dnames = fse.readdirSync(pouchpath)
  dnames = _.filter(dnames, dname=> { return dname != 'flex' })
  let cfg = dnames.map((dname, idx)=> { return {dname: dname, active: true, sync: true, idx: idx} })
  let locdict = _.find(cfg, dict=> { return dict.dname == config.ldname })
  if (locdict) locdict = {name: 'Local', langs: 'grc,any'}
  log('__________________________INIT CFG', cfg)
  settings.set('cfg', cfg)
  return cfg
}

/*
  что должно быть:
 */


export function requestRemoteDicts() {
  request(getopts, function (error, response, body) {
    if (error) console.error('soket error:', error)
    // log('__get response:', response)
    if (response && response.statusCode != 200)  return

    let dblist = JSON.parse(body)
    let dnames = _.filter(dblist, dict=> { return dict[0] != '_' })
    log('__remote dnames:', dnames)
    postopts.body = {keys: dnames}

    request(postopts, function (error, response, body) {
      if (error) console.error('post soket error:', error)
      // log('__post response:', response)
      if (response && response.statusCode != 200) return
      let dbinfos = body.map(dict=> { return {dname: dict.key, size: dict.info.doc_count} })
      // console.log('dbinfos:', dbinfos)
      // console.log('dnames:', dnames)
      dnames.push('kuku')

      Promise.all(dnames.map(function(dname) {
        let remotepath = [config.host, dname].join('/')
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
          // log('____________ remote info descrs:', descrs)
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
  log('_________________________________OT', otable)

  cfg.forEach(rdb=> {
    // log('_______________________rdb', rdb)
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
  let remotepath = [config.host, dname].join('/')
  let localDB = new PouchDB(localpath)
  let remoteDB = new PouchDB(remotepath)
  // localDB.info().then(function (info) {    log('LOCAL INFO', info) })
  // localDB.info().then(function (info) {    log('REMOTE INFO', info) })
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
  cfg = JSON.parse(JSON.stringify(cfg))
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return
  dict.active = (on) ? true : false
  log('____REMOTE: ACTiVATE IT:', dname, cfg)
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  log('____REMOTE: ACTiVATE IT:', dnames)
  settings.set('cfg', cfg)
  initDBs(cfg)
  showRemoteDicts(cfg)
}

export function delDict(dname) {
  log('delete dict', dname)
  progress.classList.remove('is-hidden')

}
