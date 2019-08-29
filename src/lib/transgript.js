import _ from 'lodash'
import { accents, stresses, greek } from "./utils";
// import {oxia, comb, plain, strip} from '../../../greek/orthos'
import {oxia, comb, plain, strip} from 'orthos'

let strs = _.values(stresses)
let dasia = accents.dasia
let log = console.log

export function t15n (wf, type, opt) {
  let res
  let cwf = comb(wf)
  let syms = cwf.split('')
  if (type == 'gem') res = gematria(syms)
  else if (type == 'beta') res = beta(syms)
  else res = wictionary(syms)
  return res
}

function wictionary (syms) {
  let wkts = []
  syms.forEach(sym=> {
    if (greek[sym]) wkts.push(greek[sym].wkt)
    else if (sym == dasia) wkts.unshift('h')
    else if (strs.includes(sym)) wkts.push(accents.oxia)
  })
  let wkt = wkts.join('')
  return wkt
}

// i.e. isopsephy
function gematria (syms, opt) {
  let nums = []
  syms.forEach(sym=> {
    if (greek[sym]) nums.push(greek[sym].gem)
  })
  let isopsephy = _.sum(nums)
  return isopsephy
}

function beta (syms) {
  let trns = []
  syms.forEach(sym=> {
    if (greek[sym]) trns.push('B')
  })
  let wkt = trns.join('')
  return wkt
}
