import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, getInnermostHovered } from './utils'
import { ipcRenderer } from "electron";
const settings = require('electron').remote.require('electron-settings')
const log = console.log


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
  let progress = q('#progress')
  progress.classList.remove('is-hidden')
  let str = el.textContent.trim()
  let query = {query: str}
  if (compound) query.compound = true
  log('sending:', query)
  ipcRenderer.send('queryDBs', query)
}
