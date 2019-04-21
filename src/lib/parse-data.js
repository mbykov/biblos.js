import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, getInnermostHovered } from './utils'
import { ipcRenderer } from "electron";
import { queryRemote } from "./remote";
const settings = require('electron').remote.require('electron-settings')
const log = console.log
let progress = q('#progress')

// ipcRenderer.on('query-result', function (event, chains) {
//   progress.classList.add('is-hidden')
//   showResult(chains)
// })

export function showText(state) {
  if (!state.pars) return
  let osource = q('#source')
  let oresult = q('#result')
  if (!osource || !oresult) return
  empty(osource)
  empty(oresult)
  closePopups()

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

  // let actives = qs('span.active-form')
  // if (actives.length == 1) showResults(actives[0].textContent)
}

function closePopups() {
  let opopup = q('#popup')
  if (opopup) remove(opopup)
  let oetyrels = q('#etyrels')
  if (oetyrels) remove(oetyrels)
}

export function queryDBs(el, compound) {
  progress.classList.remove('is-hidden')
  let str = el.textContent.trim()
  queryRemote(str, compound)
    .then(res => {
      if (!res) return
      closePopups()
      if (compound) showCompound(el, res)
      else showResult(res)
    }).catch(function (err) {
      console.log('ANTRAX-ERR', str, err)
    })
}

function showCompound(el, res) {
  progress.classList.add('is-hidden')
  // log('showCOMP', res)
  if (!res.chains) return
  let opopup = createPopup(el)
  let oul = opopup.querySelector('.compound-list')
  res.chains.forEach((chain, idx)=> {
    let oline = create('li', 'comp-line')
    oline.dataset.chain = JSON.stringify(res.chains[idx])
    oul.appendChild(oline)
    chain.forEach(sec=> {
      let ospan
      ospan = span(sec.seg, '')
      if (!sec.flexes) ospan.classList.add('comp-segment')
      if (sec.connector) ospan.classList.add('comp-connector')
      else if (sec.dicts) ospan.classList.add('active-dict')
      oline.appendChild(ospan)
    })
  })
}

function createPopup(el, upper) {
  let opopup = create('div', 'popup')
  opopup.id = 'popup'
  // opopup.classList.add('upper')
  document.body.appendChild(opopup)

  let coords = getCoords(el)
  opopup.classList.remove('is-hidden')
  let ncoords = {top: coords.top+24, left: coords.left}
  placePopup(ncoords, opopup)
  let oul = create('ul', 'compound-list')
  opopup.appendChild(oul)
  return opopup
}

export function showSegment(el) {
  let clist = el.closest('.comp-line')
  if (!clist.dataset || !clist.dataset.chain) return
  let chain = JSON.parse(clist.dataset.chain)
  let sec = _.find(chain, sec=> { return sec.seg == el.textContent } )
  if (!sec) return
  let oetyrels = q('#etyrels')
  if (oetyrels) remove(oetyrels)
  oetyrels = createPopup(el)
  oetyrels.id = 'etyrels'
  // log('SEC', sec.dicts)
  let oul = create('ul', 'sect-dicts-ul')
  oetyrels.appendChild(oul)
  let gdicts = _.groupBy(sec.dicts, 'rdict' )
  // log('GD', gdicts)
  // let dicts = _.values(gdicts)
  for (let rdict in gdicts) {
    let dicts = gdicts[rdict]
    let odictline = create('li', 'sect-dict-line')
    let lastseg = {seg: rdict, dicts: dicts}
    odictline.dataset.lastseg = JSON.stringify(lastseg)
    odictline.textContent = rdict
    oul.appendChild(odictline)
  }
}

function getPos(dict) {
  let pos
  if (dict.pos) pos = dict.pos
  else if (dict.verb) pos = 'verb'
  else if (dict.name) pos = 'name'
  return pos
}

export function showSegResult(el) {
  let ores = q('#result')
  empty(ores)
  let odictline = el.closest('.sect-dict-line')
  if (!odictline.dataset || !odictline.dataset.lastseg) return
  let lastseg = JSON.parse(odictline.dataset.lastseg)
  if (!lastseg) return
  lastseg.dicts.forEach(dict=> { dict.fls = [] })
  let chain = [lastseg]
  let chains = [chain]
  showMutables(chains)
}


function showResult(res) {
  progress.classList.add('is-hidden')
  let ores = q('#result')
  empty(ores)
  if (res.terms) showTerms(res.terms)
  if (res.chains) showMutables(res.chains)
  if (!res.chains && !res.terms) showNoResult()
}

function showNoResult() {
  log('NO RESULT')
}
function showTerms(terms) {
  terms.forEach(term=> {
    showTerm(term)
  })
}

function showTerm(dict) {
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
  let morphs = parseMorphs(dict)
  if (morphs) {
    let oMorph = createMorph(morphs)
    odict.appendChild(oMorph)
  }
  if (dict.trns) {
    let otrns = createTrns(dict)
    odict.appendChild(otrns)
  }
}

function showMutables(chains) {
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
  } else if (dict.term && dict.pos) {
    let opos = span(dict.pos, 'dict-pos')
    odicthead.appendChild(opos)
  }
  return odicthead
}

function parseMorphs (dict) {
  let morphs
  let fls = dict.fls || dict.morphs
  if (!fls) return
  if (dict.verb) {
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

  if (morphs.toString() == '.') {
    let degree = fls.map(flex => { return flex.degree }).toString()
    if (degree == 'adv') morphs = ['adverb']
    else morphs = [['adverb:', degree].join(' ')]
  }
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
    let parts = trn.split(/, [A-Z]| [A-Z][^ ]*[0-9]/)
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
