!function(e){var o={};function n(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)n.d(t,s,function(o){return e[o]}.bind(null,s));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=27)}([function(e,o){e.exports=require("electron")},function(e,o,n){"use strict";n.r(o),n.d(o,"config",function(){return t});const t={code:"grc",pages:["home","main","remote-dicts","arrange-dicts","help"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],deflang:"eng"}},,function(e,o){e.exports=require("path")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,o){e.exports=require("fs-extra")},function(e,o){e.exports=require("electron-settings")},,function(e,o){e.exports=require("url")},,,function(e){e.exports={name:"a-template",productName:"Electron Boilerplate",description:"Starter for my Electron application",version:"1.0.0",private:!0,author:"M. Bykov <m.bykov@gmail.com>",copyright:"© 2017- 2019, M.Bykov",homepage:"http://diglossa.org",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall_:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^7.0.1",markdown:"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2",mousetrap:"^1.6.3",nano:"^8.0.1",pug:"^2.0.3",showdown:"^1.9.0","speckled-band":"^2.0.0","split.js":"^1.5.10"},devDependencies:{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0",chai:"^4.2.0","css-loader":"^2.1.1",electron:"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^5.0.0","style-loader":"^0.23.1",webpack:"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"}}},,,,,,,,,,,,,,,,function(e,o,n){"use strict";n.r(o);var t=n(3),s=n.n(t),r=n(8),l=n.n(r),c=n(0);const i=n(3),a=n(0),d=n(5);let w,u=a.app?a.app:a.remote.app,b=(console.log,u.getAppPath()),p={};const g=n(6);function W(e){let o=g.get("lang")||"eng";if(!p[o]){let e=o+".js",n=i.resolve(b,"src/locales",e);if(d.pathExistsSync(n))w=d.readJsonSync(n);else{let e=i.resolve(b,"src/locales/eng.js");w=d.readJsonSync(e)}p[o]=w}let n=k(e);return m(p[o][n])||m(e)}const m=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),k=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const f={label:"ENG",submenu:[{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},C={label:"DEU",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},B={label:"RUS",submenu:[{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},h={label:"ZHO",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}}]},F={label:"TIB",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},y=n(0).Menu;n(1),console.log;function v(e){const o=[{label:"File",submenu:[{label:W("home"),accelerator:"CmdOrCtrl+L",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:W("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{c.app.quit()}}]},{label:W("dictionary"),submenu:[{label:W("Arrange local dicts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","arrange-dicts")}},{label:W("Clone from server"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","remote-dicts")}},{label:W("Import form CSV"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:W("Create CSV from texts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:W("Publish dictionary"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:W("Reread the source"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","reread-dict")}},{label:W("Cleanup DBs completely"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:W("Book"),submenu:[{label:W("Import from ODS"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("parseOds")}},{label:W("Import from file"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("parseDir")}},{type:"separator"},{label:W("Clone from Github"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","cloneGithub")}},{label:W("Publish book"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","publish")}},{type:"separator"},{label:W("Export to TXT"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportTXT")}},{label:W("Export to PDF"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportPDF")}},{label:W("Export to HTML"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportHTML")}},{type:"separator"},{label:W("Create dictionary for book"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","createDict")}},{type:"separator"},{label:W("Reread the source"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","reread-book")}},{label:W("Cleanup DBs completely"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","cleanup")}},{type:"separator"}]},{label:W("About"),submenu:[{label:W("About"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:W("code and download"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:W("License"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:W("Contacts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:W("Acknowledgements"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:W("Help"),submenu:[{label:W("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:W("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{c.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];switch(e){case"eng":o.push(f);break;case"deu":o.push(C);break;case"rus":o.push(B);break;case"tib":o.push(F);break;case"zho":o.push(h);break;default:o.push(f)}y.setApplicationMenu(y.buildFromTemplate(o))}var x=n(4);const j=n(6),S=console.log;n(1);if("production"!==x.name){const e=c.app.getPath("userData");c.app.setPath("userData",`${e} (${x.name})`)}c.app.on("ready",()=>{v();const e=new c.BrowserWindow({webPreferences:{nodeIntegration:!0}});e.loadURL(l.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===x.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let o=n(11),t=o.name,s=o.version;e.webContents.send("version",s),e.setTitle([t,"v.",s].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{j.set("winBounds",e.getBounds())});const o=c.app.getAppPath(),t=c.app.getPath("userData");j.set("apath",o),j.set("upath",t),c.ipcMain.on("lang",(e,o)=>{S("_____ BACK-LANG-CHANGE",o),v(o)})}),c.app.on("window-all-closed",()=>{c.app.quit()})}]);
//# sourceMappingURL=background.js.map