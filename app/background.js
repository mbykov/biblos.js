!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=20)}([function(e,t){e.exports=require("electron")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,t){e.exports=require("path")},,function(e,t,n){"use strict";n.r(t),n.d(t,"config",function(){return o});const o={pages:["home","help"],langs:["en","de","ru"],dlang:"en"}},,function(e,t){e.exports=require("url")},,function(e,t){e.exports=require("fs")},,,,,,,,,,,,function(e,t,n){"use strict";n.r(t);var o=n(2),r=n.n(o),l=n(6),a=n.n(l),c=n(0),s=n(1);const i={label:"Development",submenu:[{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:"Toggle DevTools",accelerator:"Alt+CmdOrCtrl+I",click:()=>{c.BrowserWindow.getFocusedWindow().toggleDevTools()}},{label:"Quit",accelerator:"CmdOrCtrl+Q",click:()=>{c.app.quit()}}]},u={label:"Edit",submenu:[{label:"Undo",accelerator:"CmdOrCtrl+Z",selector:"undo:"},{label:"Redo",accelerator:"Shift+CmdOrCtrl+Z",selector:"redo:"},{type:"separator"},{label:"Cut",accelerator:"CmdOrCtrl+X",selector:"cut:"},{label:"Copy",accelerator:"CmdOrCtrl+C",selector:"copy:"},{label:"Paste",accelerator:"CmdOrCtrl+V",selector:"paste:"},{label:"Select All",accelerator:"CmdOrCtrl+A",selector:"selectAll:"}]},d={label:"Lang",submenu:[{label:"EN",click:()=>{c.ipcRenderer.send("lang","en")}},{label:"DE",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","de")}},{label:"RU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","ru")}}]},p=n(2),f=n(0),g=n(8);let b,m=f.app?f.app:f.remote.app;function w(e){let t=m.getAppPath(),n=e+".js",o=p.resolve(t,"src/locales",n);if(g.existsSync(o))b=JSON.parse(g.readFileSync(o,"utf8"));else{let e=p.resolve(t,"src/locales/en.js");b=JSON.parse(g.readFileSync(e,"utf8"))}}w.prototype.t=function(e){let t=b[e];return void 0===t&&(t=e),t};new w;let C=new class{constructor(){this.default="en"}set lang(e){this._lang=e}get lang(){return this._lang}t(e){return this.lang||(this.lang="ru"),console.log("Hello, my name is "+this.lang+", I have ID: "+this.default+", PHRASE: "+e),{lang:this.lang,phrase:e}}};C.t;function h(){console.log("TM start"),console.log("HELLO:",C.t("kuku"));let e={label:"TEST",submenu:[{label:"COPY",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","en")}},{label:"DE",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","de")}},{label:"RU",click:()=>{c.BrowserWindow.getFocusedWindow().webContents.send("lang","ru")}}]};return console.log("M",e),e}const y=n(0).Menu;n(4);const v=console.log;n(4);if("production"!==s.name){const e=c.app.getPath("userData");c.app.setPath("userData",`${e} (${s.name})`)}c.app.on("ready",()=>{!function(){const e=[u,h()];"production"!==s.name&&e.push(i),e.push(d),y.setApplicationMenu(y.buildFromTemplate(e))}();const e=new c.BrowserWindow({webPreferences:{nodeIntegration:!0}});e.loadURL(a.a.format({pathname:r.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===s.name&&e.openDevTools(),c.ipcMain.on("lang",(e,t)=>{v("LANG",t)})}),c.app.on("window-all-closed",()=>{c.app.quit()})}]);
//# sourceMappingURL=background.js.map