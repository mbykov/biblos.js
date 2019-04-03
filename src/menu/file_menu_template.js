import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";
let log  = console.log

export function fileMenuTemplate() {
  let menu =  {
    label: "File",
    submenu: [
      {  label: t("home"),
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
  return menu
}
