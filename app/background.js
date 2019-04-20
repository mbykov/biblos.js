!function(e){var o={};function n(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)n.d(t,s,function(o){return e[o]}.bind(null,s));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=37)}({0:function(e,o){e.exports=require("electron")},10:function(e,o){e.exports=require("electron-settings")},14:function(e,o){e.exports=require("url")},17:function(e){e.exports={name:"a-template",productName:"Electron Boilerplate",description:"Starter for my Electron application",version:"1.0.0",private:!0,author:"M. Bykov <m.bykov@gmail.com>",copyright:"© 2017- 2019, M.Bykov",homepage:"http://diglossa.org",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^7.0.1",loigos:"^0.1.0",markdown:"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2",mousetrap:"^1.6.3",nano:"^8.0.1","node-couchdb":"^1.3.0",pouchdb:"^7.0.0",pug:"^2.0.3",request:"^2.88.0",showdown:"^1.9.0","speckled-band":"^2.0.0","split.js":"^1.5.10"},devDependencies:{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0",chai:"^4.2.0","css-loader":"^2.1.1",electron:"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^5.0.0","style-loader":"^0.23.1",webpack:"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"}}},2:function(e,o,n){"use strict";n.r(o),n.d(o,"config",function(){return t});const t={code:"grc",pages:["home","main","remote-dicts","arrange-dicts","help","dict-edit"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],deflang:"eng"}},3:function(e,o){e.exports=require("path")},37:function(e,o,n){"use strict";n.r(o);var t=n(3),s=n.n(t),r=n(14),l=n.n(r),c=n(0);const i={label:"<--",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","goleft")}},d={label:"--\x3e",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","goright")}},a=n(3),w=n(0),u=n(5);let b,p=w.app?w.app:w.remote.app,g=(console.log,p.getAppPath()),W={};const m=n(10);function k(e){let o=m.get("lang")||"eng";if(!W[o]){let e=o+".js",n=a.resolve(g,"src/locales",e);if(u.pathExistsSync(n))b=u.readJsonSync(n);else{let e=a.resolve(g,"src/locales/eng.js");b=u.readJsonSync(e)}W[o]=b}let n=C(e);return f(W[o][n])||f(e)}const f=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),C=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const B={label:"ENG",submenu:[{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},h={label:"DEU",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},F={label:"RUS",submenu:[{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},y={label:"ZHO",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}}]},v={label:"TIB",submenu:[{label:"ENG",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"ZHO",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},x=n(0).Menu;n(2),console.log;var j=n(4);const S=n(10);console.log,n(2);if("production"!==j.name){const e=c.app.getPath("userData");c.app.setPath("userData",`${e} (${j.name})`)}c.app.on("ready",()=>{!function(e){const o=[i,d,{label:"File",submenu:[{label:k("home"),accelerator:"CmdOrCtrl+L",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:k("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{c.app.quit()}}]},{label:k("dictionary"),submenu:[{label:k("Arrange local dicts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","arrange-dicts")}},{label:k("Clone dict from server"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","remote-dicts")}},{label:k("Import form CSV"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:k("Create CSV from texts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:k("Publish dictionary"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:k("Reread the source"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","reread-dict")}},{label:k("Cleanup DBs completely"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:k("Book"),submenu:[{label:k("Import from ODS"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("parseOds")}},{label:k("Import from file"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("parseDir")}},{type:"separator"},{label:k("Clone from Github"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","cloneGithub")}},{label:k("Publish book"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","publish")}},{type:"separator"},{label:k("Export to TXT"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportTXT")}},{label:k("Export to PDF"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportPDF")}},{label:k("Export to HTML"),enabled:!1,click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","exportHTML")}},{type:"separator"},{label:k("Create dictionary for book"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","createDict")}},{type:"separator"},{label:k("Reread the source"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","reread-book")}},{label:k("Cleanup DBs completely"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("action","cleanup")}},{type:"separator"}]},{label:k("About"),submenu:[{label:k("About"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:k("code and download"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:k("License"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:k("Contacts"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:k("Acknowledgements"),click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:k("Help"),submenu:[{label:k("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:k("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{c.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];switch(e){case"eng":o.push(B);break;case"deu":o.push(h);break;case"rus":o.push(F);break;case"tib":o.push(v);break;case"zho":o.push(y);break;default:o.push(B)}x.setApplicationMenu(x.buildFromTemplate(o))}();const e=new c.BrowserWindow({webPreferences:{nodeIntegration:!0}});let o=S.get("winBounds")||e.getBounds();o.y-=21,e.setBounds(o),e.loadURL(l.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===j.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let o=n(17),t=o.name,s=o.version;e.webContents.send("version",s),e.setTitle([t,"v.",s].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{S.set("winBounds",e.getBounds())});const t=c.app.getAppPath(),r=c.app.getPath("userData");S.set("apath",t),S.set("upath",r)}),c.ipcMain.on("unload",(e,o)=>{S.set("state",o)}),c.app.on("window-all-closed",()=>{c.app.quit()})},4:function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},5:function(e,o){e.exports=require("fs-extra")}});
//# sourceMappingURL=background.js.map