let _ = require('lodash')
let d = require('debug')('csv')
let log = console.log
// let glob = require('glob-fs')({ gitignore: true })
let fse = require('fs-extra')
let path = require('path')
// import sband from '../../../sband'
// import sband from 'speckled-band'
import {comb, plain, oxia} from 'orthos'
// import {oxia, comb, plain} from '../../../greek/orthos'
// import { iu } from './data'

import { antrax, checkConnection, readDictionary } from '/home/michael/a/loigos/'
let miss = require('mississippi')
// let split = require('split')
// let parse = require('csv-parse')

let code = 'grc'
const dname = 'current'

// return read stream
function fromFreq(freqs) {
  let idx = 0
  return miss.from.obj(function(size, next) {
    if (idx == freqs.length) return next(null, null)
    let chunk = freqs[idx]
    idx++
    next(null, chunk)
  })
}

// freq не нужен

// from nav.js
export function generateDictChunk (upath, dname, pars, finish) {
  // let dpath = state.ldpath
  let freq = {}
  freqChunk(freq, pars)
  let freqs = _.values(freq)
  // log('FREQ-CHUNK', chunkpath, frvalues)

  createChunk(upath, dname, freqs, function(chdicts) {
    // log('index-finished-from-generate: ', chdicts.length)
    finish(chdicts)
  })
}

// MAIN
// run.js
export function createChunk (upath, dname, freqs, done) {
  // log('________________ LOCAL FREQS', freqs)
  readDictionary(upath, dname)
    .then(rdocs=> {
      // let rdocs = _.compact(res.rows.map(row => { return row.doc }))
      let docs = _.flatten(_.compact(rdocs.map(rdoc => { return rdoc.docs })))
      // let rdicts = docs.map(doc=> { return doc.rdict })
      // log('________________ LOCAL DB RDICTS', docs.length, rdicts)

      miss.pipe(
        fromFreq(freqs),
        miss.parallel(5, determineForm),
        groupResult(upath, docs, function(rdocs) {
          // log('_______________________ finish group-result', rdocs)
          // let gdocs = {}
          // rdocs.forEach(doc => {
          //   let id = doc.plain
          //   if (!gdocs[id]) gdocs[id] = {_id: id, docs: [doc]}
          //   else gdocs[id].docs.push(doc)
          // })
          // let docs = _.values(gdocs)
          done(rdocs)
        })
      )
    })
    .catch((err)=> {
      log('_______ANTRAX-ERR', err)
    })
}

function determineForm (freqline, cb) {
  let wf = freqline.wf
  if (!wf) return cb(null, null)
  // log('_________________________ determine form', wf)

  antrax(wf).then(res => {
    let dicts = _.flattenDeep(res.chains.map(chain=> { return chain.map(seg=> { return seg.dicts })}))
    dicts = _.filter(dicts, dict=> { return dict.name || dict.verb })
    dicts = _.filter(dicts, dict=> { return !dict.possible })
    dicts.forEach(dict=> { delete dict.reg, delete dict.trns, delete dict.dname, delete dict.keys, delete dict.fls, delete dict.weight })
    let dictkey = {}
    let uniqs = []
    dicts.forEach(dict=>{
      let dkey = [dict.plain, dict.key, dict.name, dict.verb].join('-')
      if (!dictkey[dkey]) uniqs.push(dict), dictkey[dkey] = true
    })
    cb(null, uniqs)
  }).catch(function (err) {
    console.log('CSV-ANTRAX-ERR', err)
  })
}

function groupResult (upath, docs, done) {
  let dictkeys = {}
  return miss.through.obj(function (results, enc, next) {
    results.forEach(result=> {
      // log('_____________R', result)
      // let dictkey = [comb(result.rdict), result.name, result.verb].join('-')
      // let dictkey = JSON.stringify(result)
      if (!result.key && !result.keys) return // это terms, но также и баги в словаре WKT?
      let dict = {rdict: result.rdict, dict: comb(result.rdict), plain: result.plain}
      if (result.verb) dict.verb = true
      if (result.name) dict.name = true
      if (dict.verb && result.augs) dict.augs = _.compact([result.augs.sort()[0]])
      if (result.key) dict.key = result.key.split('-')[0]
      else if (result.keys) dict.key = result.keys.split('-')[0]

      // let dictkey = JSON.stringify(dict)
      let dictkey = [result.dict, result.name, result.verb].join('-')
      if (!dictkeys[dictkey]) dictkeys[dictkey] = dict
    })
    next()
  }, function(cb) {
    let chdicts = _.values(dictkeys)

    // trns from old rows
    chdicts.forEach(chdict=> {
      let already = _.find(docs, doc=> { return chdict.rdict == doc.rdict })
      if (already) chdict.trns = already.trns
    })

    done(chdicts)
    cb(null, null)
  })
}

function freqChunk (freq, pars) {
  pars.forEach(par=> {
    par.forEach(span=> {
      if (!span.lang) return
      let wfs = span.text.split(' ')
      wfs.forEach(wf=> {
        wf = oxia(comb(wf))
        wf = wf.toLowerCase()
        if (!freq[wf]) freq[wf] = {wf: wf, freq: 1}
        else freq[wf].freq += 1
      })
    })
  })
}



function cleanStr(row) {
  let clean = row.trim()
  clean = clean.replace(/\.$/, '')
  clean = clean.replace(/ᾰ/gi, 'α').replace(/ᾱ/gi, 'α').replace(/ῑ/gi, 'ι').replace(/ῐ/gi, 'ι').replace(/ῠ/gi, 'υ').replace(/ῡ/gi, 'υ')
  return clean
}


// FREQs

// export function freq (datapath) {
//   let freq = {}
//   let files = fse.readdirSync(datapath)
//   d('Fs', files.length)
//   let file = path.resolve(datapath, 'periSyntaxeos.txt')
//   files = [file]

//   files.forEach(file => {
//     let fpath = path.resolve(datapath, file)
//     let text = fse.readFileSync(fpath,'utf8').trim()
//     let rows = text.split('\n')
//     rows = _.compact(rows)
//     rows = rows.slice(3, 4)
//     rows.forEach((row, idx)=> {
//       let clean = cleanStr(row)
//       let pars = sband(clean, code)
//       if (!pars) return
//       freqChunk (freq, pars)
//     })
//   })

//   let values = _.values(freq)
//   let sorted = _.sortBy(values, 'wf')
//   return sorted
// }