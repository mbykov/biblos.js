!function(n){var e={};function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(o,r,function(e){return n[e]}.bind(null,r));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=21)}([function(n,e){n.exports=require("electron")},function(n){n.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(n,e){n.exports=require("path")},function(n,e){n.exports=require("lodash")},,function(n,e){n.exports=require("electron-clipboard-extended")},,function(n,e){n.exports=require("split.js")},,function(n,e,t){var o=t(10);"string"==typeof o&&(o=[[n.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(14)(o,r);o.locals&&(n.exports=o.locals)},function(n,e,t){e=n.exports=t(11)(!1);var o=t(12)(t(13));e.push([n.i,'/* @import "./treeview.min.css" */\n\np {\n  padding-bottom: 6px;\n}\n\nh4 {\n  color: maroon;\n}\n\n/* .is-shown { */\n/*     display: block!important; */\n/* } */\n\n.is-hidden {\n  display: none!important;\n}\n\n#main {\n    margin: 0;\n    padding: 10px;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n#home {\n    padding-top: 25px;\n}\n\n#title {\n    margin: 0;\n    padding: 10px;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.section {\n    margin: 5px;\n    display: block;\n    overflow-y: hidden;\n    height: 100%;\n    padding-bottom: 20px;\n    margin-bottom: 20px;\n}\n\n.split {\n    overflow-y: auto;\n    overflow-x: hidden;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.gutter {\n    background-color: #eee;\n    background-repeat: no-repeat;\n    background-position: 50%;\n    height: 100%;\n    width: 5px;\n}\n\n.gutter.gutter-horizontal {\n    background-image: url('+o+");\n    cursor: ew-resize;\n}\n\n.split, .gutter.gutter-horizontal {\n    height: 100%;\n    float: left;\n}\n\n#source {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    font-size: 18px;\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    overflow-y: hidden;\n    /* overflow-x: hidden; */\n}\n\n#result {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    /* font-size: 14px; */\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.link {\n  cursor: pointer;\n  color: maroon;\n}\n\n.clause {\n    background-color: #eee;\n}\n\n\n/* span { */\n    /* padding-right: 5px; */\n/* } */\n\nspan.space {\n    padding-right: 0;\n}\n\nspan.tibphrase {\n    padding-right: 0;\n}\n\nspan.term {\n    padding-right: 0;\n}\n\nspan.tibphrase:hover {\n    /* background-color: #eee8aa; */\n}\n\nspan.tibwf:hover {\n  background-color: #eee8aa;\n}\n\n.grey {\n    color: grey;\n}\n\nli.hidden {\n  display: none;\n}\n\n.hidden {\n    display: none; /* !important */;\n}\n\n.activetrn {\n    display: block!important;\n}\n\ninput[type='file'] {\n    color: transparent;\n}\n\n.maroon {\n    color: maroon;\n}\n\n/* span.clear { clear: left; display: block; } */\n\n#book {\n  padding-top: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n}\n\n#headers {\n  margin: 0;\n  height: 30px;\n}\n\n#headers > p {\n  margin: 0;\n  -webkit-margin-before: 0;\n}\n\n#trns > p.hidden {\n  display: none;\n}\n\n.hleft {\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  /* padding-left: 15px; */\n  padding-right: 15px;\n  color: maroon;\n}\n\n.hright {\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: maroon;\n}\n\n.header {\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  background: white;\n  padding: 5px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n/* #headers { */\n/*   height: 16px; */\n/*   padding-bottom: 10px; */\n/* } */\n\n#book > div.hright > ul  {\n  margin: 0;\n  padding: 0;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  -webkit-margin-start: 0;\n  -webkit-margin-end: 0;\n  -webkit-padding-start: 0;\n}\n\n#book {\n  margin: 0;\n  padding: 0;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  -webkit-margin-start: 0;\n  -webkit-margin-end: 0;\n  -webkit-padding-start: 0;\n}\n\n.bookTitle {\n  margin-top: 80px;\n  margin-left: 50px;\n}\n\n.author {\n  font-size: 18px;\n}\n\n.title {\n  color: maroon;\n  font-size: 24px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.check-name {\n  padding-left: 5px;\n}\n\nspan.active {\n  cursor: pointer;\n}\n\nspan.query {\n    cursor: pointer;\n    color: maroon;\n    font-weight: bold;\n}\n\n.libauth {\n  padding-top: 25px;\n  cursor: pointer;\n}\n\n.lib-auth {\n  padding: 10px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 16px;\n  color: maroon;\n}\n\n.lib-auth::after {\n  content: ':'\n}\n\n.lib-title {\n  padding: 10px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 16px;\n}\n\n.book-content {\n  padding-left: 10px;\n  font-size: 18px;\n  color: maroon;\n}\n\n/* #book > div.hleft.header > div > div:nth-child(2) */\ndiv.hleft.header > div.tree {\n  /* display: none; */\n}\n\n.qlink {\n  padding-right: 15px;\n  color: maroon;\n  cursor: pointer;\n}\n\n.qtext {\n  padding-left: 15px;\n}\n\n/* #source > div:nth-child(2) > p:nth-child(4) */\n/* #source > div:nth-child(2) > div > p:nth-child(2) */\ndiv.qtext > p.hidden {\n  display: none;\n}\n\n.disclaimer {\n  font-size: 10px;\n  }\n\n.qtitle {\n  color: maroon;\n  font-size: 24px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.statline {\n    padding-left: 25px;\n}\n\n.statnic {\n    width: 150px;\n}\n\n.statnic::after {\n    content: ': ';\n}\n\n.green {\n    color: green;\n}\n\n.red {\n    color: red;\n}\n\n#transcript {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  /* background-color: white; */\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1100;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  font-size: 16px;\n  padding: 3px;\n  background-color: #e6ffcc;\n}\n\n#ambi {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1000;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  padding: 3px;\n  background-color: white;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.upper {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1001;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  padding: 3px;\n  background-color: white;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.danger {\n  background-color: #fff2e6;\n}\n\n#ambi > ul {\n  /* magrin: 0; */\n  /* padding-inline-start: 0; */\n  /* margin-block-start: 0; */\n  /* margin-block-end: 0; */\n  padding: 3px;\n}\n\n#ambi > ul > li > span {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.upper > ul > li > span {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.dict-wf {\n  color: maroon;\n}\n\n.dict-ul {\n  font-size: small;\n  padding-left: 15px;\n}\n\n.dict-dname {\n  float: right;\n  padding: 12px;\n  /* padding-top: 0; */\n  color: green;\n}\n\n.dict-article {\n  padding-top: 12px;\n}\n\n.dicts-table {\n  width: 100%;\n  margin-top: 25px;\n}\n\n\n#arrange-dicts {\n  margin-top: 50px;\n}\n\n.dictname {\n  cursor: pointer;\n  color: maroon;\n}\n\n.dict-check {\n  width: 20px;\n  height: 20px;\n}\n\n.active-dict {\n  width: 100px;\n}\n\n#pechatxt {\n  padding-left: 15px;\n  padding-top: 25px;\n  padding-bottom: 25px;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.dictcsv {\n  color: maroon;\n  cursor: pointer;\n}\n\n.table-header {\n  color: maroon;\n  font-weight: bold;\n}\n",""])},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(n){return"/*# sourceURL="+o.sourceRoot+n+" */"});return[t].concat(i).concat([r]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(r=0;r<n.length;r++){var a=n[r];null!=a[0]&&o[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(n,e,t){"use strict";n.exports=function(n,e){return"string"!=typeof n?n:(/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),/["'() \t\n]/.test(n)||e?'"'+n.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':n)}},function(n,e,t){n.exports=t.p+"aeed77a8b9081818ddf762cf8f7e2829.png"},function(n,e,t){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),s=function(n){var e={};return function(n,t){if("function"==typeof n)return n();if(void 0===e[n]){var o=function(n,e){return e?e.querySelector(n):document.querySelector(n)}.call(this,n,t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(n){o=null}e[n]=o}return e[n]}}(),d=null,l=0,p=[],c=t(15);function f(n,e){for(var t=0;t<n.length;t++){var o=n[t],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(x(o.parts[a],e))}else{var s=[];for(a=0;a<o.parts.length;a++)s.push(x(o.parts[a],e));i[o.id]={id:o.id,refs:1,parts:s}}}}function u(n,e){for(var t=[],o={},r=0;r<n.length;r++){var i=n[r],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):t.push(o[a]={id:a,parts:[s]})}return t}function g(n,e){var t=s(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=p[p.length-1];if("top"===n.insertAt)o?o.nextSibling?t.insertBefore(e,o.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),p.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(n.insertAt.before,t);t.insertBefore(e,r)}}function h(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=p.indexOf(n);e>=0&&p.splice(e,1)}function m(n){var e=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var o=function(){0;return t.nc}();o&&(n.attrs.nonce=o)}return b(e,n.attrs),g(n,e),e}function b(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function x(n,e){var t,o,r,i;if(e.transform&&n.css){if(!(i="function"==typeof e.transform?e.transform(n.css):e.transform.default(n.css)))return function(){};n.css=i}if(e.singleton){var a=l++;t=d||(d=m(e)),o=w.bind(null,t,a,!1),r=w.bind(null,t,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",b(e,n.attrs),g(n,e),e}(e),o=function(n,e,t){var o=t.css,r=t.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=c(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t,e),r=function(){h(t),t.href&&URL.revokeObjectURL(t.href)}):(t=m(e),o=function(n,e){var t=e.css,o=e.media;o&&n.setAttribute("media",o);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),r=function(){h(t)});return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=u(n,e);return f(t,e),function(n){for(var o=[],r=0;r<t.length;r++){var a=t[r];(s=i[a.id]).refs--,o.push(s)}n&&f(u(n,e),e);for(r=0;r<o.length;r++){var s;if(0===(s=o[r]).refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete i[s.id]}}}};var v,y=(v=[],function(n,e){return v[n]=e,v.filter(Boolean).join("\n")});function w(n,e,t,o){var r=t?"":o.css;if(n.styleSheet)n.styleSheet.cssText=y(e,r);else{var i=document.createTextNode(r),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,o=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var r,i=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(n,e){n.exports=require("speckled-band")},function(n,e){n.exports=require("util")},function(n,e){n.exports=require("fs-extra")},function(n,e){n.exports=require("mousetrap")},,function(n,e,t){"use strict";t.r(e);t(9);var o=t(0);t(1),t(16),t(3);t(17);function r(n){return document.querySelector(n)}console.log;const i=t(18),a=t(2);t(7);const s=o.remote.app,d=(s.getAppPath(),s.getPath("userData"),console.log),l=(t(5),t(0).remote.require("electron-settings")),p=t(19),{getCurrentWindow:c}=(t(2),t(0).remote);let f=[],u=0;function g(n){!function(n){const e=(t=".section",document.querySelectorAll(t));var t;Array.prototype.forEach.call(e,n=>{n.classList.add("is-hidden")});const o=["#",n.sec,"_",n.lang].join("");d("S",n),d("S_",o),r(o).classList.remove("is-hidden"),h()}(n),n.old||(n.old=!1,delete n.old,f.push(n),u=f.length-1),r("#progress").classList.add("is-hidden"),l.set("state",n)}function h(){r("#transcript").classList.add("is-hidden")}p.bind(["alt+left","alt+right"],function(n){37==n.which?function(){if(u<=0)return;u--;let n=f[u];n.old=!0,g(n)}():39==n.which&&function(){if(u>=f.length-1)return;u++;let n=f[u];n.old=!0,g(n)}()}),p.bind(["esc"],function(n){h()}),p.bind(["ctrl+d"],function(n){let e=l.get("state");e.sec="help",l.set("state",e),g(e)}),p.bind(["ctrl+f"],function(n){let e=l.get("state");e.sec="home",l.set("state",e),g(e)}),p.bind(["ctrl+="],function(n){r("#source").style.fontSize="larger"}),p.bind(["ctrl+-"],function(n){r("#source").style.fontSize="smaller"}),p.bind(["ctrl+0"],function(n){r("#source").style.fontSize="medium"});const m=console.log,b=(o.remote.app,t(5)),x=t(0).remote.require("electron-settings");!function(n,e){let t=r("#container");n.forEach(n=>{e.forEach(e=>{let o,r=[e,"html"].join(".");try{r=a.resolve(__dirname,"../src/sections",n,[e,"html"].join(".")),o=i.readFileSync(r)}catch(n){r=a.resolve(__dirname,"../src/sections","en",[e,"html"].join(".")),o=i.readFileSync(r)}let s=function(n,e){let t=document.createElement(n);return e&&t.classList.add(e),t}("div","section");s.id=[e,n].join("_"),s.setAttribute("lang",n),s.classList.add("is-hidden"),s.innerHTML=o,t.appendChild(s.cloneNode(!0))})})}(["en","de","ru"],["home","help"]);let v=x.get("state");v={sec:"home",lang:"en"},x.set("state",v),g(v),o.ipcRenderer.on("lang",function(n,e){let t=x.get("state");t.lang=e,x.set("state",t),m("LANG",e)}),b.on("text-changed",()=>{let n=b.readText();m("CLP",n)}).startWatching();r("#progress"),r("#message")}]);
//# sourceMappingURL=app.js.map