import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";
let log  = console.log
log('___________________', t('home'))

export function fileMenuTemplate() {
  let menu =  {
    label: "File",
    submenu: [
      {  label: t("home"),
      // {  label: "Home",
            accelerator: "CmdOrCtrl+L",
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'home') } },
      { label: t("Quit"),
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        }
      }
    ]
  }
  // log('FILE MENU', menu)
  return menu
}
