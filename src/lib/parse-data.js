import _ from 'lodash'
import { q, qs, empty, create, remove, removeAll, span, p, div, getCoords, placePopup, getInnermostHovered, enclitic } from './utils'
import { queryRemote } from "./remote";
// import {oxia, comb, plain, strip} from '../../../../greek/orthos'
import {oxia, comb, plain, strip} from 'orthos'
import { t15n } from "./transgript"

const settings = require('electron').remote.require('electron-settings')
const log = console.log
let progress = q('#progress')

export const data = {}

export function showText(pars) {
  if (!pars || !pars.length) return
  let osource = q('#source')
  let oresult = q('#result')
  if (!osource || !oresult) return
  empty(osource)
  empty(oresult)
  closePopups()

  pars.forEach(spans => {
    let opar = p()
    opar.classList.add('par')
    spans.forEach(spn => {
      if (spn.punct) spn.text += ' '
      let ospan = span(spn.text)
      if (spn.lang) ospan.classList.add('active-form')
      else if (spn.punct) ospan.classList.add('punct') //, wfs.push(spn.text)
      else ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    osource.appendChild(opar)
  })

  let actives = qs('span.active-form')
  if (actives.length == 1) {
    let mono = actives[0]
    if (mono) queryDBs(mono)
  }
}

export function closePopups() {
  removeAll('.popup')
}

function createPopup(el, upper) {
  let opopup = create('div', 'popup')
  document.body.appendChild(opopup)
  opopup.classList.remove('is-hidden')

  let coords = getCoords(el)
  let ncoords = {top: coords.top+24, left: coords.left}
  if (upper) ncoords = {top: coords.top-32, left: coords.left}
  placePopup(ncoords, opopup)
  let oul = create('ul', 'compound-list')
  opopup.appendChild(oul)
  return opopup
}

function showCompound(el, res) {
  if (!res.chains || !res.chains.length) return
  if (res.chains.length == 1 && res.chains[0].length == 1) return
  let opopup = createPopup(el)
  let oul = opopup.querySelector('.compound-list')
  res.chains.forEach((chain, idx)=> {
    let oline = create('li', 'comp-line')
    oul.appendChild(oline)
    chain.forEach((sec, idy)=> {
      let ospan
      let last = false
      let size = chain.length - 1
      if (idy == size) last = true
      ospan = span(sec.seg, '')
      if (!last && !sec.flexes) ospan.classList.add('comp-segment')
      if (sec.connector) ospan.classList.add('comp-connector')
      else if (sec.dicts) ospan.classList.add('active-dict')
      ospan.dataset.segdicts = JSON.stringify(res.chains[idx][idy].dicts)
      ospan.dataset.cogns = JSON.stringify(res.chains[idx][idy].cogns)
      oline.appendChild(ospan)
    })
  })
}

export function createCognateList(el) {
  if (el.dataset.cogns == 'undefined' || !el.dataset.cogns || !el.dataset.cogns.length) return
  let cognates = JSON.parse(el.dataset.cogns)
  if (!cognates.length) return
  let opopup = createPopup(el)
  let oul = opopup.querySelector('.compound-list')
  oul.classList.add('cognate-list')

  let gdicts = _.groupBy(cognates, 'rdict' )
  for (let rdict in gdicts) {
    let dicts = gdicts[rdict]
    let oline = create('li', 'cognate-line')
    oline.textContent = rdict
    oline.dataset.dicts = JSON.stringify(dicts)
    oul.appendChild(oline)
  }
}

export function showCognate(el) {
  let ores = q('#result')
  empty(ores)
  if (!el.dataset.dicts) return
  let segdicts = JSON.parse(el.dataset.dicts)
  if (!segdicts.length) return
  showDicts(el, segdicts)
}

export function queryDBs(el, compound) {
  progress.classList.remove('is-hidden')
  let str = el.textContent.trim()
  str = enclitic(comb(str))
  queryRemote(str, compound)
    .then(res => {
      // closePopups() // - can NOT be closed here!!, res
      progress.classList.add('is-hidden')
      if (!res) return noResult()
      else if (!res.chains.length && !res.terms.length) return noResult()
      if (compound) showCompound(el, res)
      else showResult(el, res)
    }).catch(function (err) {
      console.log('ANTRAX-ERR', str, err)
    })
}

// compound: active-dict mouseover
export function showSegResult(el) {
  let ores = q('#result')
  empty(ores)
  if (!el.dataset.segdicts) return
  let segdicts = JSON.parse(el.dataset.segdicts)
  if (!segdicts.length) return
  showDicts(el, segdicts)
}

function noResult() {
  let ores = q('#result')
  ores.textContent = 'no result. Try Click, or Ctrl-click. Or create your own Local dictionary'
}

function showResult(el, res) {
  let singlechains = _.filter(res.chains, chain=> { return chain.length == 1 })
  let rdicts = singlechains.map(chain=> { return chain[0] })
  let dicts = _.flatten(rdicts.map(rdict=> { return rdict.dicts }))
  let cogns = _.flatten(rdicts.map(rdict=> { return rdict.cogns }))
  el.dataset.cogns = JSON.stringify(cogns)
  // NB: непонятно, нужно ли это: δέω - дает дубли, не дает нужного из WKT
  dicts = _.uniq(dicts.map(dict=> { return JSON.stringify(dict) })).map(json=> { return JSON.parse(json) })
  dicts.push(...res.terms)
  showDicts(el, dicts)
}

function showDicts(el, dicts) {
  let wf = el.textContent
  let ores = q('#result')
  empty(ores)
  let odictitle = dictTitle(wf)
  ores.appendChild(odictitle)
  let cfg = settings.get('cfg')
  dicts = _.sortBy(dicts, function(dict) {
    let cfgitem = _.find(cfg, o=> { return o.dname == dict.dname })
    if (!cfgitem) return 100
    return cfgitem.idx
  })
  dicts.forEach(dict=> {
    let odict = showDict(dict)
    ores.appendChild(odict)
  })
}


function dictTitle(wf) {
  let oformhead = create('div', 'dict-query')
  oformhead.textContent = wf
  return oformhead
}

function showDict(dict) {
  let odict = create('div', 'dict-container')
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
  return odict
}

function showDictHeader(dict) {
  let odicthead = create('div', 'dict-header')
  let odname = span(dict.dname, 'dict-dname')
  if (dict.dname == 'souda') odname.setAttribute('href', dict.href)
  odicthead.appendChild(odname)
  let ordict = span(dict.rdict, 'dict-rdict')
  odicthead.appendChild(ordict)
  if (dict.verb) {
    let opos = span('verb', 'dict-pos')
    odicthead.appendChild(opos)
  } if (dict.name) {
    let opos = span('name', 'dict-pos')
    odicthead.appendChild(opos)
  } else if (dict.term && dict.pos) {
    let opos = span(dict.pos, 'dict-pos')
    odicthead.appendChild(opos)
  } else if (dict.suf) {
    let opos = span('suff', 'dict-pos')
    odicthead.appendChild(opos)
  } else if (dict.pref) {
    let opos = span('pref', 'dict-pos')
    odicthead.appendChild(opos)
  }

  if (dict.gends) {
    let ogends = span(dict.gends.toString(), 'dict-gends')
    odicthead.appendChild(ogends)
  }
  return odicthead
}

function parseMorphs (dict) {
  let morphs
  let fls = dict.fls
  let advfls = _.filter(fls, flex=> { return flex.degree })
  fls = _.filter(fls, flex=> { return !flex.degree })
  if (!fls) return
  if (dict.verb) {
    let vfls = _.filter(fls, flex=> { return flex.numper })
    let pfls = _.filter(fls, flex=> { return flex.numcase })
    let ifls = _.filter(fls, flex=> { return !flex.numcase && !flex.numper })
    morphs = vfls.map(flex => { return [flex.tense, flex.numper].join(' ') })
    if (pfls.length) {
      let pmorphs = pfls.map(flex => { return [flex.tense, [flex.gend, flex.numcase].join('.') ].join(', ') })
      morphs.push(...pmorphs)
    }
    if (ifls.length) {
      let imorphs = ifls.map(flex => { return flex.tense })
      morphs.push(...imorphs)
    }
  }
  else if (dict.pos == 'adv')  morphs = fls.map(flex => { return flex.degree })
  else if (dict.gends) morphs = fls.map(flex => { return [dict.gends.toString(), flex.numcase].join('.') })
  else if (dict.name) morphs = fls.map(flex => { return [flex.gend, flex.numcase].join('.') })

  else if (dict.pos == 'pron')  morphs = fls.map(flex => { return [flex.gend || '-', flex.numcase].join('.') })
  else morphs = fls.map(flex => { return [flex.gend, flex.numcase].join('.') })
  // if (!morphs.length) return false

  if (advfls.length) {
    let advmorphs = advfls.map(flex => { return flex.degree })
    morphs.push(...advmorphs)
  }

  let nodus = _.filter(morphs, morph=> { return !/du/.test(morph) })
  if (nodus.length) morphs = nodus
  let novocs = _.filter(morphs, morph=> { return !/voc/.test(morph) })
  if (novocs.length) morphs = novocs

  return morphs.sort()
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
  if (!dict.trns) dict.trns = ['no transtation for this dict article']
  dict.trns.forEach(trn => {
    let otrn = create('li', 'dict-trns-li')
    let parts = trn.split(/, [A-Z]| [A-Z][^ ]*[0-9]/)
    let shown = parts[0]
    let oshown = span(shown, 'dict-trns-li-shown')
    otrn.appendChild(oshown)
    let hidden = trn.replace(shown, '')
    let html = hidden.split('(').join('<span class="grey">').split(')').join('</span>')
    if (html) {
      let ohidden = span('', 'is-hidden')
      ohidden.innerHTML = html
      ohidden.classList.add('dict-trns-li-hidden')
      otrn.appendChild(ohidden)
      oshown.classList.add('ellipsis')
    }
    otrns.appendChild(otrn)
  })
  return otrns
}


// space
export function toggleResults() {
  let dtrns = qs('.dict-trns')
  if (!dtrns.length) return
  let dfls = qs('.dict-fls')
  let first = dtrns[0]
  if (!first) return
  if (first.classList.contains('is-hidden')) dtrns.forEach(otrns=> { otrns.classList.remove('is-hidden')  }), dfls.forEach(ofls=> { ofls.classList.remove('is-hidden')  })
  else dtrns.forEach(otrns=> {  otrns.classList.add('is-hidden')  }), dfls.forEach(ofls=> {  ofls.classList.add('is-hidden')  })
}

// tab
export function toggleOneResult() {
  let dtrns = qs('.dict-trns')
  if (!dtrns.length) return
  let dfls = qs('.dict-fls')
  let opened = q('ul.dict-trns:not(.is-hidden)')
  let next = 0
  dtrns.forEach((otrns, idx)=> {
    if (!otrns.classList.contains('is-hidden')) next = idx + 1
    otrns.classList.add('is-hidden')
    if (dfls[idx]) dfls[idx].classList.add('is-hidden')
  })
  if (next == dtrns.length) next = 0
  dtrns[next].classList.remove('is-hidden')
  if (dfls[next]) dfls[next].classList.remove('is-hidden')
}

export function showTranslit(el, shift) {
  closePopups()
  let opopup = createPopup(el, true)
  let param
  if (shift) param = 'gem'
  let trnsl = t15n(el.textContent, param)
  opopup.textContent = trnsl
}
