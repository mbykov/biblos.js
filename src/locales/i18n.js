const path = require("path")
const electron = require('electron')
const fse = require('fs-extra');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app
let log = console.log

let apath = app.getAppPath()
let contents = {}
const settings = require('electron-settings')

export function i18n(phrase) {
  let lang = settings.get('lang') || 'eng'
  if (!contents[lang]) {
    let langFile = lang + '.js'
    let localePath = path.resolve(apath, 'src/locales', langFile)
	  if (fse.pathExistsSync(localePath)) {
		  loadedLanguage = fse.readJsonSync(localePath)
	  } else {
      let enPath = path.resolve(apath, 'src/locales/en.js')
		  loadedLanguage = fse.readJsonSync(enPath)
	  }
    contents[lang] = loadedLanguage
  }
  let dcased = uncap(phrase)
  return capitalize(contents[lang][dcased]) || capitalize(phrase)
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const uncap = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toLowerCase() + s.slice(1)
}
