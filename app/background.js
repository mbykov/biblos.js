!function(e){var o={};function n(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)n.d(t,s,function(o){return e[o]}.bind(null,s));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=20)}([function(e,o){e.exports=require("electron")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,o){e.exports=require("path")},function(e,o,n){"use strict";n.r(o),n.d(o,"config",function(){return t});const t={pages:["home","help"],langs:["eng","deu","rus"],deflang:"eng"}},function(e,o){e.exports=require("fs-extra")},,,function(e,o){e.exports=require("url")},,function(e,o){e.exports=require("electron-settings")},,,,,,,,,,,function(e,o,n){"use strict";n.r(o);var t=n(2),s=n.n(t),r=n(7),c=n.n(r),l=n(0),i=n(1);const d=n(2),a=n(0),u=n(4);let w,b=a.app?a.app:a.remote.app,p=(console.log,b.getAppPath()),g={};const f=n(9);function W(e){let o=f.get("lang")||"eng";if(!g[o]){let e=o+".js",n=d.resolve(p,"src/locales",e);if(u.pathExistsSync(n))w=u.readJsonSync(n);else{let e=d.resolve(p,"src/locales/en.js");w=u.readJsonSync(e)}g[o]=w}let n=m(e);return C(g[o][n])||e}const C=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),m=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const k={label:"Lang",submenu:[{label:"EN",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DE",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]};const B=n(0).Menu;n(3),console.log;function F(e){const o=[{label:"File",submenu:[{label:W("home"),accelerator:"CmdOrCtrl+L",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:W("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{l.app.quit()}}]},{label:W("dictionary"),submenu:[{label:W("Arrange local dicts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","activedicts")}},{label:W("Clone from server"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","remotedicts")}},{label:W("Import form CSV"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:W("Create CSV from texts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:W("Publish dictionary"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:W("Reread the source"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","reread-dict")}},{label:W("Cleanup DBs completely"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:W("Book"),submenu:[{label:W("Import from ODS"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("parseOds")}},{label:W("Import from file"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("parseDir")}},{type:"separator"},{label:W("Clone from Github"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","cloneGithub")}},{label:W("Publish book"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","publish")}},{type:"separator"},{label:W("Export to TXT"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportTXT")}},{label:W("Export to PDF"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportPDF")}},{label:W("Export to HTML"),enabled:!1,click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","exportHTML")}},{type:"separator"},{label:W("Create dictionary for book"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","createDict")}},{type:"separator"},{label:W("Reread the source"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","reread-book")}},{label:W("Cleanup DBs completely"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("action","cleanup")}},{type:"separator"}]},{label:W("About"),submenu:[{label:W("About"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:W("code and download"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:W("License"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:W("Contacts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:W("Acknowledgements"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:W("Help"),submenu:[{label:W("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:W("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{l.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];o.push(k),B.setApplicationMenu(B.buildFromTemplate(o))}const y=console.log;n(3);if("production"!==i.name){const e=l.app.getPath("userData");l.app.setPath("userData",`${e} (${i.name})`)}l.app.on("ready",()=>{F();const e=new l.BrowserWindow({webPreferences:{nodeIntegration:!0}});e.loadURL(c.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===i.name&&e.openDevTools(),l.ipcMain.on("lang",(e,o)=>{y("_____ BACK-LANG-CHANGE",o),F()})}),l.app.on("window-all-closed",()=>{l.app.quit()})}]);
//# sourceMappingURL=background.js.map