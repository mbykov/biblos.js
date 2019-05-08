import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib//utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../configs/app.config'
import path from "path";
import { antrax, checkConnection } from '/home/michael/a/loigos'
import { freq, csv } from '/home/michael/greek/localDict'
const fse = require('fs-extra')

const log = console.log
const request = require('request');
let PouchDB = require('pouchdb')

initDBs()

// пока что terms отдельно от wkt
function initDBs() {
  let upath = app.getPath("userData")
  // log('FIRST UPATH', upath)
  upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')
  // log('UPATH', upath)

  let cfg = settings.get('cfg')
  if (!cfg) cfg = initCfg(upath)
  let dnames = cfg.map(dict=> { return dict.dname })
  dnames = ['wkt', 'dvr', 'lsj']
  // dnames = ['wkt']
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
  log('SHOW LOCAL DICTS', cfg)
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

export function generateChunk (state) {
  let dpath = state.ldpath
  let ldictpath = path.resolve(dpath, 'local.csv')
  if (!fse.existsSync(ldictpath)) return
  let chunkpath = path.resolve(dpath, 'localChunk.csv')
  log('LDCHUNK', chunkpath)
}
