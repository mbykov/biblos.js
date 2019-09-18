import _ from "lodash"
import { remote, shell } from "electron";
import { generateDictChunk } from './generateChunk'
import { navigate, goLeft, goRight } from './nav'
import { q, qs, empty, create, remove, span, p, div } from './utils'
import path from "path";
// import { readDictionary } from '/home/michael/a/loigos'
import { readDictionary } from 'antrax'
import { config } from '../app.config'

const settings = require('electron').remote.require('electron-settings')
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const log = console.log
const app = remote.app;
let progress = q('#progress')

let upath = app.getPath("userData")
let target

const perseus = new MenuItem({
  label: "Perseus Greek Word Study Tool",
  click: (ev) => {
    if (!target) return
    let wf = target.textContent
    let href = ['http://www.perseus.tufts.edu/hopper/morph?l=', wf , '&la=greek#lexicon'].join('')
    shell.openExternal(href)
  }
})

const wiktionary = new MenuItem({
  label: "Wiktionary (esp. for particles)",
  click: () => {
    if (!target) return
    let wf = target.textContent
    let href = ['https://en.wiktionary.org/wiki/', wf , '#Ancient_Greek'].join('')
    shell.openExternal(href)
  }
})

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
})

const localDict = new MenuItem({
  label: "create local dictionary for current text",
  click: () => {
    progress.classList.remove('is-hidden')
    let state = settings.get('state')
    if (!state.pars) return
    let dname = config.ldname
    generateDictChunk(upath, dname, state.pars, (res)=> {
      state.sec = 'local-chunk'
      navigate(state, res)
    })
  }
})

const showLocalDict = new MenuItem({
  label: "show full local dictionary",
  click: () => {
    progress.classList.remove('is-hidden')
    let state = settings.get('state')
    let dname = config.ldname
    readDictionary(upath, dname)
      .then(res=> {
        let dicts = _.flatten(res.map(dict=> { return dict.docs }))
        state.sec = 'local-dict-full'
        navigate(state, dicts)
      })
  }
});

const goLeftMenu = new MenuItem({
  label: "back in history",
  click: () => {
    goLeft()
  }
});

const goRightMenu = new MenuItem({
  label: "forward in history",
  click: () => {
    goRight()
  }
});

export function mouseMenu(ev) {
  if (ev.button != 2) return
  const normalMenu = new Menu();

  normalMenu.append(goLeftMenu)
  normalMenu.append(goRightMenu)
  normalMenu.append(new MenuItem({ type: 'separator' }))
  normalMenu.append(localDict)
  normalMenu.append(showLocalDict)
  normalMenu.append(new MenuItem({ type: 'separator' }))

  target = ev.target
  if (target.classList.contains('active-form')) normalMenu.append(perseus), normalMenu.append(wiktionary), normalMenu.append(souda)

  ev.preventDefault()
  normalMenu.popup(remote.getCurrentWindow());
}
