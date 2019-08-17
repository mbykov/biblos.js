let md = require('markdown-it')({html: true});
let markdownItAttrs = require('markdown-it-attrs');
md.use(markdownItAttrs)

// let md = require( "markdown" ).markdown;

// let showdown  = require('showdown')
// let md = new showdown.Converter()

// md.setFlavor('github');
// text      = '# hello, markdown!',
// html      = converter.makeHtml(text);

const log = console.log
const fse = require('fs-extra')
const path = require('path')
import { q, create } from './utils'

export function loadSections (config) {
  let container = q('#container')
  config.langs.forEach(lang=> {
    config.pages.forEach(sname=> {
      let spath, txt, html
      try {
        spath = path.resolve(__dirname, '../src/sections', lang, [sname, 'md'].join('.'))
        txt = fse.readFileSync(spath).toString()
        html = md.render(txt);
        // html = fse.readFileSync(spath).toString()
        // log('HTML', html)
      } catch (err) {
        let lang = config.deflang
        spath = path.resolve(__dirname, '../src/sections', config.deflang, [sname, 'md'].join('.'))
        txt = fse.readFileSync(spath).toString()
        html = md.render(txt);
      }
      // log('SPATH', spath)
      let osec = create('div', 'section')
      osec.id = [sname, lang].join('_')
      osec.setAttribute('lang', lang)
      osec.classList.add('is-hidden')
      osec.innerHTML = html
      container.appendChild(osec.cloneNode(true))
    })
  })
}
