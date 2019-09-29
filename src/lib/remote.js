import _ from "lodash"
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib/utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../app.config'
import path from "path"
import { antrax } from 'antrax'
import { initialReplication, checkConnection, streamDB }  from '/home/michael/a/loigos/dist/lib/pouch'
// import { initialReplication, checkConnection, streamDB }  from 'antrax/dist/lib/pouch'

let MemoryStream = require('memorystream');

const log = console.log
const fse = require('fs-extra')
import { navigate } from './nav'
const Mousetrap = require('mousetrap')

const upath = app.getPath("userData")
const apath = app.getAppPath()
const code = config.code
const greekONLY = ['flex', 'terms', 'wkt', 'lsj', 'dvr', 'souda', '', '', '', '', '']

const request = require('request')
const rp = require('request-promise')
let PouchDB = require('pouchdb')

let progress = q('#progress')

// const getopts = {
//   "url": [config.host, '_all_dbs'].join('/')
// }

// const postopts = {
//   "method": "POST",
//   "url": [config.host, '_dbs_info'].join('/'),
//   "json": true,
//   "headers": {
//     "Content-type": "application/json"
//   }
// }

const options = {
  "uri": [config.host, '_all_dbs'].join('/'),
  json: true
}

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

export function initDBs(cfg) {
  let active = _.filter(cfg, dict=> { return dict.active })
  let dnames = active.map(dict=> { return dict.dname })
  // log('____check conn:', dnames)
  checkConnection(upath, dnames)
}

Mousetrap.bind(['ctrl+e'], function(ev) {
  let dname = 'souda'
  let cfg = settings.get('cfg')
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return
  log('_________+E-start', dname, dict.size)

  let stream = new MemoryStream()
  let total = 1
  stream.on('data', function(chunk) {
    let size = chunk.toString().length
    total += size
    let chunkdocs = parseFloat(total/273).toFixed(2)
    let percent = parseFloat(1 - (dict.size - chunkdocs)/dict.size).toFixed(2)*100
    // log('__dumped :', size, total, chunkdocs, percent)
    log('__percent :', percent, '%')

    // total всегда 385407 ???????????????????????/


  })

  streamDB (upath, dname, stream)
    .then(function () {
      console.log('Hooray the stream replication is complete!');
      log('__dumped :', dname, total, dict.size)
    }).catch(function (err) {
      console.log('oh no an error', err.message);
    })
})

Mousetrap.bind(['ctrl+t'], function(ev) {
  log('_________getTest start:')
  initialReplication(apath, upath)
  // .then(cfg=> {
  // log('_________+T-initialReplication:', cfg)
    // })
})

Mousetrap.bind(['ctrl+g'], function(ev) {
  initCfg()
    .then(cfg=> {
      log('_________+G-cfg:', cfg)
      settings.set('cfg', cfg)
    })
})

export function initCfg() {
  return rp(options)
    .then(function (rdnames) {
      rdnames = _.filter(rdnames, dict=> { return dict[0] != '_' })
      rdnames = _.intersection(rdnames, greekONLY)
      return remoteCfg(rdnames)
        .then(cfg=>{
          return cfg
        })
    })
    .catch(function (err) {
      log('ERR-request')
      return []
    })
}

function remoteCfg(rdnames) {
  return Promise.all(rdnames.map(function(dname) {
    let dbpath = [config.host, dname].join('/')
    let pouch = new PouchDB(dbpath, {skip_setup: true})
    // pouch.installSizeWrapper()
    return Promise.all([
      pouch.info()
        .then(info=> {
          info.dname = dname
          return info
        })
        .catch(err=> {
          if (err.reason == 'missing') return
          log('catch info ERR', err)
        }),
      pouch.get('description')
        .then(descr=> {
          return descr
        })
        .catch(err=> {
          if (err.reason == 'missing') return
          log('catch descr ERR', err)
        })
    ])
  }))
    .then(infodescrs=> {
      let infos = []
      // log('--cfg-infos-infodescrs--', infodescrs)
      rdnames.forEach((dname, idx)=> {
        let infodescr = infodescrs[idx]
        if (!infodescr) return
        let info = infodescr[0]
        let descr = infodescr[1]
        if (!info || !descr) return
        let dbinfo = { dname: dname, name: descr.name, size: info.doc_count, langs: descr.langs, source: descr.source }
        infos.push(dbinfo)
      })
      // log('--cfg-infos--', infos)
      return infos
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
    // let oinfo = create('td', 'dinfo')
    // oinfo.textContent = 'info'
    // oinfo.dataset.dinfo = rdb.dname
    // let descr = JSON.stringify(rdb)
    // oinfo.setAttribute('title', descr)
    // otr.appendChild(oinfo)
    let osync = create('td', '')
    if (rdb.sync) {
      let check = checkmark()
      osync.appendChild(check)
    } else {
      osync.dataset.sync = rdb.dname
      let synctxt = (rdb.dname == config.ldname) ? '---' : '---'
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
  // let oinfo = create('td')
  // oinfo.textContent = 'info'
  // oheader.appendChild(oinfo)
  let osync = create('td')
  osync.textContent = 'sync:'
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

export function delDict(dname) {
  progress.classList.remove('is-hidden')
}

export function moveDict(dname, shift) {
  let cfg = settings.get('cfg')
  cfg = JSON.parse(JSON.stringify(cfg))
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

// function remoteCfg_() {
//   request(getopts, function (error, response, body) {
//     if (error) console.error('soket error:', error)
//     if (error) return
//     if (response && response.statusCode != 200)  return []

//     let dblist = []
//     try {
//       dblist = JSON.parse(body)
//     } catch (err) {
//       console.log('ERR remote dbs list:', err)
//       return
//     }
//     let rdnames = _.filter(dblist, dict=> { return dict[0] != '_' })
//     let code = config.code
//     let greeks = ['flex', 'terms', 'wkt', 'lsj', 'dvr', 'souda', '', '', '', '', '']
//     rdnames = _.intersection(rdnames, greeks)
//     if (!rdnames.length) return []

//     return Promise.all(rdnames.map(function(dname) {
//       let dbpath = [config.host, dname].join('/')
//       // log('___dbpath', dbpath)
//       let pouch = new PouchDB(dbpath, {skip_setup: true})
//       return Promise.all([
//         pouch.info()
//           .then(info=> {
//             info.dname = dname
//             return info
//           })
//           .catch(err=> {
//             if (err.reason == 'missing') return
//             log('catch info ERR', err)
//           }),
//         pouch.get('description')
//           .then(descr=> {
//             return descr
//           })
//           .catch(err=> {
//             if (err.reason == 'missing') return
//             log('catch descr ERR', err)
//           })
//       ])
//     }))
//       .then(infodescrs=> {
//         let infos = []
//         // log('--cfg-infos-infodescrs--', infodescrs)
//         rdnames.forEach((dname, idx)=> {
//           let infodescr = infodescrs[idx]
//           if (!infodescr) return
//           let info = infodescr[0]
//           let descr = infodescr[1]
//           if (!info || !descr) return
//           let dbinfo = { dname: dname, name: descr.name, size: info.doc_count, langs: descr.langs, source: descr.source } //
//           infos.push(dbinfo)
//         })
//         // log('--cfg-infos-infos--', infos)
//         return infos
//       })
//   })
// }

// export function requestRemoteDicts() {
//   let cfg = settings.get('cfg')
//   cfg = JSON.parse(JSON.stringify(cfg))

//   getCfgInfos(upath)
//     .then(infos=> {
//       cfg.forEach(dict=> {
//         let info = _.find(infos, info=> { return dict.dname == info.dname })
//         if (!info) return
//         dict.name = info.name, dict.langs = info.langs, dict.size = info.size
//       })
//       settings.set('cfg', cfg)
//       showDicts(cfg)

//       let dnames = cfg.map(dict=> { return dict.dname })
//       request(getopts, function (error, response, body) {
//         if (error) console.error('soket error:', error)
//         if (error) return
//         if (response && response.statusCode != 200)  return

//         let dblist
//         try {
//           dblist = JSON.parse(body)
//         } catch (err) {
//           console.log('remote dbs list ERR', err)
//           dblist = []
//         }
//         let rdnames = _.filter(dblist, dict=> { return dict[0] != '_' })
//         let synced = _.intersection(rdnames, dnames)
//         cfg.forEach(dict=> {
//           if (!synced.includes(dict.dname)) return
//           dict.sync = true
//         })
//         settings.set('cfg', cfg)
//         showDicts(cfg)
//       })
//     })
// }
