import { app, BrowserWindow, ipcRenderer } from "electron";

export const langMenuTemplate = {
  label: "Lang",
  submenu: [
    {
      label: "EN",
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
};
