!function(e){var n={};function o(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)o.d(t,s,function(n){return e[n]}.bind(null,s));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=31)}({0:function(e,n){e.exports=require("electron")},11:function(e,n){e.exports=require("url")},14:function(e){e.exports=JSON.parse('{"version":"0.9.110","name":"biblos.js","productName":"Biblos.js","description":"Biblos, a.k.a Morpheus for Ancient Greek based on CouchDB && Electron.js","author":"M. Bykov <m.bykov@gmail.com>","copyright":"© 2017- 2019, M.Bykov","homepage":"http://diglossa.org","license":"GPL-3.0","main":"app/background.js","build":{"appId":"org.diglossa.morpheus-greek","files":["app/**/*","src/**/*","resources/**/*","pouch/**/*","package.json"],"asarUnpack":"pouch/**/*","directories":{"buildResources":"resources"},"dmg":{"contents":[{"x":410,"y":150,"type":"link","path":"/Applications"},{"x":130,"y":150,"type":"file"}]},"mac":{"icon":"resources/icon.icns"},"win":{"icon":"resources/icon.ico","publisherName":"Michael Bykov","publish":["github"]},"linux":{"category":"Educational software","target":["deb"],"icon":"resources/icons"},"publish":"github"},"scripts":{"postinstall":"electron-builder install-app-deps","preunit":"webpack --config=build/webpack.unit.config.js --env=test --display=none","unit":"electron-mocha temp/specs.js --renderer --require source-map-support/register","pree2e":"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none","e2e":"mocha temp/e2e.js --require source-map-support/register","test":"npm run unit && npm run e2e","start":"node build/start.js 2>/dev/null","release_":"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder","release":"webpack --config=build/webpack.app.config.js --env=production && electron-builder"},"dependencies":{"antrax":"^0.9.17","axios":"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^8.1.0","markdown":"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2","mississippi":"^4.0.0","mousetrap":"^1.6.3","nano":"^8.0.1","node-couchdb":"^1.3.0","normalize.css":"^8.0.1","orthos":"^0.6.3","pouchdb":"^7.0.0","pug":"^2.0.3","request":"^2.88.0","showdown":"^1.9.0","speckled-band":"^3.1.3","split.js":"^1.5.10","webpack-cli":"^3.3.8"},"devDependencies":{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0","chai":"^4.2.0","css-loader":"^2.1.1","electron":"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0","mocha":"^5.2.0","source-map-support":"^0.5.9","spectron":"^5.0.0","style-loader":"^0.23.1","webpack":"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"},"repository":{"type":"git","url":"git+https://github.com/mbykov/biblos.js.git"},"bugs":{"url":"https://github.com/mbykov/biblos.js/issues"}}')},2:function(e,n,o){"use strict";o.r(n),o.d(n,"config",(function(){return t}));const t={code:"grc",host:"http://diglossa.org:5984",pages:["home","main","remote-dicts","arrange-dicts","db-info","arrange-dicts","help","dict-edit","local-chunk","local-dict-full","local-dict-item","localdict-help","about","authentic","code","license","acknowledgements","arrange-dicts","contacts","csv"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],ldname:"local",deflang:"eng"}},31:function(e,n,o){"use strict";o.r(n);var t=o(4),s=o.n(t),r=o(11),c=o.n(r),i=o(0);const l={label:"<--",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","goleft")}},a={label:"--\x3e",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("action","goright")}},d=o(4),u=o(0),p=o(6);let b,w=u.app?u.app:u.remote.app,g=(console.log,w.getAppPath()),m={};const f=o(8);function k(e){let n=f.get("lang")||"eng";if(!m[n]){let e=n+".js",o=d.resolve(g,"src/locales",e);if(p.pathExistsSync(o))b=p.readJsonSync(o);else{let e=d.resolve(g,"src/locales/eng.js");b=p.readJsonSync(e)}m[n]=b}let o=W(e);return h(m[n][o])||h(e)}const h=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),W=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const C={label:"ENG",submenu:[{label:"DEU",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]},y={label:"DEU",submenu:[{label:"ENG",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"RUS",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]},B={label:"RUS",submenu:[{label:"DEU",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"ENG",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}}]},v={label:"ZHO",submenu:[{label:"ENG",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}}]},F={label:"TIB",submenu:[{label:"ENG",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"ZHO",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},j=o(0).Menu;o(2),console.log;function x(e){const n=[l,a,{label:"File",submenu:[{label:k("home"),accelerator:"CmdOrCtrl+H",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:k("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{i.app.quit()}}]},{label:k("dictionary"),submenu:[{label:k("Arrange and clone dicts from server"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","remote-dicts")}},{label:k("local dictionary"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","localdict-help")}},{type:"separator"},{label:k("Cleanup DBs completely"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:k("About"),submenu:[{label:k("About"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:k("Authentic grammar"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","authentic")}},{label:k("code and download"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:k("License"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:k("Contacts"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:k("Acknowledgements"),click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:k("Help"),submenu:[{label:k("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{i.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:k("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{i.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];switch(e){case"eng":n.push(C);break;case"deu":n.push(y);break;case"rus":n.push(B);break;case"tib":n.push(F);break;case"zho":n.push(v);break;default:n.push(C)}j.setApplicationMenu(j.buildFromTemplate(n))}var S=o(7);const O=o(8);console.log,o(2);if("production"!==S.name){const e=i.app.getPath("userData");i.app.setPath("userData",`${e} (${S.name})`)}i.app.on("ready",()=>{x(O.get("lang")||"eng");const e=new i.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=O.get("winBounds")||e.getBounds();n.y-=21,e.setBounds(n),e.loadURL(c.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===S.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=o(14),t=n.name,s=n.version;e.webContents.send("version",s),e.setTitle([t,"v.",s].join(" "))}),e.on("resize",(function(){e.webContents.send("reload")})),e.on("close",()=>{O.set("winBounds",e.getBounds())})}),i.ipcMain.on("lang",(e,n)=>{x(n)}),i.app.on("window-all-closed",()=>{i.app.quit()})},4:function(e,n){e.exports=require("path")},6:function(e,n){e.exports=require("fs-extra")},7:function(e){e.exports=JSON.parse('{"name":"development","description":"Add here any environment specific stuff you like."}')},8:function(e,n){e.exports=require("electron-settings")}});
//# sourceMappingURL=background.js.map