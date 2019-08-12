import _ from "lodash"
import { remote, shell } from "electron";
import { generateDictChunk } from '/home/michael/greek/dictCSV'
import { navigate } from './nav'
import { q, qs, empty, create, remove, span, p, div } from './utils'
import path from "path";
import { readDictionary } from '/home/michael/a/loigos'

const settings = require('electron').remote.require('electron-settings')
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const log = console.log
const app = remote.app;

// UPATH
let upath = app.getPath("userData")
upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

let target

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
  label: "Souda dictionary",
  click: () => {
    if (!target) return
    let wf = target.textContent
    let odicts = qs('.dict-dname')
    let osouda = _.find(odicts, el=> { return el.textContent == 'souda' })
    if (!osouda) return
    let adler = osouda.getAttribute('href')
    let href = ['https://www.cs.uky.edu/~raphael/sol/sol-entries/', adler].join('')
    shell.openExternal(href)
  }
});

const localDict = new MenuItem({
  label: "create local dictionary for current text",
  click: () => {
    let progress = q('#progress')
    progress.classList.remove('is-hidden')
    let state = settings.get('state')
    if (!state.pars) return
    let dname = 'local'
    generateDictChunk(upath, dname, state.pars, (res)=> {
      state.sec = 'local-chunk'
      state.dicts = res
      navigate(state)
    })

  }
});

const showLocalDict = new MenuItem({
  label: "show full local dictionary",
  click: () => {
    document.execCommand("copy");
    let progress = q('#progress')
    progress.classList.remove('is-hidden')
    let state = settings.get('state')
    let dname = 'local'

    readDictionary(upath, dname)
      .then(res=> {
        let dicts = _.flatten(res.map(dict=> { return dict.docs }))
        state.sec = 'local-dict'
        state.dicts = dicts
        log('_____________________showFullDict:', res)
        navigate(state)
      })
  }
});

export function mouseMenu(ev) {
  if (ev.button != 2) return
  const normalMenu = new Menu();

  target = ev.target
  if (target.classList.contains('active-form')) normalMenu.append(perseus), normalMenu.append(wiktionary), normalMenu.append(souda)

  normalMenu.append(localDict)
  normalMenu.append(showLocalDict)

  ev.preventDefault()
  normalMenu.popup(remote.getCurrentWindow());
}
