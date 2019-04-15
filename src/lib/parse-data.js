import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, getInnermostHovered } from './utils'
import { ipcRenderer } from "electron";
const settings = require('electron').remote.require('electron-settings')
const log = console.log
let progress = q('#progress')

ipcRenderer.on('query-result', function (event, chains) {
  progress.classList.add('is-hidden')
  showResult(chains)
})

export function showText(state) {
  if (!state.pars) return
  let osource = q('#source')
  let oresult = q('#result')
  if (!osource || !oresult) return
  empty(osource)
  empty(oresult)

  state.pars.forEach(spans => {
    let opar = p()
    opar.classList.add('par')
    spans.forEach(spn => {
      let ospan = span(spn.text)
      if (spn.lang) ospan.classList.add('active-form')
      else if (spn.punct) ospan.classList.add('punct') //, wfs.push(spn.text)
      else ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    osource.appendChild(opar)
  })

  // let actives = qs('span.active-forn')
  // if (actives.length == 1) showResults(actives[0].textContent)
}

export function queryDBs(el, compound) {
  progress.classList.remove('is-hidden')
  let str = el.textContent.trim()
  let query = {query: str}
  if (compound) query.compound = true
  ipcRenderer.send('queryDBs', query)
}

function showResult(res) {
  // log('CHAINS', res)
  let ores = q('#result')
  empty(ores)
  log('R', res)
  if (res.terms) showTerms(res.terms)
  if (res.chains) showChains(res.chains)
  if (!res.chains && !res.terms) showNoResult()
}

function showNoResult() {
  log('NO RESULT')
}
function showTerms(terms) {
  log('Terms:', terms)
  terms.forEach(term=> {
    showTerm(term)
  })
}

function showTerm(dict) {
  log('Term:', dict)
  let ores = q('#result')
  // log('DICT:', rdict)
  let owf = create('div', 'dict-div')
  ores.appendChild(owf)
  let oformhead = create('div', 'dict-query')
  oformhead.textContent = dict.term
  owf.appendChild(oformhead)
  let odict = create('div', 'dict-container')
  owf.appendChild(odict)
  let odicthead = showDictHeader(dict)
  odict.appendChild(odicthead)
  if (dict.trns) {
    let otrns = createTrns(dict)
    odict.appendChild(otrns)
  }
}

function showChains(chains) {
  chains.forEach(chain=> {
    let lastseg = _.last(chain)
    showLastSeg(lastseg)
  })
}

function showLastSeg(rdict) {
  let ores = q('#result')
  // log('DICT:', rdict)
  let owf = create('div', 'dict-div')
  ores.appendChild(owf)
  let oformhead = create('div', 'dict-query')
  oformhead.textContent = rdict.seg
  owf.appendChild(oformhead)
  rdict.dicts.forEach(dict=> {
    let odict = create('div', 'dict-container')
    owf.appendChild(odict)
    let odicthead = showDictHeader(dict)
    odict.appendChild(odicthead)
    let morphs = parseMorphs(dict)
    if (morphs) {
      let oMorph = createMorph(morphs)
      odict.appendChild(oMorph)
    }
    if (dict.trns) {
      let otrns = createTrns(dict)
      odict.appendChild(otrns)
    }
  })
}

function showDictHeader(dict) {
  let odicthead = create('div', 'dict-header')
  let odname = span(dict.dname, 'dict-dname')
  odicthead.appendChild(odname)
  let ordict = span(dict.rdict, 'dict-rdict')
  odicthead.appendChild(ordict)
  if (dict.gends) {
    let ogends = span(dict.gends.toString(), 'dict-gends')
    odicthead.appendChild(ogends)
  }
  return odicthead
}

function parseMorphs (dict) {
  let morphs
  let fls = dict.fls
  if (dict.pos == 'verb') {
    let vfls = _.filter(fls, flex=> { return flex.numper })
    let pfls = _.filter(fls, flex=> { return flex.numcase })
    let ifls = _.filter(fls, flex=> { return !flex.numcase && !flex.numper })
    morphs = vfls.map(flex => { return [flex.tense, flex.numper].join(' ') })
    if (pfls.length) {
      let pmorphs = pfls.map(flex => { return [flex.tense, [flex.gend, flex.numcase].join('.') ].join(', ') })
      morphs = morphs.concat(pmorphs)
    }
    if (ifls.length) {
      let imorphs = ifls.map(flex => { return flex.tense })
      morphs = morphs.concat(imorphs)
    }
  }
  else if (dict.name && dict.gends) morphs = fls.map(flex => { return [dict.gends.toString(), flex.numcase].join('.') })
  else if (dict.name) morphs = fls.map(flex => { return [flex.gend, flex.numcase].join('.') })

  else if (dict.pos == 'pron')  morphs = fls.map(flex => { return [flex.gend || '-', flex.numcase].join('.') })
  else if (dict.pos == 'art')  morphs = fls.map(flex => { return [flex.gend, flex.numcase].join('.') })
  else if (dict.pos == 'adv')  morphs = fls.map(flex => { return flex.degree })
  else if (dict.pos == 'part')  morphs = fls.map(flex => { return [flex.gend, flex.numcase].join('.') })
  return morphs
}

function createMorph (morphs) {
  let ofls = create('ul', 'dict-fls')
  morphs.forEach(morph => {
    let ofl = create('li')
    ofl.textContent = morph
    ofls.appendChild(ofl)
  })
  return ofls
}

function createTrns (dict) {
  let otrns = create('ul', 'dict-trns')
  if (!dict.trns) dict.trns = ['no transtation in this dict article']
  dict.trns.forEach(trn => {
    let otrn = create('li', 'dict-trns-li')
    let parts = trn.split(/ [A-Z]/)
    let shown = parts[0]
    // let oshown = span(shown)
    let hidden = trn.replace(shown, '')
    let html = hidden.split('(').join('<span class="grey">').split(')').join('</span>')
    let ohidden = span('', 'is-hidden')
    ohidden.innerHTML = html
    ohidden.classList.add('dict-trns-li-hidden')
    otrn.innerHTML = shown
    otrn.appendChild(ohidden)
    otrns.appendChild(otrn)
  })
  return otrns
}
