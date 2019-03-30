//

const log = console.log
const fse = require('fs-extra')
const path = require('path')
import { q, create } from './utils'


export function loadSections () {
  let ilangs = ['en', 'de', 'ru']
  let sectnames =  ['home', 'help']
  let container = q('#container')
  ilangs.forEach(ilang=> {
    sectnames.forEach(sname=> {
      let spath = [sname, 'html'].join('.')
      let html
      try {
        spath = path.resolve(__dirname, '../src/sections', ilang, [sname, 'html'].join('.'))
        html = fse.readFileSync(spath).toString()
      } catch (err) {
        spath = path.resolve(__dirname, '../src/sections', 'en', [sname, 'html'].join('.'))
        html = fse.readFileSync(spath).toString()
      }
      let osec = create('div', 'section')
      osec.id = [sname, ilang].join('_')
      osec.setAttribute('lang', ilang)
      osec.classList.add('is-hidden')
      osec.innerHTML = html
      container.appendChild(osec.cloneNode(true))
    })
  })

}
