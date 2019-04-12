//
const log = console.log
import path from "path";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { antrax } from '/home/michael/a/loigos'
import { setDBs } from '/home/michael/a/loigos/dist/lib/pouch'
// import { antrax } from 'loigos'

export function test() {
  log('testing...')
  log(antrax)
}

// const upath = app.getPath("userData")
let upath = path.resolve(process.env.HOME, '.config/MorpheusGreek (development)')

let dnames = ['lsjn']
setDBs(upath, dnames)

ipcMain.on('queryDBs', (event, query) => {
  log('TEST QUERY___', query)
  antrax(query.query).then(chains => {
    console.log('RES:', chains)
  }).catch(function (err) {
    console.log('ANTRAX-ERR', err)
  })
})
