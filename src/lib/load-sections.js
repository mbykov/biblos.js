//

const log = console.log
const fse = require('fs-extra')
const path = require('path')
import { q, create } from './utils'

export function loadSections (config) {
  let container = q('#container')
  config.langs.forEach(lang=> {
    config.pages.forEach(sname=> {
      let spath = [sname, 'html'].join('.')
      let html
      try {
        spath = path.resolve(__dirname, '../src/sections', lang, [sname, 'html'].join('.'))
        html = fse.readFileSync(spath)
      } catch (err) {
        spath = path.resolve(__dirname, '../src/sections', config.deflang, [sname, 'html'].join('.'))
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
