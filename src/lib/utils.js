import _ from 'lodash'

let util = require('util')

export function q (sel) {
  return document.querySelector(sel)
}

export function qs (sel) {
  return document.querySelectorAll(sel)
}

export function create (tag, style) {
  let el = document.createElement(tag)
  if (style) el.classList.add(style)
  return el
}

export function recreateDiv (sel) {
  let el = document.querySelector(sel)
  if (el) el.parentElement.removeChild(el)
  el = document.createElement('div')
  el.classList.add(sel)
  // el.id = sel
  return el
}

export function recreate (element) {
  var newElement = element.cloneNode(true)
  element.parentNode.replaceChild(newElement, element)
}

// function cretxt (str) {
  // return document.createTextNode(str)
// }

export function span (str, style) {
  let el = document.createElement('span')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function br () {
  let oBR = document.createElement('br')
  return oBR
}

export function div (str, style) {
  let el = document.createElement('div')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function p (str, style) {
  let el = document.createElement('p')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function empty (el) {
  if (!el) return
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}

export function remove (el) {
  if (!el) return
  el.parentElement.removeChild(el)
}

export function removeAll (sel) {
  let els = document.querySelectorAll(sel)
  els.forEach(el => { el.parentElement.removeChild(el) })
}

// function closeAll() {
//     words = null
//     // window.close()
//     ipcRenderer.send('sync', 'window-hide')
// }

export function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el
  }
}

export function plog () {
  var vs = _.values(arguments)
  if (vs.length === 1) vs = vs[0]
  // console.log(util.inspect(vs, {showHidden: false, depth: null}))
  console.log(util.inspect(vs, {showHidden: false, depth: 3}))
}

export function getStore(name) {
  let json, obj

  return obj
}

export function setStore(name, obj) {
  let oapp = q('#app')
  q('#app').setAttribute()
}

export function getCoords (el) {
  let rect = el.getBoundingClientRect()
  return rect
  // return {top: rect.top, left: rect.left}
}

export function placePopup (coords, el) {
  let top = [coords.top, 'px'].join('')
  let left = [coords.left, 'px'].join('')
  el.style.top = top
  el.style.left = left
}

export const accents = {
  'oxia': '\u0301',
  'varia_': '\u0060',
  'varia': '\u0300',
  'peris': '\u0342',
  '': '',
  'psili': '\u0313',
  'dasia': '\u0314',
  '': ''
}

export const stresses = [accents.oxia, accents.varia, accents.peris]

export function enclitic(str) {
  let syms = str.split('')
  let stress = false
  let clean = []
  // let stresses = [accents.oxia, accents.varia, accents.peris]
  // console.log('STRESSES', stresses)
  syms.forEach(sym => {
    if (!stresses.includes(sym)) clean.push(sym)
    else if (!stress) clean.push(sym), stress = true
    // console.log('---------------------------', sym, stress)
  })
  return clean.join('')
}

// export function stressed(str) {
//   let syms = str.split('')
//   let stress = false
//   syms.forEach(sym => {
//     if (stresses.includes(sym)) stress = true
//   })
//   return stress
// }

export const greek = {
  'α': {utf: 'U+03B1', wkt: 'a', gem: 1}, // small letter alpha
  'β': {utf: 'U+03B2', wkt: 'b', gem: 2}, // small letter beta
  'γ': {utf: 'U+03B3', wkt: 'g', gem: 3}, // small letter gamma
  'δ': {utf: 'U+03B4', wkt: 'd', gem: 4}, // small letter delta
  'ε': {utf: 'U+03B5', wkt: 'e', gem: 5}, // small letter epsilon
  // digamma 6 (Ϝ ϛ)
  'ζ': {utf: 'U+03B6', wkt: 'z', gem: 7}, // small letter zeta
  'η': {utf: 'U+03B7', wkt: 'ē', gem: 8}, // small letter eta
  'θ': {utf: 'U+03B8', wkt: 'th', gem: 9}, // small letter theta
  'ι': {utf: 'U+03B9', wkt: 'i', gem: 10}, // small letter iota
  'κ': {utf: 'U+03BA', wkt: 'k', gem: 20}, // small letter kappa
  'λ': {utf: 'U+03BB', wkt: 'l', gem: 30}, // small letter lamda
  'μ': {utf: 'U+03BC', wkt: 'm', gem: 40}, // small letter mu
  'ν': {utf: 'U+03BD', wkt: 'n', gem: 50}, // small letter nu
  'ξ': {utf: 'U+03BE', wkt: 'ks', gem: 60}, // small letter xi
  'ο': {utf: 'U+03BF', wkt: 'o', gem: 70}, // small letter omicron
  'π': {utf: 'U+03C0', wkt: 'p', gem: 80}, // small letter pi
  // koppa (Ϙ) 90
  'ρ': {utf: 'U+03C1', wkt: 'r', gem: 100}, // small letter rho
  // final sigma number ?
  'ς': {utf: 'U+03C2', wkt: 's', gem: 100}, // small letter final sigma
  'σ': {utf: 'U+03C3', wkt: 's', gem: 200}, // small letter sigma
  'τ': {utf: 'U+03C4', wkt: 't', gem: 300}, // small letter tau
  'υ': {utf: 'U+03C5', wkt: 'u', gem: 400}, // small letter upsilon
  'φ': {utf: 'U+03C6', wkt: 'ph', gem: 500}, // small letter phi
  'χ': {utf: 'U+03C7', wkt: 'kh', gem: 600}, // small letter chi
  'ψ': {utf: 'U+03C8', wkt: 'ps', gem: 700}, // small letter psi
  'ω': {utf: 'U+03C9', wkt: 'ō', gem: 800}, // small letter omega
  // sampi (ϡ) 900

  'Α': {utf: 'U+0391', wkt: 'a', gem: ''}, // capital letter alpha
  'Β': {utf: 'U+0392', wkt: 'b', gem: ''}, // capital letter beta
  'Γ': {utf: 'U+0393', wkt: 'g', gem: ''}, // capital letter gamma
  'Δ': {utf: 'U+0394', wkt: 'd', gem: ''}, // capital letter delta
  'Ε': {utf: 'U+0395', wkt: 'e', gem: ''}, // capital letter epsilon
  'Ζ': {utf: 'U+0396', wkt: 'z', gem: ''}, // capital letter zeta
  'Η': {utf: 'U+0397', wkt: 'ē', gem: ''}, // capital letter eta
  'Θ': {utf: 'U+0398', wkt: 'th', gem: ''}, // capital letter theta
  'Ι': {utf: 'U+0399', wkt: 'i', gem: ''}, // capital letter iota
  'Κ': {utf: 'U+039A', wkt: 'k', gem: ''}, // capital letter kappa
  'Λ': {utf: 'U+039B', wkt: 'l', gem: ''}, // capital letter lamda
  'Μ': {utf: 'U+039C', wkt: 'm', gem: ''}, // capital letter mu
  'Ν': {utf: 'U+039D', wkt: 'n', gem: ''}, // capital letter nu
  'Ξ': {utf: 'U+039E', wkt: 'rs', gem: ''}, // capital letter xi
  'Ο': {utf: 'U+039F', wkt: 'o', gem: ''}, // capital letter omicron
  'Π': {utf: 'U+03A0', wkt: 'p', gem: ''}, // capital letter pi
  'Ρ': {utf: 'U+03A1', wkt: 'r', gem: ''}, // capital letter rho
  'S': {utf: 'U+XXXX', wkt: 's', gem: ''}, // fake capital letter final sigma
  'Σ': {utf: 'U+03A3', wkt: 's', gem: ''}, // capital letter sigma
  'Τ': {utf: 'U+03A4', wkt: 't', gem: ''}, // capital letter tau
  'Υ': {utf: 'U+03A5', wkt: 'u', gem: ''}, // capital letter upsilon
  'Φ': {utf: 'U+03A6', wkt: 'ph', gem: ''}, // capital letter phi
  'Χ': {utf: 'U+03A7', wkt: 'kh', gem: ''}, // capital letter chi
  'Ψ': {utf: 'U+03A8', wkt: 'ps', gem: ''}, // capital letter psi
  'Ω': {utf: 'U+03A9', wkt: 'ō', gem: ''}, // capital letter omega

  'ͅ': {utf: 'U+0345', wkt: 'i', gem: 10} // ypo

}
