import { app, BrowserWindow, ipcRenderer } from "electron";

export const langMenuTemplate = {
  label: "Lang",
  submenu: [
    {
      label: "EN",
      click: () => {
        // BrowserWindow.getFocusedWindow().webContents.send('lang', 'en')
        ipcRenderer.send('lang', 'en')
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
};
