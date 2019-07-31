import _ from "lodash"
import { remote, shell } from "electron";
import { generateDictChunk } from '/home/michael/greek/dictCSV'
import { navigate } from './nav'
import { q, qs, empty, create, remove, span, p, div } from './utils'
import path from "path";

const settings = require('electron').remote.require('electron-settings')
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const log = console.log
const app = remote.app;

// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

let target

/*
  меню - попроще
  форма:
  - персей
  текст:
  - local dict
  - merge local
  - local to csv
*/

const perseus = new MenuItem({
  label: "Perseus Greek Word Study Tool",
  click: (ev) => {
    if (!target) return
    let wf = target.textContent
    let href = ['http://www.perseus.tufts.edu/hopper/morph?l=', wf , '&la=greek#lexicon'].join('')
    shell.openExternal(href)
  }
});

const wiktionary = new MenuItem({
  label: "Wiktionary (esp. for particles)",
  click: () => {
    if (!target) return
    let wf = target.textContent
    let href = ['https://en.wiktionary.org/wiki/', wf , '#Ancient_Greek'].join('')
    shell.openExternal(href)
  }
});

const souda = new MenuItem({
  // и как быть? вешать -data на каждое слово?
  label: "Souda dictionary",
  click: () => {
    if (!target) return
    let wf = target.textContent
    let odicts = qs('.dict-dname')
    let osouda = _.find(odicts, el=> { return el.textContent == 'souda' })
    log('_______________ SOUDA', wf, odicts, osouda)
    if (!osouda) return
    let adler = osouda.getAttribute('href')
    let href = ['https://www.cs.uky.edu/~raphael/sol/sol-entries/', adler].join('')
    log('_______________ SOUDA', href)
    shell.openExternal(href)
  }
});

const localDict = new MenuItem({
  label: "Local Dictionary for this text",
  click: () => {
    let progress = q('#progress')
    progress.classList.remove('is-hidden')
    let state = settings.get('state')
    // log('_____________________D', state)
    if (!state.pars) return
    // log('nav: CTRL-D', state)
    let dname = 'local'
    generateDictChunk(upath, dname, state, (res)=> {
      state.sec = 'local-chunk'
      log('_____________________genDictChunk:', res)
      let data = {dicts: res}
      navigate(state, data)
    })

  }
});

const megreLocalDict = new MenuItem({
  label: "Main Local Dictionary",
  click: () => {
    document.execCommand("copy");
  }
});

export function mouseMenu(ev) {
  if (ev.button != 2) return
  const normalMenu = new Menu();

  target = ev.target
  if (target.classList.contains('active-form')) normalMenu.append(perseus), normalMenu.append(wiktionary), normalMenu.append(souda)
  else log('context:', 'kuku')
  // log('_____RIGHT', el)

  normalMenu.append(localDict)
  normalMenu.append(megreLocalDict)

  let state = settings.get('state')

  ev.preventDefault()
  normalMenu.popup(remote.getCurrentWindow());
}
