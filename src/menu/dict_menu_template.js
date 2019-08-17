import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";

export function dictMenuTemplate() {
  let menu =  {
    label: t("dictionary"),
    submenu: [
      // { label: t("Arrange local dicts"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'arrange-dicts') } },
      { label: t("Arrange and clone dicts from server"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'remote-dicts') } },
      // { label: t("Import dict form CSV"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'csv-dicts') } },
      // { label: t("Create CSV from texts"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'localdict') } },
      // { label: t("Publish dictionary"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'publish') } },
      // { label: t("Reread the source"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'reread-dict') } },
      { type: 'separator' },
      { label: t("Cleanup DBs completely"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cleanup') } }
    ]
  }
  return menu
}
