import _ from "lodash"
import { remote, ipcRenderer } from "electron";
const { app } = require('electron').remote
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, insertAfter } from '../lib/utils'
const settings = require('electron').remote.require('electron-settings')
import { config } from '../app.config'
import path from "path"
import { antrax } from 'antrax'
// import { antrax }  from '/home/michael/a/loigos'
import { checkConnection, ensureDBdir, streamDB }  from 'antrax/dist/lib/pouch'
// import { checkConnection, ensureDBdir, streamDB }  from '/home/michael/a/loigos/dist/lib/pouch'

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
let streams = []

const options = {
  "uri": [config.host, '_all_dbs'].join('/'),
  json: true
}

export function requestRemoteDicts() {
  initCfg()
    .then(rcfg=> {
      let cfg = settings.get('cfg')
      if (!cfg) cfg = rcfg
      if (cfg.length != rcfg.length) {
        cfg = JSON.parse(JSON.stringify(cfg))
        let newdict = _.difference(rcfg.map(dict=> { return dict.dname}), cfg.map(dict=> { return dict.dname}))
        // log('________NDICT', newdict)
        cfg.push(newdict)
        settings.set('cfg', cfg)
      }
      // log('_________+req-remote-cfg:', cfg, 'rem:', rcfg)
      showDicts(cfg)
    })

}

export function queryRemote(query, compound) {
  return antrax(query, compound)
}

export function initDBs(cfg) {
  let actives = _.filter(cfg, dict=> { return dict.active })
  let dnames = actives.map(dict=> { return dict.dname })
  // log('____check-connection:', dnames)
  checkConnection(upath, dnames)
}

// +g initCfg only for test
// Mousetrap.bind(['ctrl+g'], function(ev) {
//   initCfg()
//     .then(cfg=> {
//       cfg = JSON.parse(JSON.stringify(cfg))
//       log('_________+G-cfg:', cfg)
//       settings.set('cfg', cfg)
//     })
// })

function initCfg() {
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
  cfg = _.filter(cfg, dict=> { return dict.dname != 'flex' })
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
      let synctxt = '---'
      if (rdb.dname != config.ldname) {
        osync.dataset.sync = rdb.dname
        synctxt = 'clone'
        osync.classList.add('link')
      }
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

export function delDict(dname) {
  // progress.classList.remove('is-hidden')
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
  settings.set('cfg', cfg)
  initDBs(cfg)
  showDicts(cfg)
}

function streamDict(cfg, dname) {
  let dict = _.find(cfg, dict=> { return dict.dname == dname })
  if (!dict) return Promise.resolve([])
  let stream = new MemoryStream()
  let sec = settings.get('state').sec
  let ocounters
  if (sec == 'remote-dicts') ocounters = q('#remote-progress-counter')
  else ocounters = q('#init-progress-counter')
  let ocounter = create('div', 'counter')
  ocounters.appendChild(ocounter)

  let total = 0
  let step = config.batch_size/2
  stream.on('data', function(chunk) {
    total += step
    let percent = Math.round(parseFloat(1 - (dict.size - total)/dict.size).toFixed(2)*100)
    // log('__dumped :', dict.size, total, '%', percent)
    ocounter.innerHTML = 'cloning <b>' + dict.name + '</b> dictionary: ' + percent + '%'
    if (percent > 100) ocounter.textContent = ''
  })
  return streamDB(upath, dname, stream, config.batch_size)
    .then(function () {
      // console.log('Hooray the stream replication is complete!')
      return dname
    }).catch(function (err) {
      console.log('oh no an error', err.message);
    })
}

export function initState() {
  let state = settings.get('state')
  if (!state || (state && state.sec != 'main')) {
    state = {sec: config.defstate}
    settings.set('state', state)
  }
  navigate(state)
  state = JSON.parse(JSON.stringify(state))

  let lang = settings.get('lang')
  if (!lang) {
    lang = config.deflang
    settings.set('lang', lang)
  }

  let cfg = settings.get('cfg')
  if (!cfg) {
    progress.classList.remove('is-hidden')
    let defaultdicts = q('#default-dicts').classList.remove('is-hidden')
    initCfg() // +t
      .then(rcfg=> {
        ensureDBdir(upath)
        rcfg = JSON.parse(JSON.stringify(rcfg))
        Promise.all([
          streamDict(rcfg, 'terms')
            .then(res=> {
              return 'terms'
            }),
          streamDict(rcfg, 'flex')
            .then(res=> {
              return 'flex'
            }),
          streamDict(rcfg, 'wkt')
            .then(res=> {
              return 'wkt'
            })
        ])
          .then(res=>{
            let cfg = initialCfg(rcfg, res)
            // log('___________ ALL DICTS DONE', res, cfg)
            settings.set('cfg', cfg)
            // remote.getCurrentWindow().reload()
            // remote.getCurrentWebContents().reload()
            // remote.getCurrentWindow().reloadIgnoringCache()
            // app.relaunch()
            // app.exit(0)
            let defaultdicts = q('#default-dicts').classList.add('is-hidden')
            // initDBs(cfg)
            // nextTik - не годится здесь, просто initDB - виснет в Win, relaunch - уныло...
            // process.nextTick(function() {
            //   log('_________________NEXT TIK', cfg)
            //   initDBs(cfg)
            // })
            progress.classList.add('is-hidden')
          })
          .catch(err=>{ log('ERR-initReplication', err.message) })
      })
  } else {
    cfg = JSON.parse(JSON.stringify(cfg))
    initDBs(cfg)
  }

  return state
}

function initialCfg(cfg, installed) {
  cfg.forEach((dict, idx)=> {
    if (installed.includes(dict.dname)) dict.active = true, dict.sync = true, dict.idx = idx
    else dict.idx = 100 + idx
  })
  cfg = _.sortBy(cfg, 'idx')
  cfg.forEach((dict, idx)=> { dict.idx = idx})
  return cfg
}

// remote-table events:
document.addEventListener('click', (ev) => {
  let el = ev.target
  let data = el.dataset
  if (!data) return
  if (data.dname) {
    moveDict(data.dname, ev.ctrlKey)
  } else if (data.activate) {
    if (el.textContent != 'activate') return
    activateDict(data.activate, true)
  } else if (data.disable) {
    activateDict(data.disable, false)
  } else if (data.sync) {
    if (el.textContent != 'clone') return
    let dname = data.sync
    if (streams.includes(dname)) return
    streams.push(dname)
    let cfg = settings.get('cfg')
    cfg = JSON.parse(JSON.stringify(cfg))
    streamDict(cfg, data.sync)
      .then(dname=> {
        cfg = initialCfg(cfg, [dname])
        settings.set('cfg', cfg)
        showDicts(cfg)
      })
  }
  else if (data.cleanup) {
    let cfg
    settings.set('cfg', cfg)
    remote.getCurrentWebContents().reload()
    initState()
    // remote.getCurrentWindow().reload()
    // remote.getCurrentWebContents().reload()
    // remote.getCurrentWebContents().reloadIgnoringCache()
    // app.relaunch()
    // app.exit(0)
  }
})
