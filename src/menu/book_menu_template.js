import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";

export function bookMenuTemplate() {
  let menu =  {
    label: t("Book"),
    submenu: [
      { label: t("Import from ODS"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('parseOds') } },
      { label: t("Import from file"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('parseDir') } },
      { type: 'separator' },
      { label: t("Clone from Github"), enabled: false, click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cloneGithub') } },
      { label: t("Publish book"), enabled: false, click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'publish') } },
      { type: "separator" },
      { label: t("Export to TXT"), enabled: false, click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportTXT') } },
      { label: t("Export to PDF"), enabled: false, click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportPDF') } },
      { label: t("Export to HTML"), enabled: false, click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportHTML') } },
      { type: "separator" },
      { label: t("Create dictionary for book"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'createDict') } },
      { type: "separator" },
      { label: t("Reread the source"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'reread-book') } },
      { label: t("Cleanup DBs completely"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cleanup') } },
      { type: "separator" },
    ]
  }
  return menu
}

// { label: "Reload application", accelerator: "CommandOrControl+Shift+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reload') } },
// { label: "Re-read source", accelerator: "CommandOrControl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reread') } },
// { type: "separator" },
