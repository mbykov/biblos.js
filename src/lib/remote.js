import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib//utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../configs/app.config'
import path from "path";
import { antrax, checkConnection } from '/home/michael/a/loigos'
const fse = require('fs-extra')

const log = console.log
// const nano = require('nano')('http://guest:guest@diglossa.org:5984');
const nano = require('nano')('http://guest:guest@localhost:5984');

initDBs()

// пока что terms отдельно от wkt
function initDBs() {
  let upath = app.getPath("userData")
  // log('FIRST UPATH', upath)
  upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')
  // log('UPATH', upath)

  let cfg = settings.get('cfg')
  if (cfg) return
  cfg = initCfg(upath)
  let dnames = cfg.map(dict=> { return dict.dname })
  dnames = ['wkt', 'dvr', 'lsj']
  // let dnames = ['wkt']
  checkConnection(upath, dnames)
}

function initCfg(upath) {
  let pouchpath = path.resolve(upath, 'pouch')
  let dnames = fse.readdirSync(pouchpath)
  let cfg = dnames.map((dname, idx)=> { return {dname: dname, active: true, idx: idx} })
  log('NCFG', cfg)
  settings.set('cfg', cfg)
  return cfg
}

let descr = {
  "_id": "description",
  "name": "И.Х.Дворецкий",
  "lang": "grc, rus",
  "source": "https://wiki.lingvoforum.net/wiki/index.php/Книги/Древнегреческо-русский_словарь_Дворецкого/0",
  "email": "m.bykov#gmail.com"
}

let wkt = {
  "_id": "description",
  "name": "wkt",
  "lang": "grc, eng",
  "source": "https://en.wiktionary.org/wiki/Category:Ancient_Greek_lemmas",
  "email": "m.bykov@gmail.com"
}


export function remoteDicts() {
  nano.db.list().then((dnlist) => {
    let defaults = ['_users', '_replicator']
    let dnames = _.difference(dnlist, defaults)
    Promise.all(dnames.map(function(dname) {
      return nano.db.get(dname).then((info) => {
        let db = nano.use(dname)
        return db.get('description').then((descr)=> {
          let description = {dname: dname, size: info.doc_count}
          if (descr) description.descr = descr
          return description
        }).catch(err=> {
          return {dname: dname, size: info.doc_count}
        })
      })
    })).then(dbinfos=> {
      dbinfos = _.compact(dbinfos)
      dbinfos = _.filter(dbinfos, dbinfo=> { return dbinfo.descr && dbinfo.descr.langs && dbinfo.descr.langs.split(/,? /).includes(config.code) })
      settings.set('dbinfos', dbinfos)
      showRemoteDicts(dbinfos)
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
  let otable = q('#table-remote')
  if (otable) empty(otable)
  else {
    let sec_id = ['#remote-dicts', state.lang].join('_')
    let osection = q(sec_id)
    otable = createRemoteTable()
    osection.appendChild(otable)
  }
  let oheader = q('#remote-table-header')

  dbinfos.forEach(rdb=> {
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
  otable.id = 'table-remote'
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

export function remoteDBInfo(state) {
  log('DINFOstate:', state)
  let dbinfos = settings.get('dbinfos')
  let dbinfo = _.find(dbinfos, dbinfo=> { return dbinfo.dname == state.dname})
  log('DINFO:', dbinfo)
}

function createInfoTable() {
  let otable = create('table', 'db-info-table')
  otable.id = 'db-info-table'
  let oheader = create('tr', 'db-info-table-header-remote')
  oheader.id = 'db-info-table-header-remote'
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

export function localDicts() {
  showLocalDicts()
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
  let oheader = q('#table-header-local')
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

    // let olink = create('td', 'link')
    // if (dnames.includes(rdb.dname)) {
    //   let check = checkmark()
    //   olink.appendChild(check)
    // } else {
    //   olink.textContent = 'sync'
    // }
    // olink.dataset.clone = rdb.dname
    // otr.appendChild(olink)
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
