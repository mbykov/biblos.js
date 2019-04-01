const path = require("path")
const electron = require('electron')
const fse = require('fs-extra');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app
let log = console.log

// module.exports = i18n;
let apath = app.getAppPath()
let contents = {}
const settings = require('electron-settings')

export function i18n(phrase) {
  let lang = settings.get('lang')
  log('LANG FROM SETT', lang)
  if (!contents[lang]) {
    let langFile = lang + '.js'
    let localePath = path.resolve(apath, 'src/locales', langFile)
    log('localePath', localePath, fse.ensureFileSync(localePath))
	  if (fse.pathExistsSync(localePath)) {
		  loadedLanguage = fse.readJsonSync(localePath)
	  } else {
      let enPath = path.resolve(apath, 'src/locales/en.js')
		  loadedLanguage = fse.readJsonSync(enPath)
	  }
    log('LOADJSON', loadedLanguage['Edit'])
    contents[lang] = loadedLanguage
  }
  log('i18contents:', lang, contents[lang][phrase])
  return contents[lang][phrase]
}

export function i18n_(lang) {
  let langFile = lang + '.js'
  let localePath = path.resolve(apath, 'src/locales', langFile)

	if(fs.existsSync(localePath)) {
		loadedLanguage = JSON.parse(fs.readFileSync(localePath, 'utf8'))
	}
	else {
    let enPath = path.resolve(apath, 'src/locales/en.js')
		loadedLanguage = JSON.parse(fs.readFileSync(enPath, 'utf8'))
	}
  // this.t = function(phrase) {
    // return loadedLanguage[phrase] || phrase
  // }
  // return loadedLanguage[phrase] || phrase
}

i18n.prototype.t = function(phrase) {
	let translation = loadedLanguage[phrase]
  if(translation === undefined) {
    translation = phrase
  }
	return translation
}

export class Translate {
  constructor() {
    this.default = 'en'
  }
  set lang(lang) {
    this._lang = lang
  }
  get lang() {
    return this._lang;
  }
  t(phrase) {
    if (!this.lang) this.lang = 'ru'
    console.log('Hello, my name is ' + this.lang + ', I have ID: ' + this.default + ', PHRASE: ' + phrase);
    return {lang: this.lang, phrase: phrase}
  }
}

// let i18m = new Translate()
// export i18m;
