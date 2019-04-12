import { app, BrowserWindow, ipcRenderer } from "electron";

export const tibMenuTemplate = {
  label: "TIB",
  submenu: [
    {
      label: "ENG",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng')
      }
    },
    {
      label: "DEU",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu')
      }
    },
    {
      label: "RUS",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus')
      }
    },
    {
      label: "ZHO",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
      }
    }
  ]
};
