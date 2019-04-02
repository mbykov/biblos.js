import { app, BrowserWindow } from "electron";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    { label: "hot keys", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } },
    { label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }
  ]
};
