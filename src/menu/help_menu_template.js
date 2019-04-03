import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";

export function helpMenuTemplate() {
  let menu =  {
    label: t("Help"),
    submenu: [
      { label: t("hot keys"), accelerator: "Shift+CmdOrCtrl+H", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } },
      { label: "Reload", accelerator: "Shift+CmdOrCtrl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache(); }  },
      { label: t("Toggle devTools"),
        accelerator: "Alt+CmdOrCtrl+I",
        click: () => {
          BrowserWindow.getFocusedWindow().toggleDevTools();
        }
      }
    ]
  }
  return menu
}
