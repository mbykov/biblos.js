!function(e){var o={};function n(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)n.d(t,s,function(o){return e[o]}.bind(null,s));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=26)}([function(e,o){e.exports=require("electron")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},,function(e,o){e.exports=require("path")},function(e,o,n){"use strict";n.r(o),n.d(o,"config",function(){return t});const t={code:"grc",pages:["home","remotedicts"],langs:["eng"],deflang:"eng"}},function(e,o){e.exports=require("fs-extra")},function(e,o){e.exports=require("electron-settings")},,function(e,o){e.exports=require("url")},,function(e){e.exports={name:"a-template",productName:"Electron Boilerplate",description:"Starter for my Electron application",version:"1.0.0",private:!0,author:"M. Bykov <m.bykov@gmail.com>",copyright:"© 2017- 2019, M.Bykov",homepage:"http://diglossa.org",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall_:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^7.0.1",markdown:"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2",mousetrap:"^1.6.3",nano:"^8.0.1",pug:"^2.0.3",showdown:"^1.9.0","speckled-band":"^2.0.0","split.js":"^1.5.10"},devDependencies:{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0",chai:"^4.2.0","css-loader":"^2.1.1",electron:"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^5.0.0","style-loader":"^0.23.1",webpack:"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"}}},,,,,,,,,,,,,,,,function(e,o,n){"use strict";n.r(o);var t=n(3),s=n.n(t),r=n(8),c=n.n(r),l=n(0),i=n(1);const a=n(3),d=n(0),p=n(5);let u,w=d.app?d.app:d.remote.app,b=(console.log,w.getAppPath()),g={};const m=n(6);function f(e){let o=m.get("lang")||"eng";if(!g[o]){let e=o+".js",n=a.resolve(b,"src/locales",e);if(p.pathExistsSync(n))u=p.readJsonSync(n);else{let e=a.resolve(b,"src/locales/en.js");u=p.readJsonSync(e)}g[o]=u}let n=W(e);return k(g[o][n])||k(e)}const k=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),W=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const C={label:"Lang",submenu:[{label:"EN",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DE",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]};const h=n(0).Menu;n(4),console.log;function y(){const e=[{label:"File",submenu:[{label:f("home"),accelerator:"CmdOrCtrl+L",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:f("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{l.app.quit()}}]},{label:f("dictionary"),submenu:[{label:f("Arrange local dicts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:f("Clone from server"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","remotedicts")}},{label:f("Import form CSV"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:f("Create CSV from texts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:f("Publish dictionary"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:f("Reread the source"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","reread-dict")}},{label:f("Cleanup DBs completely"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:f("Book"),submenu:[{label:f("Import from ODS"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("parseOds")}},{label:f("Import from file"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("parseDir")}},{type:"separator"},{label:f("Clone from Github"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","cloneGithub")}},{label:f("Publish book"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","publish")}},{type:"separator"},{label:f("Export to TXT"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportTXT")}},{label:f("Export to PDF"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportPDF")}},{label:f("Export to HTML"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportHTML")}},{type:"separator"},{label:f("Create dictionary for book"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","createDict")}},{type:"separator"},{label:f("Reread the source"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","reread-book")}},{label:f("Cleanup DBs completely"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","cleanup")}},{type:"separator"}]},{label:f("About"),submenu:[{label:f("About"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:f("code and download"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:f("License"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:f("Contacts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:f("Acknowledgements"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:f("Help"),submenu:[{label:f("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:f("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{l.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];e.push(C),h.setApplicationMenu(h.buildFromTemplate(e))}const B=n(6),v=console.log;n(4);if("production"!==i.name){const e=l.app.getPath("userData");l.app.setPath("userData",`${e} (${i.name})`)}l.app.on("ready",()=>{y();const e=new l.BrowserWindow({webPreferences:{nodeIntegration:!0}});e.loadURL(c.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===i.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let o=n(10),t=o.name,s=o.version;e.webContents.send("version",s),e.setTitle([t,"v.",s].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{B.set("winBounds",e.getBounds())});const o=l.app.getAppPath(),t=l.app.getPath("userData");B.set("apath",o),B.set("upath",t),l.ipcMain.on("lang",(e,o)=>{v("_____ BACK-LANG-CHANGE",o),y()})}),l.app.on("window-all-closed",()=>{l.app.quit()})}]);
//# sourceMappingURL=background.js.map