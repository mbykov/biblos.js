import { app, BrowserWindow } from "electron";

export const rightMenuTemplate = {
  label: "-->",
  // accelerator: "Alt+RightArrow",
  click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'goright') }
}
