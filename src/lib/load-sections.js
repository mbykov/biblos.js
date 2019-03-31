//

const log = console.log
const fse = require('fs-extra')
const path = require('path')
import { q, create } from './utils'

export function loadSections (langs, pages) {
  let container = q('#container')
  langs.forEach(lang=> {
    pages.forEach(sname=> {
      let spath = [sname, 'html'].join('.')
      let html
      try {
        spath = path.resolve(__dirname, '../src/sections', lang, [sname, 'html'].join('.'))
        html = fse.readFileSync(spath)
      } catch (err) {
        spath = path.resolve(__dirname, '../src/sections', 'en', [sname, 'html'].join('.'))
        html = fse.readFileSync(spath)
      }
      let osec = create('div', 'section')
      osec.id = [sname, lang].join('_')
      osec.setAttribute('lang', lang)
      osec.classList.add('is-hidden')
      osec.innerHTML = html
      container.appendChild(osec.cloneNode(true))
    })
  })
}
