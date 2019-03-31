import { app, BrowserWindow } from "electron";
import { i18n, Translate } from "../locales/i18n";
// let i18n = require('../locales/i18n')
let tt = new i18n
// let t = tt.t
let i18m = new Translate()
let t = i18m.t

export function testMenuTemplate() {
  console.log('TM start')
  console.log('HELLO:', i18m.t('kuku'))
  let menu =  {
      label: "TEST",
      submenu: [
        {
          // label: t('Copy'),
          label: "COPY",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'en')
          }
        },
        {
          label: "DE",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'de')
          }
        },
        {
          label: "RU",
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.send('lang', 'ru')
          }
        }
      ]
    }
  console.log('M', menu)
  return menu
}
