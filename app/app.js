!function(n){var e={};function t(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(i,o,function(e){return n[e]}.bind(null,o));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=38)}([function(n,e){n.exports=require("electron")},function(n,e){n.exports=require("lodash")},function(n,e,t){"use strict";t.r(e),t.d(e,"config",function(){return i});const i={code:"grc",pages:["home","main","remote-dicts","arrange-dicts","help","dict-edit"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],deflang:"eng"}},function(n,e){n.exports=require("path")},function(n){n.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(n,e){n.exports=require("util")},function(n,e){n.exports=require("debug")},function(n,e){n.exports=require("fs-extra")},,,,,function(n,e){n.exports=require("electron-clipboard-extended")},,,function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;t(1),console.log,t(6)("app");var i={zho:"([一-鿿]+)",tib:"([ༀ-࿿]+)",grc:"([Ͱ-Ͽἀ-῿̀-ͯ᾽]+)"};e.default=function(n,e){if(i[e]){n=n.replace(/ +/g," ").trim();var t=new RegExp(i[e]);if(t.test(n)){var o=new RegExp("([.,!:;·།])"),r=n.replace(/\r?\n+/,"\n").split("\n"),a=[];return r.forEach(function(n){var e=[];n.split(o).forEach(function(n){if(n=n.trim(),o.test(n)){var i={text:n,punct:!0};e.push(i)}else n.split(t).forEach(function(n){if(n){var i=!!t.test(n),o={text:n};" "==n?o.space=!0:i?o.lang=!0:o.other=!0,e.push(o)}})}),a.push(e)}),a.filter(function(n){return n.length})}}}},function(n,e){n.exports=require("split.js")},,,,,,,,function(n,e,t){var i=t(25);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};t(29)(i,o);i.locals&&(n.exports=i.locals)},function(n,e,t){e=n.exports=t(26)(!1);var i=t(27)(t(28));e.push([n.i,'/* @import "./treeview.min.css" */\n\np {\n  padding-bottom: 6px;\n}\n\nh4 {\n  color: maroon;\n}\n\n/* .is-shown { */\n/*     display: block!important; */\n/* } */\n\n.is-hidden {\n  display: none!important;\n}\n\n#main {\n    margin: 0;\n    padding: 10px;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n#home {\n    padding-top: 25px;\n}\n\n#title {\n    margin: 0;\n    padding: 10px;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.section {\n    margin: 15px;\n    margin-top: 15px;\n    display: block;\n    overflow-y: hidden;\n    height: 100%;\n    padding-bottom: 120px;\n    margin-bottom: 120px;\n    font-family: "Helvetica Neue", Helvetica, Arial;\n    font-size: 1em;\n    position: relative;\n}\n\n.split {\n    overflow-y: auto;\n    overflow-x: hidden;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.gutter {\n    background-color: #eee;\n    background-repeat: no-repeat;\n    background-position: 50%;\n    height: 100%;\n    width: 5px;\n}\n\n.gutter.gutter-horizontal {\n    background-image: url('+i+");\n    cursor: ew-resize;\n}\n\n.split, .gutter.gutter-horizontal {\n    height: 100%;\n    float: left;\n}\n\n#source {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    font-size: 1.2.em;\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    overflow-y: hidden;\n    line-height: 1.5;\n    /* overflow-x: hidden; */\n}\n\n#result {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    /* font-size: 14px; */\n    font-size: 1em;\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.link {\n  cursor: pointer;\n  color: maroon;\n}\n\n.dinfo {\n    cursor: pointer;\n    color: maroon;\n}\n\n.clause {\n    background-color: #eee;\n}\n\n\n/* span { */\n    /* padding-right: 5px; */\n/* } */\n\nspan.space {\n    padding-right: 0;\n}\n\nspan.tibphrase {\n    padding-right: 0;\n}\n\nspan.term {\n    padding-right: 0;\n}\n\nspan.tibphrase:hover {\n    /* background-color: #eee8aa; */\n}\n\nspan.tibwf:hover {\n  background-color: #eee8aa;\n}\n\n.grey {\n    color: grey;\n}\n\nli.hidden {\n  display: none;\n}\n\n.hidden {\n    display: none; /* !important */;\n}\n\n.activetrn {\n    display: block!important;\n}\n\ninput[type='file'] {\n    color: transparent;\n}\n\n.maroon {\n    color: maroon;\n}\n\n/* span.clear { clear: left; display: block; } */\n\n#book {\n  padding-top: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n}\n\n#headers {\n  margin: 0;\n  height: 30px;\n}\n\n#headers > p {\n  margin: 0;\n  -webkit-margin-before: 0;\n}\n\n#trns > p.hidden {\n  display: none;\n}\n\n.hleft {\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  /* padding-left: 15px; */\n  padding-right: 15px;\n  color: maroon;\n}\n\n.hright {\n  cursor: pointer;\n  position: absolute;\n  top: 10px;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: maroon;\n}\n\n.header {\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  background: white;\n  padding: 5px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n/* #headers { */\n/*   height: 16px; */\n/*   padding-bottom: 10px; */\n/* } */\n\n#book > div.hright > ul  {\n  margin: 0;\n  padding: 0;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  -webkit-margin-start: 0;\n  -webkit-margin-end: 0;\n  -webkit-padding-start: 0;\n}\n\n#book {\n  margin: 0;\n  padding: 0;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  -webkit-margin-start: 0;\n  -webkit-margin-end: 0;\n  -webkit-padding-start: 0;\n}\n\n.bookTitle {\n  margin-top: 80px;\n  margin-left: 50px;\n}\n\n.author {\n  font-size: 18px;\n}\n\n.title {\n  color: maroon;\n  font-size: 24px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.check-name {\n  padding-left: 5px;\n}\n\nspan.active-form {\n  cursor: pointer;\n}\n\nspan.query {\n    cursor: pointer;\n    color: maroon;\n    font-weight: bold;\n}\n\n.libauth {\n  padding-top: 25px;\n  cursor: pointer;\n}\n\n.lib-auth {\n  padding: 10px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 16px;\n  color: maroon;\n}\n\n.lib-auth::after {\n  content: ':'\n}\n\n.lib-title {\n  padding: 10px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 16px;\n}\n\n.book-content {\n  padding-left: 10px;\n  font-size: 18px;\n  color: maroon;\n}\n\n/* #book > div.hleft.header > div > div:nth-child(2) */\ndiv.hleft.header > div.tree {\n  /* display: none; */\n}\n\n.qlink {\n  padding-right: 15px;\n  color: maroon;\n  cursor: pointer;\n}\n\n.qtext {\n  padding-left: 15px;\n}\n\n/* #source > div:nth-child(2) > p:nth-child(4) */\n/* #source > div:nth-child(2) > div > p:nth-child(2) */\ndiv.qtext > p.hidden {\n  display: none;\n}\n\n.disclaimer {\n  font-size: 10px;\n  }\n\n.qtitle {\n  color: maroon;\n  font-size: 24px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.statline {\n    padding-left: 25px;\n}\n\n.statnic {\n    width: 150px;\n}\n\n.statnic::after {\n    content: ': ';\n}\n\n.green {\n    color: green;\n}\n\n.red {\n    color: red;\n}\n\n#transcript {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  /* background-color: white; */\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1100;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  font-size: 16px;\n  padding: 3px;\n  background-color: #e6ffcc;\n}\n\n#ambi {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1000;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  padding: 3px;\n  background-color: white;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.upper {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  color: black;\n  display: 'block';\n  padding: 3px;\n  position: absolute;\n  z-index: 1001;\n  box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75);\n  height: auto;\n  top: 250px;\n  left: 300px;\n  /* font-family: 'DejaVu Sans'; */\n  padding: 3px;\n  background-color: white;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.danger {\n  background-color: #fff2e6;\n}\n\n#ambi > ul {\n  /* magrin: 0; */\n  /* padding-inline-start: 0; */\n  /* margin-block-start: 0; */\n  /* margin-block-end: 0; */\n  padding: 3px;\n}\n\n#ambi > ul > li > span {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.upper > ul > li > span {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\nspan.active-form:hover {\n    background-color: #eee8aa;\n}\n\n.punct {\n    padding-right: 12px;\n}\n\n.dict-div {\n}\n\n.dict-query {\n    color: maroon;\n    background-color: #eee;\n    padding-left: 5px;\n    /* padding-right: 15px; */\n}\n\n.dict-header {\n    margin-top: 15px;\n}\n\n.dict-div {\n}\n\n.dict-ul {\n  font-size: small;\n  /* padding-left: 15px; */\n}\n\n.dict-dname {\n  float: right;\n  color: green;\n}\n\n.dict-gends {\n    font-style: italic;\n}\n\n.dict-pos {\n    font-style: italic;\n}\n\n.dict-rdict {\n    width: 50%;\n    padding: 5px;\n}\n\nul.dict-fls {\n    padding-left: 15px;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    background-color: #A4F3F3;\n}\n\nul.dict-trns {\n    padding-top: 5px;\n    padding-left: 25px;\n    line-height: 1.3;\n}\n\n.dict-article {\n    padding-top: 12px;\n}\n\n.dicts-table {\n  width: 100%;\n  margin-top: 25px;\n}\n\n\n#arrange-dicts {\n  margin-top: 50px;\n}\n\n.dictname {\n  cursor: pointer;\n  color: maroon;\n}\n\n.dict-check {\n  width: 20px;\n  height: 20px;\n}\n\n.active-dict {\n  width: 100px;\n}\n\n#pechatxt {\n  padding-left: 15px;\n  padding-top: 25px;\n  padding-bottom: 25px;\n  font-family: 'YagpoUni';\n  font-size: 1.5em;\n}\n\n.dictcsv {\n  color: maroon;\n  cursor: pointer;\n}\n\n.table-header {\n  color: maroon;\n  font-weight: bold;\n}\n",""])},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",i=n[3];if(!i)return t;if(e&&"function"==typeof btoa){var o=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=i.sources.map(function(n){return"/*# sourceURL="+i.sourceRoot+n+" */"});return[t].concat(r).concat([o]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(o=0;o<n.length;o++){var a=n[o];null!=a[0]&&i[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(n,e,t){"use strict";n.exports=function(n,e){return"string"!=typeof n?n:(/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),/["'() \t\n]/.test(n)||e?'"'+n.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':n)}},function(n,e,t){n.exports=t.p+"aeed77a8b9081818ddf762cf8f7e2829.png"},function(n,e,t){var i,o,r={},a=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=i.apply(this,arguments)),o}),s=function(n){var e={};return function(n,t){if("function"==typeof n)return n();if(void 0===e[n]){var i=function(n,e){return e?e.querySelector(n):document.querySelector(n)}.call(this,n,t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(n){i=null}e[n]=i}return e[n]}}(),d=null,c=0,l=[],p=t(30);function u(n,e){for(var t=0;t<n.length;t++){var i=n[t],o=r[i.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](i.parts[a]);for(;a<i.parts.length;a++)o.parts.push(x(i.parts[a],e))}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(x(i.parts[a],e));r[i.id]={id:i.id,refs:1,parts:s}}}}function f(n,e){for(var t=[],i={},o=0;o<n.length;o++){var r=n[o],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):t.push(i[a]={id:a,parts:[s]})}return t}function h(n,e){var t=s(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=l[l.length-1];if("top"===n.insertAt)i?i.nextSibling?t.insertBefore(e,i.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),l.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(n.insertAt.before,t);t.insertBefore(e,o)}}function g(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=l.indexOf(n);e>=0&&l.splice(e,1)}function m(n){var e=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var i=function(){0;return t.nc}();i&&(n.attrs.nonce=i)}return b(e,n.attrs),h(n,e),e}function b(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function x(n,e){var t,i,o,r;if(e.transform&&n.css){if(!(r="function"==typeof e.transform?e.transform(n.css):e.transform.default(n.css)))return function(){};n.css=r}if(e.singleton){var a=c++;t=d||(d=m(e)),i=w.bind(null,t,a,!1),o=w.bind(null,t,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",b(e,n.attrs),h(n,e),e}(e),i=function(n,e,t){var i=t.css,o=t.sourceMap,r=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||r)&&(i=p(i));o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([i],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t,e),o=function(){g(t),t.href&&URL.revokeObjectURL(t.href)}):(t=m(e),i=function(n,e){var t=e.css,i=e.media;i&&n.setAttribute("media",i);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){g(t)});return i(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;i(n=e)}else o()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=f(n,e);return u(t,e),function(n){for(var i=[],o=0;o<t.length;o++){var a=t[o];(s=r[a.id]).refs--,i.push(s)}n&&u(f(n,e),e);for(o=0;o<i.length;o++){var s;if(0===(s=i[o]).refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete r[s.id]}}}};var v,y=(v=[],function(n,e){return v[n]=e,v.filter(Boolean).join("\n")});function w(n,e,t,i){var o=t?"":i.css;if(n.styleSheet)n.styleSheet.cssText=y(e,o);else{var r=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(r,a[e]):n.appendChild(r)}}},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,i=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var o,r=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?n:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?t+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(n,e){n.exports=require("markdown-it")},function(n,e){n.exports=require("markdown-it-attrs")},function(n,e){n.exports=require("nano")},function(n,e){n.exports=require("mousetrap")},function(n,e){n.exports=require("markdown")},function(n,e){n.exports=require("axios")},,function(n,e,t){"use strict";t.r(e);t(24);var i=t(1),o=t.n(i),r=t(0),a=(t(4),t(15)),s=t.n(a);t(5);function d(n){return document.querySelector(n)}function c(n,e){let t=document.createElement(n);return e&&t.classList.add(e),t}function l(n,e){let t=document.createElement("span");return t.textContent=n,e&&t.classList.add(e),t}function p(n){if(n)for(;n.hasChildNodes();)n.removeChild(n.lastChild)}let u=t(31)({html:!0}),f=t(32);u.use(f);console.log;const h=t(7),g=t(3);var m=t(2);const b=t(0).remote.require("electron-settings"),x=console.log,v=t(33)("http://guest:guest@localhost:5984");function y(){v.db.list().then(n=>{let e=o.a.difference(n,["_users","_replicator"]);Promise.all(e.map(function(n){return v.db.get(n).then(e=>{return v.use(n).get("description").then(t=>{let i={dname:n,size:e.doc_count};return t&&(i.descr=t),i}).catch(t=>({dname:n,size:e.doc_count}))})})).then(n=>{n=o.a.compact(n),n=o.a.filter(n,n=>n.descr&&n.descr.langs&&n.descr.langs.split(/,? /).includes(m.config.code)),b.set("dbinfos",n),function(n){let e=b.get("cfg")||[],t=b.get("lang")||"eng",i=e.map(n=>n.dname),r=o.a.uniq(i),a=d("#before-remote-table");if(!a)return;a.textContent="";let s=d("#table-remote");if(s)p(s);else{let n=["#remote-dicts",t].join("_"),e=d(n);s=function(){let n=c("table","dicts-table");n.id="table-remote";let e=c("tr","table-header");e.id="table-header-remote",n.appendChild(e);let t=c("td");t.textContent="dict's name",e.appendChild(t);let i=c("td");i.textContent="docs",e.appendChild(i);let o=c("td");o.textContent="langs",e.appendChild(o);let r=c("td");r.textContent="info",e.appendChild(r);let a=c("td");return a.textContent="synchronize!",e.appendChild(a),n}(),e.appendChild(s)}d("#remote-table-header");n.forEach(n=>{let e=c("tr");s.appendChild(e);let t=c("td");e.appendChild(t),t.textContent=n.descr.name;let i=c("td","dsize");i.textContent=n.size,e.appendChild(i);let o=c("td","dlang");o.textContent=n.descr.langs,e.appendChild(o);let a=c("td","dinfo");a.textContent="info",a.dataset.dinfo=n.dname,e.appendChild(a);let d=c("td","link");if(r.includes(n.dname)){let n=function(){let n=c("img","dict-check");return n.setAttribute("src","../resources/check.png"),n}();d.appendChild(n)}else d.textContent="sync";d.dataset.clone=n.dname,e.appendChild(d)})}(n)})})}var w=t(16),C=t.n(w);t(0).remote.require("electron-settings");const k=console.log;let L=d("#progress");function j(n){if(!n.pars)return;let e=d("#source"),t=d("#result");e&&t&&(p(e),p(t),n.pars.forEach(n=>{let t=function(n,e){let t=document.createElement("p");return t.textContent=n,e&&t.classList.add(e),t}();t.classList.add("par"),n.forEach(n=>{let e=l(n.text);n.lang?e.classList.add("active-form"):n.punct?e.classList.add("punct"):e.classList.add("space"),t.appendChild(e)}),e.appendChild(t)}))}function E(n){let e=c("div","dict-header"),t=l(n.dname,"dict-dname");e.appendChild(t);let i=l(n.rdict,"dict-rdict");if(e.appendChild(i),n.gends){let t=l(n.gends.toString(),"dict-gends");e.appendChild(t)}else if(n.term&&n.pos){let t=l(n.pos,"dict-pos");e.appendChild(t)}return e}function S(n){let e,t=n.fls||n.morphs;if(t){if("verb"==n.pos){let n=o.a.filter(t,n=>n.numper),i=o.a.filter(t,n=>n.numcase),r=o.a.filter(t,n=>!n.numcase&&!n.numper);if(e=n.map(n=>[n.tense,n.numper].join(" ")),i.length){let n=i.map(n=>[n.tense,[n.gend,n.numcase].join(".")].join(", "));e=e.concat(n)}if(r.length){let n=r.map(n=>n.tense);e=e.concat(n)}}else n.name&&n.gends?e=t.map(e=>[n.gends.toString(),e.numcase].join(".")):n.name?e=t.map(n=>[n.gend,n.numcase].join(".")):"pron"==n.pos?e=t.map(n=>[n.gend||"-",n.numcase].join(".")):"art"==n.pos?e=t.map(n=>[n.gend,n.numcase].join(".")):"adv"==n.pos?e=t.map(n=>n.degree):"part"==n.pos&&(e=t.map(n=>[n.gend,n.numcase].join(".")));return e}}function q(n){let e=c("ul","dict-fls");return n.forEach(n=>{let t=c("li");t.textContent=n,e.appendChild(t)}),e}function z(n){let e=c("ul","dict-trns");return n.trns||(n.trns=["no transtation in this dict article"]),n.trns.forEach(n=>{let t=c("li","dict-trns-li"),i=n.split(/, [A-Z]| [A-Z][^ ]*[0-9]/)[0],o=n.replace(i,"").split("(").join('<span class="grey">').split(")").join("</span>"),r=l("","is-hidden");r.innerHTML=o,r.classList.add("dict-trns-li-hidden"),t.innerHTML=i,t.appendChild(r),e.appendChild(t)}),e}r.ipcRenderer.on("query-result",function(n,e){L.classList.add("is-hidden"),function(n){p(d("#result")),n.terms&&(e=n.terms,k("Terms:",e),e.forEach(n=>{!function(n){let e=d("#result"),t=c("div","dict-div");e.appendChild(t);let i=c("div","dict-query");i.textContent=n.term,t.appendChild(i);let o=c("div","dict-container");t.appendChild(o);let r=E(n);o.appendChild(r);let a=S(n);if(a){let n=q(a);o.appendChild(n)}if(n.trns){let e=z(n);o.appendChild(e)}}(n)}));var e;n.chains&&(t=n.chains,t.forEach(n=>{let e=o.a.last(n);!function(n){let e=d("#result"),t=c("div","dict-div");e.appendChild(t);let i=c("div","dict-query");i.textContent=n.seg,t.appendChild(i),n.dicts.forEach(n=>{let e=c("div","dict-container");t.appendChild(e);let i=E(n);e.appendChild(i);let o=S(n);if(o){let n=q(o);e.appendChild(n)}if(n.trns){let t=z(n);e.appendChild(t)}})}(e)}));var t;n.chains||n.terms||k("NO RESULT")}(e)});const A=r.remote.app,R=(A.getAppPath(),A.getPath("userData"),console.log),T=(t(12),t(0).remote.require("electron-settings")),U=t(34),{getCurrentWindow:O}=(t(3),t(0).remote);let M,N,_=t(35).markdown,F=[],H=0;function D(){H<=0||((N=F[--H]).arrow=!0,B(N))}function I(){H>=F.length-1||((N=F[++H]).arrow=!0,B(N))}function P(n){const e=(t=".section",document.querySelectorAll(t));var t;Array.prototype.forEach.call(e,n=>{n.classList.add("is-hidden")});let i=["#",n.sec,"_",n.lang].join("");if(!n.lang)throw new Error("NO LANG!");d(i)||(i=["#",n.sec,"_",m.config.deflang].join("")),d(i)&&(d(i).classList.remove("is-hidden"),Z())}function B(n){if(P(n),n.arrow)n.arrow=!1;else{let e=o.a.clone(n);F.push(e),H=F.length-1}"main"==n.sec?(function(n){if(M)return;let e=T.get("split-sizes")||m.config.splitSizes;M=C()(["#source","#result"],{sizes:e,gutterSize:5,cursor:"col-resize",minSize:[0,0],onDragEnd:function(n){T.set("split-sizes",n),O().reload()}}),n.mono&&M.collapse(n.mono)}(n),j(n)):"remote-dicts"==n.sec?y():"db-info"==n.sec&&function(n){x("DINFOstate:",n);let e=b.get("dbinfos"),t=o.a.find(e,e=>e.dname==n.dname);x("DINFO:",t)}(n),d("#progress").classList.add("is-hidden"),T.set("state",n)}function Z(){d("#transcript").classList.add("is-hidden")}window.onbeforeunload=function(){let n=T.get("state");r.ipcRenderer.send("unload",n)},r.ipcRenderer.on("action",function(n,e){"goleft"==e?D():"goright"==e&&I()}),U.bind(["ctrl+1","ctrl+2"],function(n){}),U.bind(["esc"],function(n){Z()}),U.bind(["alt+left","alt+right"],function(n){37==n.which?D():39==n.which&&I()}),U.bind(["ctrl+p"],function(n){let e=d("span.active-form:hover");if(!e.classList.contains("active-form"))return;let t=["http://www.perseus.tufts.edu/hopper/morph?l=",e.textContent,"&la=greek#lexicon"].join("");r.shell.openExternal(t)}),U.bind(["ctrl+j"],function(n){let e=_.toHTML("Hello *World*!");R("START  MD",e)}),U.bind(["ctrl+d"],function(n){N.sec="help",B(N)}),U.bind(["ctrl+f"],function(n){N.sec="home",B(N)}),U.bind(["ctrl+="],function(n){let e=r.webFrame.getZoomFactor()+.1;r.webFrame.setZoomFactor(e)}),U.bind(["ctrl+-"],function(n){let e=r.webFrame.getZoomFactor()-.1;r.webFrame.setZoomFactor(e)}),U.bind(["ctrl+0"],function(n){r.webFrame.setZoomFactor(1)});const W=r.remote.Menu,$=r.remote.MenuItem,G=new $({label:"Cut",click:()=>{document.execCommand("cut")}}),Y=new $({label:"Copy",click:()=>{document.execCommand("copy")}}),J=new $({label:"Paste",click:()=>{document.execCommand("paste")}}),K=new W;K.append(Y);const V=new W;V.append(G),V.append(Y),V.append(J),document.addEventListener("contextmenu",n=>{switch(n.target.nodeName){case"TEXTAREA":case"INPUT":n.preventDefault(),V.popup(r.remote.getCurrentWindow());break;default:(()=>""!==window.getSelection().toString())()&&(n.preventDefault(),K.popup(r.remote.getCurrentWindow()))}},!1);const X=console.log,Q=(r.remote.app,t(12)),nn=t(0).remote.require("electron-settings"),en=t(36);!function(n){let e=d("#container");n.langs.forEach(t=>{n.pages.forEach(i=>{let o,r,a;try{o=g.resolve(__dirname,"../src/sections",t,[i,"md"].join(".")),r=h.readFileSync(o).toString(),a=u.render(r)}catch(e){o=g.resolve(__dirname,"../src/sections",n.deflang,[i,"md"].join(".")),r=h.readFileSync(o).toString(),a=u.render(r)}let s=c("div","section");s.id=[i,t].join("_"),s.setAttribute("lang",t),s.classList.add("is-hidden"),s.innerHTML=a,e.appendChild(s.cloneNode(!0))})})}(m.config);let tn=nn.get("state");tn&&tn.lang||(tn={sec:m.config.defstate,lang:m.config.deflang}),B(tn),r.ipcRenderer.on("section",function(n,e){tn.sec=e,B(tn)}),r.ipcRenderer.on("lang",function(n,e){tn.lang=e,nn.set("state",tn),r.ipcRenderer.send("lang",e),r.remote.getCurrentWindow().reload()}),Q.on("text-changed",()=>{let n=Q.readText(),e=s()(n,m.config.code);e&&(tn.sec="main",tn.pars=e,B(tn))}).startWatching();d("#progress"),d("#message");document.addEventListener("click",n=>{let e=n.target,t=e.dataset;if(e.classList.contains("external")){let n=e.textContent;r.shell.openExternal(n)}else if(e.classList.contains("dict-dname"))X("D-DNAME",e),tn.sec="dict-edit",B(tn);else if(e.classList.contains("dict-query")){let n=e.nextSibling;n&&n.classList.contains("is-hidden")?n.classList.remove("is-hidden"):n&&n.classList.add("is-hidden")}else if(e.classList.contains("dict-header")||e.classList.contains("dict-rdict")||e.classList.contains("dict-pos")||e.classList.contains("dict-gends")){let n=e.closest(".dict-container"),t=n.querySelector(".dict-fls"),i=n.querySelector(".dict-trns");t&&t.classList.contains("is-hidden")?t.classList.remove("is-hidden"):t&&t.classList.add("is-hidden"),i.classList.contains("is-hidden")?i.classList.remove("is-hidden"):i.classList.add("is-hidden")}else if(e.classList.contains("dict-trns-li")){let n=e.querySelector(".is-hidden");n?n.classList.remove("is-hidden"):(n=e.querySelector(".dict-trns-li-hidden")).classList.add("is-hidden")}if(t)if(t.href){d("#new-version").classList.add("is-hidden"),r.shell.openExternal(t.href)}else t.section&&(tn.sec=t.section,B(tn))}),document.addEventListener("mouseover",function(n){let e=n.target;e.textContent&&1!=n.ctrlKey&&e.classList.contains("active-form")&&1!=n.shiftKey&&function(n,e){L.classList.remove("is-hidden");let t={query:n.textContent.trim()};e&&(t.compound=!0),r.ipcRenderer.send("queryDBs",t)}(e)},!1),r.ipcRenderer.on("version",function(n,e){en.get("https://api.github.com/repos/mbykov/pecha.js/releases/latest").then(function(n){if(!n||!n.data)return;let t=n.data.name;if(e&&t&&t>e){let n=d("#new-version"),e=["new version available:",t].join(" ");n.textContent=e,n.classList.remove("is-hidden")}}).catch(function(n){console.log("API.GITHUB ERR")})}),document.addEventListener("wheel",function(n){!function(n){if(1==n.shiftKey)return;let e=n.deltaY>0?32:-32,t=d(".section:not(.is-hidden)");if(!t)return;t.offsetTop;t.scrollTop+=e,d("#result").scrollTop+=e,d("#source").scrollTop+=e}(n)},!1)}]);
//# sourceMappingURL=app.js.map