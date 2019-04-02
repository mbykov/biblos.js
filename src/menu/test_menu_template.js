import { app, BrowserWindow } from "electron";
import { i18n as t, Translate } from "../locales/i18n";
let log  = console.log
const settings = require('electron-settings')
// let i18n = require('../locales/i18n')
// let tt = new i18n
// let t = tt.t
// let i18m = new Translate()
// let t = i18m.t

export function testMenuTemplate(lang) {
  // log('TM start', lang)
  // if (!lang) lang = 'en'
  // let lang2 = settings.get('lang')
  // log('TM start2', lang2)
  // log('HELLO-EDIT:', t('Edit'))
  let menu =  {
    // label: t('Edit'),
    label: 'Edit',
    submenu: [
        {
          // label: t('Copy'),
          label: "COPY",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng')
          }
        },
        {
          label: "DE",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu')
          }
        },
        {
          label: "RU",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus')
          }
        }
    ]
  }
  // console.log('TEST MENU:', menu)
  return menu
}
