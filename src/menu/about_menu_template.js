import { app, BrowserWindow } from "electron";
import { i18n as t } from "../locales/i18n";

export function aboutMenuTemplate() {
  let menu =  {
    label: t("About"),
    submenu: [
      { label: t("About"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'about') } },
      { label: t("code and download"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'code') } },
      { label: t("License"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'license') } },
      { label: t("Contacts"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'contacts') } },
      { label: t("Acknowledgements"), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements') } }
    ]
  }
  return menu
}
