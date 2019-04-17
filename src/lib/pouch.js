//
const log = console.log
import path from "path";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { antrax } from '/home/michael/a/loigos'
import { setDBs } from '/home/michael/a/loigos/dist/lib/pouch'
// import { antrax } from 'loigos'

export function test() {
  log('testing...')
}

// const upath = app.getPath("userData")
let upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

// terms, flex - defaults
let dnames = ['wkt', 'lsj']
// let dnames = ['wkt']
setDBs(upath, dnames)

ipcMain.on('queryDBs', (event, query) => {
  antrax(query.query).then(res => {
    // console.log('RES:', query, res)
    BrowserWindow.getFocusedWindow().webContents.send('query-result', res)
  }).catch(function (err) {
    console.log('ANTRAX-ERR', query, err)
  })
})
