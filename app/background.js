!function(e){var n={};function o(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)o.d(t,s,function(n){return e[n]}.bind(null,s));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=31)}({0:function(e,n){e.exports=require("electron")},11:function(e,n){e.exports=require("url")},14:function(e){e.exports=JSON.parse('{"version":"0.9.136","name":"biblos.js","productName":"Biblos.js","description":"Biblos.js, a.k.a Morpheus for Ancient Greek based on CouchDB && Electron.js","author":"M. Bykov <m.bykov@gmail.com>","copyright":"© 2017- 2019, M.Bykov","homepage":"http://diglossa.org","license":"GPL-3.0","main":"app/background.js","build":{"appId":"org.diglossa.biblos.js","files":["app/**/*","src/**/*","resources/**/*","pouch/**/*","package.json"],"asarUnpack":"pouch/**/*","directories":{"buildResources":"resources"},"dmg":{"contents":[{"x":410,"y":150,"type":"link","path":"/Applications"},{"x":130,"y":150,"type":"file"}]},"mac":{"icon":"resources/icon.icns"},"win":{"icon":"resources/icon.ico","publisherName":"Michael Bykov","publish":["github"]},"linux":{"category":"Educational software","target":["deb"],"icon":"resources/icons"},"publish":"github"},"scripts":{"postinstall":"electron-builder install-app-deps","preunit":"webpack --config=build/webpack.unit.config.js --env=test --display=none","unit":"electron-mocha temp/specs.js --renderer --require source-map-support/register","pree2e":"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none","e2e":"mocha temp/e2e.js --require source-map-support/register","test":"npm run unit && npm run e2e","start":"node build/start.js 2>/dev/null","release_":"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder","release":"webpack --config=build/webpack.app.config.js --env=production && electron-builder"},"dependencies":{"antrax":"^0.9.117","axios":"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^8.1.0","markdown":"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2","mississippi":"^4.0.0","mousetrap":"^1.6.3","nano":"^8.0.1","node-couchdb":"^1.3.0","normalize.css":"^8.0.1","orthos":"^0.6.3","pouchdb":"^7.0.0","pug":"^2.0.3","request":"^2.88.0","showdown":"^1.9.0","speckled-band":"^3.1.3","split.js":"^1.5.10","webpack-cli":"^3.3.8"},"devDependencies":{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0","chai":"^4.2.0","css-loader":"^2.1.1","electron":"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0","mocha":"^5.2.0","source-map-support":"^0.5.9","spectron":"^5.0.0","style-loader":"^0.23.1","webpack":"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"},"repository":{"type":"git","url":"git+https://github.com/mbykov/biblos.js.git"},"bugs":{"url":"https://github.com/mbykov/biblos.js/issues"}}')},2:function(e,n,o){"use strict";o.r(n),o.d(n,"config",(function(){return t}));const t={code:"grc",host:"http://diglossa.org:5984",pages:["home","main","remote-dicts","arrange-dicts","db-info","arrange-dicts","help","dict-edit","local-chunk","local-dict-full","local-dict-item","localdict-help","about","authentic","code","license","acknowledgements","arrange-dicts","contacts","csv"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],ldname:"local",deflang:"eng"}},31:function(e,n,o){"use strict";o.r(n);var t=o(4),s=o.n(t),r=o(11),c=o.n(r),l=o(0);const i=o(4),a=o(0),d=o(6);let u,p=a.app?a.app:a.remote.app,b=(console.log,p.getAppPath()),w={};const g=o(8);function m(e){let n=g.get("lang")||"eng";if(!w[n]){let e=n+".js",o=i.resolve(b,"src/locales",e);if(d.pathExistsSync(o))u=d.readJsonSync(o);else{let e=i.resolve(b,"src/locales/eng.js");u=d.readJsonSync(e)}w[n]=u}let o=k(e);return f(w[n][o])||f(e)}const f=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),k=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const h={label:"ENG",submenu:[{label:"DEU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]},W={label:"DEU",submenu:[{label:"ENG",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"RUS",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}}]},y={label:"RUS",submenu:[{label:"DEU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"ENG",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}}]},C={label:"ZHO",submenu:[{label:"ENG",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}}]},B={label:"TIB",submenu:[{label:"ENG",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"ZHO",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},v=o(0).Menu;o(2),console.log;function j(e){const n=[{label:"File",submenu:[{label:m("home"),accelerator:"CmdOrCtrl+H",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:m("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{l.app.quit()}}]},{label:m("dictionary"),submenu:[{label:m("Arrange and clone dicts from server"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","remote-dicts")}},{label:m("local dictionary"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","localdict-help")}},{type:"separator"},{label:m("Cleanup DBs completely"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:m("About"),submenu:[{label:m("About"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:m("Authentic grammar"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","authentic")}},{label:m("code and download"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:m("License"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:m("Contacts"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:m("Acknowledgements"),click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:m("Help"),submenu:[{label:m("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{l.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:m("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{l.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];switch(e){case"eng":n.push(h);break;case"deu":n.push(W);break;case"rus":n.push(y);break;case"tib":n.push(B);break;case"zho":n.push(C);break;default:n.push(h)}v.setApplicationMenu(v.buildFromTemplate(n))}var F=o(7);const x=o(8);console.log,o(2);if("production"!==F.name){const e=l.app.getPath("userData");l.app.setPath("userData",`${e} (${F.name})`)}l.app.on("ready",()=>{j(x.get("lang")||"eng");const e=new l.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=x.get("winBounds")||e.getBounds();n.y-=21,e.setBounds(n),e.loadURL(c.a.format({pathname:s.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===F.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=o(14),t=n.name,s=n.version;e.webContents.send("version",s),e.setTitle([t,"v.",s].join(" "))}),e.on("resize",(function(){e.webContents.send("reload")})),e.on("close",()=>{x.set("winBounds",e.getBounds())})}),l.ipcMain.on("lang",(e,n)=>{j(n)}),l.app.on("window-all-closed",()=>{l.app.quit()})},4:function(e,n){e.exports=require("path")},6:function(e,n){e.exports=require("fs-extra")},7:function(e){e.exports=JSON.parse('{"name":"development","description":"Add here any environment specific stuff you like."}')},8:function(e,n){e.exports=require("electron-settings")}});
//# sourceMappingURL=background.js.map