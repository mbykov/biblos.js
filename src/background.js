// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
const settings = require('electron-settings')
import { MenuFactory } from "./locales/menu-factory";
const log = console.log

const config = require('./app.config');

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

// const setApplicationMenu = () => {
//   const menus = [editMenuTemplate];
//   if (env.name !== "production") {
//     menus.push(devMenuTemplate);
//   }
//   menus.push(langMenuTemplate);
//   Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
// };

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
// if (env.name !== "production") {
//   const userDataPath = app.getPath("userData");
//   app.setPath("userData", `${userDataPath} (${env.name})`);
//   // app.setPath("userData", `${userDataPath}-devel`);
// }

app.on("ready", () => {
  // setApplicationMenu();
  let lang = settings.get('lang') || 'eng'
  MenuFactory(lang)

  let opts = {webPreferences: {
    nodeIntegration: true
    // nodeIntegration: false,
    // nodeIntegrationInWorker: false
  }}

  const win = new BrowserWindow(opts)
  let winBounds = settings.get('winBounds') || win.getBounds()
  winBounds.y -= 21
  win.setBounds(winBounds)

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    win.openDevTools();
  }

  win.webContents.on('did-finish-load', () => {
    let pckg = require('../package.json')
    let name = pckg.name
    let version = pckg.version
    win.webContents.send('version', version )
    win.setTitle([name, 'v.', version].join(' '))
  })

  win.on('resize', function () {
    win.webContents.send('reload')
  })

  win.on('close', () => {
    settings.set('winBounds', win.getBounds())
  })

});

// ipcMain.on('unload', (event, state, lang) => {
//   settings.set('state', state)
//   settings.set('lang', lang)
// })

ipcMain.on('lang', (event, lang) => {
  MenuFactory(lang)
})

app.on("window-all-closed", () => {
  app.quit();
});
