// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
// import { devMenuTemplate } from "./menu/dev_menu_template";
// import { editMenuTemplate } from "./menu/edit_menu_template";
// import { langMenuTemplate } from "./menu/lang_menu_template";
import { MenuFactory } from "./lib/menuFactory";
const log = console.log

const config = require('./configs/app.config');

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
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  // setApplicationMenu();
  MenuFactory()

  let opts = {webPreferences: {
    nodeIntegration: true
  }}

  const win = new BrowserWindow(opts)

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

  ipcMain.on('lang', (event, lang) => {
    log('_____ BACK-LANG-CHANGE', lang)
    MenuFactory(lang)
  })

});

app.on("window-all-closed", () => {
  app.quit();
});
