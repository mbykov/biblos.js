!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=37)}([function(e,n){e.exports=require("electron")},function(e,n){e.exports=require("lodash")},function(e,n,t){"use strict";t.r(n),t.d(n,"config",function(){return o});const o={code:"grc",pages:["home","main","remote-dicts","arrange-dicts","help","dict-edit"],defstate:"home",splitSizes:[50,50],langs:["eng","deu","rus"],deflang:"eng"}},function(e,n){e.exports=require("path")},function(e){e.exports={name:"development",description:"Add here any environment specific stuff you like."}},function(e,n){e.exports=require("util")},function(e,n){e.exports=require("debug")},function(e,n){e.exports=require("fs-extra")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.log=function(){"log"==h&&console.log.apply(console,arguments)},n.insp=function(){if("insp"!=h)return;var e=l.default.values(arguments);1===e.length&&(e=e[0]);console.log(u.inspect(e,!1,null,!0))},n.mood=n.voice=n.time=n.apicompats=n.augmods=n.augs=n.apiaugs=n.affixes=n.strongs=n.weaks=n.eaug=n.vowels=n.contrs=n.mutes=n.accents=void 0;var o,r,i,s,a,l=(o=t(1))&&o.__esModule?o:{default:o};function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=t(5),d=(c(r={oxia:"́",varia_:"`",varia:"̀",peris:"͂","":"",psili:"̓",dasia:"̔"},"",""),c(r,"ypo","ͅ"),c(r,"",""),r),p=d;n.accents=p;n.mutes=function(){return["ψ","ξ"]};var f={ew:["ε",d.oxia,"ω"].join(""),aw:["α",d.oxia,"ω"].join(""),ow:["ο",d.oxia,"ω"].join("")};n.contrs=f;n.vowels=["α","ε","ι","ο","ω","η","υ"];n.eaug="ε";var w=(c(i={"α":["η"],"αι":["ῃ"],"ανα":["ανε","ανη"],"αν":["ανε"],"απα":["απη"],"απαι":["απῃ"],"απε":["απει"],"απο":["απε","απω"],"αφαι":["αφῃ"],"αφο":["αφω"],"αρα":["ηρα"],"ε":["η"],"δια":["διε","διη"],"διε":["διη"],"διαι":["διῃ"],"εισε":["ειση"],"εκ":["εξε"],"εκρ":["εξερρ"],"εξα":["εξη"],"εξε":["εξη"],"εν":["ενε"],"επεν":["επενε"],"εμ":["ενε"],"επα":["επη"],"επαι":["επῃ"],"επι":["επε","επει"],"επε":["επι","επη"],"επο":["επω"],"ευα":["ευη"],"η":["ε"],"κατα":["κατε","κατη"],"κατοι":["κατῳ"],"μετα":["μετε"],"ο":["ω"],"οι":["ῳ"],"παρα":["παρε"],"παρε":["παρη"],"περι":["περιε"],"περιε":["περιη"],"προσ":["προσε"],"προσα":["προση"],"προσε":["προση","προσ"],"προ":["προε"],"ρ":["ερρ"],"συνε":["συνη","συνει","συγ","συλ","συμ"],"συλ":["συνε"],"συμ":["συνε"],"συσ":["συνε"],"συγ":["συνε"],"συνη":["συνα"],"υπα":["υπη"],"υπο":["υπε"],"":[""]},"",[""]),c(i,"",[""]),c(i,"",[""]),c(i,"",[""]),c(i,"",[""]),c(i,"",[""]),c(i,"",[""]),c(i,"",[""]),i);n.weaks=w;var g=(c(s={"η":"α","ω":"ο","ᾐ":"αι","":""},"",""),c(s,"",""),s);n.strongs=g;var b=(c(a={"διε":"δια","διῃ":"διαι","διη":"δια","διῳ":"διοι","εξε":"εκ","εξερρ":"εκρ","εξεκ":"εκ","":""},"",""),c(a,"",""),a);n.affixes=b;var m=[["α",d.psili].join(""),["α",d.dasia].join(""),["αι",d.psili].join(""),["αι",d.dasia].join(""),["αυ",d.psili].join(""),["αυ",d.dasia].join(""),["ε",d.psili].join(""),["ε",d.dasia].join(""),["ει",d.psili].join(""),["ει",d.dasia].join(""),["ευ",d.psili].join(""),["ευ",d.dasia].join(""),["ο",d.psili].join(""),["ο",d.dasia].join(""),["οι",d.psili].join(""),["οι",d.dasia].join(""),["ου",d.psili].join(""),["ου",d.dasia].join(""),["ι",d.psili].join(""),["ι",d.dasia].join(""),["υ",d.psili].join(""),["υ",d.dasia].join(""),["ω",d.psili].join(""),["ω",d.dasia].join(""),["η",d.psili].join(""),["η",d.psili,d.ypo].join(""),["η",d.dasia].join("")];n.apiaugs=m;n.augs={"X̓":"ἐ","ἀ":"ἀ ἠ","ἠ":"ἠ ἀ","ἡ":"ἡ","ὁ":"ὁ ὡ","ὡ":"ὁ ὡ","ᾐ":"αἰ"};n.augmods=["act.impf.ind","mp.impf.ind","act.aor.ind","mid.aor.ind","act.ppf.ind","mp.ppf.ind","pas.aor.ind"];n.apicompats=["act.pres.ind","act.fut.ind","act.impf.ind","mp.pres.ind","mp.impf.ind","act.pres.sub","mp.pres.sub","mp.pres.opt","act.pres.opt","act.pres.imp","mp.pres.imp","mid.fut.ind","act.fut.opt","mid.fut.opt","act.aor.ind","mid.aor.ind","act.aor.sub","mid.aor.sub","act.aor.opt","mid.aor.opt","act.aor.imp","mid.aor.imp","pas.aor.ind","pas.fut.ind","pas.fut.opt","pas.aor.sub","","",""];n.time=function(e){return e.split(".")[1]};n.voice=function(e){return e.split(".")[0]};n.mood=function(e){return e.split(".")[2]};var h=process.argv.slice(3)[0]},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setDBs=function(e,n){d("DBS",e),d("DBS",n),i=[],n.forEach(function(n,t){if("flex"!=n&&"terms"!=n){var o=c.resolve(e,"pouch",n),r=new u(o);r.dname=n,r.weight=t,i.push(r)}});var t=c.resolve(e,"pouch","flex");s=new u(t);var o=c.resolve(e,"pouch","terms");a=new u(o);var r=c.resolve(e,"pouch","comp");l=new u(r)},n.queryDBs=function(e){return Promise.all(i.map(function(n){return n.allDocs({keys:e,include_docs:!0}).then(function(e){if(!e||!e.rows)throw new Error("no dbn result");var t=r.default.compact(e.rows.map(function(e){return e.doc})),o=r.default.flatten(r.default.compact(t.map(function(e){return e.docs})));return o.length?(o.forEach(function(e){e.dname=n.dname,e.weight=n.weight}),o):[]}).catch(function(e){console.log("ERR GET DBs",e)})}))},n.getFlex=function(e){return s.allDocs({keys:e,include_docs:!0}).then(function(e){var n=r.default.compact(e.rows.map(function(e){return e.doc})),t=[];return n.forEach(function(e){e.docs.forEach(function(e){t.push(e)})}),t})},n.getTerm=function(e){return a.allDocs({keys:[e],include_docs:!0}).then(function(e){var n=r.default.compact(e.rows.map(function(e){return e.doc})),t=r.default.flatten(n.map(function(e){return e.docs}));return t.forEach(function(e){e.dname="term",e.weight=0}),t})},n.getComp=function(e){return l.allDocs({keys:e,include_docs:!0}).then(function(e){var n=r.default.compact(e.rows.map(function(e){return e.doc})),t=r.default.flatten(n.map(function(e){return e.docs}));return t.forEach(function(e){e.dname="comp",e.weight=100}),t})};var o,r=(o=t(1))&&o.__esModule?o:{default:o};t(17);var i,s,a,l,c=t(3),u=t(18),d=console.log},function(e,n){e.exports=require("electron-settings")},function(e,n){e.exports=require("orthos")},,function(e,n){e.exports=require("url")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.antrax=function(e,n){var t=f(e);t=t.replace(/-/g,"");var u=(0,s.segmenter)(t),w=o.default.uniq(u.map(function(e){return e[e.length-1]})),g=o.default.uniq(o.default.flatten(u.map(function(e){return e.slice(0,-1)}))),b=o.default.uniq(o.default.compact(g.map(function(e){return(0,c.plain)(e)}))),m=function(e){var n,t,i=[];return e.forEach(function(e){t=o.default.first(e),n=(0,c.plain)(e);var s=l.strong2weak[t];if(r.vowels.includes(t))s&&s.forEach(function(n){var t=[n,e.slice(1)].join("");i.push(t)});else{var a=["ε",n].join("");i.push(a)}}),o.default.uniq(i)}(b),h=m.length?o.default.uniq(b.concat(m)):b;return d("cwf:",t),d("lasts:",w.toString()),d("plainsegs:",h.toString()),Promise.all([(0,i.getTerm)(t),(0,i.queryDBs)(h),(0,i.getFlex)(w),(0,i.getComp)(h)]).then(function(e){var i=o.default.flatten(e[0]),s=o.default.flatten(e[1]);n&&(s=o.default.filter(s,function(e){return(0,c.plain)(f(e.rdict)).length!=(0,c.plain)(t).length})),o.default.filter(s,function(e){return(0,c.plain)(f(e.rdict))==(0,c.plain)(t)});var w=o.default.filter(s,function(e){return e.term});i=i.concat(w),s=o.default.filter(s,function(e){return!e.term});var g=o.default.flatten(e[3]);s=s.concat(g);var m=o.default.flatten(e[2]);s=o.default.filter(s,function(e){return!e.indecl});var v=o.default.uniq(s.map(function(e){return e.plain}));d("dplains----\x3e",v.toString()),d("dicts----\x3e",s.length);var k=o.default.uniq(g.map(function(e){return e.plain}));d("complains----\x3e",k.toString()),d("complains----\x3e",k.length);var W=o.default.filter(s,function(e){return"χαλκ"==e.plain});W.length&&(d("kdicts----\x3e",W.length),s=W),d("flexes---\x3e",m.length);var y=o.default.filter(m,function(e){return"ός-οῦ"==e.key});d("kflexes---\x3e",y.length);var C=function(e,n,t,i,s,u){var f=function(e,n){var t={};return e.forEach(function(e){var r=o.default.filter(n,function(n){return e===n.plain});t[e]=r}),t}(n,u),w=function(e,n,t){var r=[];return e.forEach(function(e){var i=o.default.last(e),s=o.default.filter(t,function(e){return e.term===i});if(s.length){var a=e.slice(0,-1),l=0,u=[];a.forEach(function(e,t){var r,i,s,d,p,f=(0,c.plain)(e),w=n[f],g=[];t?t<a.length-1?(d=o.default.filter(w,function(e){return e.comp||e.name}),i=o.default.filter(w,function(e){return e.comp}),s=o.default.filter(w,function(e){return e.connector}),i.length&&(l+=1),s.length&&(l+=1),g=g.concat(d)):t==a.length-1&&(p=o.default.filter(w,function(e){return e.comp||e.name||e.verb}),(i=o.default.filter(w,function(e){return e.comp})).length&&(l+=1),g=g.concat(p)):(r=o.default.filter(w,function(e){return e.pref||e.name||e.comp&&e.header}),(i=o.default.filter(w,function(e){return e.comp&&e.header})).length&&(l+=1),g=g.concat(r));var b={seg:e,dicts:g,weight:l};u.push(b)}),u.push({seg:i,flexes:s}),r.push(u)}}),r}(t,f,s);d("total chains",w.length),function(e,n,t){e.forEach(function(e){var i=e[e.length-2];i.dicts||d("NO SDICTS",e);var s=i.seg;s=(0,c.plain)(s);var a=o.default.first(s),u=o.default.clone(i.dicts),f=l.strong2weak[a];if(r.vowels.includes(a)){if("ε"==a){if(s.length<2)return;var w=s.slice(1);p(n,t,u,w,"sliced")}else if("η"==a){if(s.length<2)return;var g=s.slice(1);p(n,t,u,g,"sliced")}}else{var b=["ε",s].join("");p(n,t,u,b,"added")}f&&f.forEach(function(e){var o=s.slice(1),r=[e,o].join("");p(n,t,u,r,"sliced")}),i.dicts=o.default.compact(o.default.flatten(u))})}(w,i,f);var g=function(e){var n=[];return e.forEach(function(e){var t=!0;e.slice(0,-1).forEach(function(e){e.dicts.length||(t=!1)}),t&&n.push(e)}),n}(w);d("chains: ",w.length,"fulls: ",g.length),g.length&&(w=g);var b=function(e){var n=[];return e.forEach(function(e){var t=o.default.last(e),r=t.seg,i=t.flexes,s=e.slice(0,-2),l=e.slice(-2,-1)[0],c=[l.seg,"+",r].join(""),u=o.default.filter(l.dicts,function(e){return e.name}),d=o.default.filter(i,function(e){return e.name}),p=(o.default.filter(i,function(e){return e.name}),o.default.filter(i,function(e){return e.adv}),[]),f=(0,a.parseName)(u,d);if(p=p.concat(f),(p=o.default.compact(p)).length){var w={seg:c,dicts:p,weight:l.weight};s.push(w),n.push(s)}}),n}(w);d("dfchains => ",b);var m=function(e){var n=o.default.min(e.map(function(e){return e.length})),t=o.default.filter(e,function(e){return e.length==n}),r=o.default.max(t.map(function(e){return o.default.sum(e.map(function(e){return e.weight}))}));return o.default.filter(t,function(e){return o.default.sum(e.map(function(e){return e.weight}))==r})}(b);return d("bests =>",m),d("bests =>",m.length),m}(0,h,u,b,m,s);if(!n&&C.length>1)throw new Error("TOO MANY BESTS!");var B={};return n&&(B.compound=!0),n?B.chains=C:B.dicts=C[0],B})};var o=u(t(1)),r=t(8),i=t(9),s=t(19),a=t(20),l=t(22),c=(u(t(5)),t(11));function u(e){return e&&e.__esModule?e:{default:e}}console.log;var d=t(6)("app");process.argv.slice(2)[0];function p(e,n,t,r,i){var s=n[r];(s=o.default.filter(s,function(e){return e.verb}))&&s.length&&(s.forEach(function(e){e[i]=!0}),t.push(s))}function f(e){var n=e.trim().replace(/ᾰ/gi,"α").replace(/ᾱ/gi,"α").replace(/ῑ/gi,"ι").replace(/ῐ/gi,"ι").replace(/ῠ/gi,"υ").replace(/ῡ/gi,"υ").replace(/Ῐ/gi,"Ι").replace(/Ῑ/gi,"Ι").replace(/̆/gi,""),t=(0,c.comb)(n);return(0,c.oxia)(t)}},,,function(e,n){e.exports=require("copy-dir")},function(e,n){e.exports=require("pouchdb")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.segmenter=function(e){var n=e,t=[];return function e(o,r){var a=s(o);a.forEach(function(o){r.push(o.head),r.push(o.tail),r.join("")==n&&(t.push(i.default.clone(r)),r.pop()),r.length<3&&e(o.tail,r),r.pop()})}(e,[]),t},n.scrape=s;var o,r=t(8),i=(o=t(1))&&o.__esModule?o:{default:o};r.vowels,(0,r.mutes)();function s(e){e.length;for(var n,t,o=[],s=e,a=e.length;a>0;)if(a--,t=e.slice(a),(s=e.substr(0,a))&&(n=t[0],!i.default.values(r.accents).includes(n))){var l={head:s,tail:t};o.push(l)}return o}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.parseVerb=function(e,n,t){return[]},n.parseName=function(e,n){var t=[];i.default.filter(e,function(e){return e.name}),i.default.filter(n,function(e){return e.name});return e.forEach(function(e){if(e.added||e.sliced)return!1;"χαλκ"==e.plain&&(0,r.log)("NAME-d ===========================>>>",e.plain,e.rdict,e.keys);var o=i.default.filter(n,function(n){if(!e.keys)return!1;if(e.adj){if(!n.ends)return!1;if(e.ends!=n.ends)return!1;if(e.keys[0]&&!e.keys[0].split("-").includes(n.key.split("-")[0]))return!1}else{if(n.ends)return!1;if(e.gends&&!e.gends.includes(n.gend))return!1;if(!e.keys.includes(n.key))return!1}return!0});o.length&&("χαλκ"==e.plain&&(0,r.log)("NAME-flex.size ===========================>>>",o.length),o.map(function(e){return{numcase:e.numcase,gend:e.gend}}),e.fls=o,t.push(e))}),t};var o,r=t(8),i=(o=t(1))&&o.__esModule?o:{default:o};t(21),t(11);t(6)("app"),console.log},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.verbkeys=void 0;var o={};n.verbkeys=o,o["έω-έομαι"]={},o["έω-έομαι"].vkeys={pres:["έω-έομαι","ῶ-οῦμαι"],impf:["εον-εόμην","ουν-ούμην"],fut:["ήσω-ήσομαι-ηθήσομαι"],aor:["ησα-ησάμην-ήθην"]},o["έω-έομαι"].pkeys={pres:["έων-έουσα-έον","ῶν-οῦσα-οῦν"],impf:[],fut:["ήσων-ήσουσα-ῆσον"],aor:["ήσας-ήσασα-ῆσαν"]},o["έω-έομαι"].ikeys={pres:["έειν-έεσθαι","εῖν-εῖσθαι"],impf:[],fut:["ήσειν-ήσεσθαι-ηθήσεσθαι"],aor:["ῆσαι-ήσασθαι-ηθῆναι"]},o["άω-άομαι"]={},o["άω-άομαι"].vkeys={pres:["άω-άομαι","ῶ-ῶμαι"],impf:["αον-αόμην","ων-ώμην"],fut:["ήσω-ήσομαι-ηθήσομαι"],aor:["ησα-ησάμην-ήθην"],pf:["ηκα"],ppf:["ήκειν"]},o["άω-άομαι"].pkeys={pres:["άων-άουσα-άον","ῶν-ῶσα-ῶν"],impf:[],fut:["ήσων-ήσουσα-ῆσον"],aor:["ήσας-ήσασα-ῆσαν"],pf:["ηκώς-ηκυῖα-ηκός"],ppf:[]},o["άω-άομαι"].ikeys={pres:["άειν-άεσθαι","ᾶν-ᾶσθαι"],impf:[],fut:["ήσειν-ήσεσθαι-ηθήσεσθαι"],aor:["ῆσαι-ήσασθαι-ηθῆναι"],pf:["ηκέναι"],ppf:[]},o["όω-οῦμαι"]={},o["όω-οῦμαι"].vkeys={pres:["ῶ-οῦμαι"],impf:["ουν-ούμην"],fut:["ώσω-ώσομαι-ωθησήσομαι"],aor:["ωσα-ωσάμην-ώθην","ωσα-ωσάμην-ώθην"],pf:["ωκα-ωμαι"],ppf:["ώκειν-ώμην"]},o["όω-οῦμαι"].pkeys={pres:["ῶν-οῦσα-οῦν"],impf:[],fut:["ώσων-ώσουσα-ῶσον"],aor:["ώσας-ώσασα-ῶσαν"],pf:["ωκώς-ωκυῖα-ωκός"],ppf:[]},o["όω-οῦμαι"].ikeys={pres:["οῦν-οῦσθαι"],impf:[],fut:["ώσειν-ώσεσθαι-ωθησήσεσθαι"],aor:["ῶσαι-ώσασθαι-ωθῆναι"],pf:["ωκέναι-ῶσθαι"],ppf:[]},o["ω-ομαι"]={},o["ω-ομαι"].vkeys={pres:["ω-ομαι"],impf:["ον-όμην"],fut:["σω-σομαι"],aor:["σα-σάμην-θην"],pf:["κα-μαι"]},o["ω-ομαι"].pkeys={pres:["ων-ουσα-ον"],impf:[],fut:["σων-σουσα-σον"],aor:["σας-σασα-σαν"],pf:["κώς-κυῖα-κός"]},o["ω-ομαι"].ikeys={pres:["ειν-εσθαι"],impf:[],fut:["σειν"],aor:["σαι-σασθαι-θῆναι"],pf:["κέναι-σθαι"]},o["ημι-εμαι"]={},o["ημι-εμαι"].vkeys={pres:["ημι-εμαι","ημι-αμαι"],impf:["ην-έμην","ην-έμην","ην-άμην"]},o["ημι-εμαι"].pkeys={pres:["είς-εῖσα-έν","άς-ᾶσα-άν"],impf:[]},o["ημι-εμαι"].ikeys={pres:["έναι-εσθαι","άναι-ασθαι"],impf:[]}},function(e,n,t){"use strict";var o,r;function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0}),n.augments_=n.strong2weak=void 0;var s=(i(o={"η":["α","ε","αι"],"":[""]},"",[""]),i(o,"",[""]),o);n.strong2weak=s;var a=(i(r={"α":["η"],"αι":["ῃ"],"ανα":["ανε","ανη"],"αν":["ανε"],"απα":["απη"],"απαι":["απῃ"],"απε":["απει"],"απο":["απε","απω"],"αφαι":["αφῃ"],"αφο":["αφω"],"αρα":["ηρα"],"ε":["η"],"δια":["διε","διη"],"διε":["διη"],"διαι":["διῃ"],"εισε":["ειση"],"εκ":["εξε"],"εξα":["εξη"],"εξε":["εξη"],"εν":["ενε"],"επεν":["επενε"],"εμ":["ενε"],"επα":["επη"],"επαι":["επῃ"],"επι":["επε","επει"],"επε":["επι","επη"],"επο":["επω"],"ευα":["ευη"],"η":["ε"],"κατα":["κατε","κατη"],"κατοι":["κατῳ"],"μετα":["μετε"],"ο":["ω"],"οι":["ῳ"],"παρα":["παρε"],"παρε":["παρη"],"περι":["περιε"],"περιε":["περιη"],"προσ":["προσε"],"προσα":["προση"],"προσε":["προση","προσ"],"προ":["προε"],"ρ":["ερρ"],"συνε":["συνη","συνει","συμ"],"συλ":["συνε"],"συμ":["συνε"],"συσ":["συνε"],"συγ":["συνε"],"συνα":["συνη"],"υπα":["υπη"],"υπο":["υπε"],"":[""]},"",[""]),i(r,"",[""]),i(r,"",[""]),i(r,"",[""]),i(r,"",[""]),i(r,"",[""]),i(r,"",[""]),i(r,"",[""]),r);n.augments_=a},function(e){e.exports={name:"a-template",productName:"Electron Boilerplate",description:"Starter for my Electron application",version:"1.0.0",private:!0,author:"M. Bykov <m.bykov@gmail.com>",copyright:"© 2017- 2019, M.Bykov",homepage:"http://diglossa.org",main:"app/background.js",build:{appId:"com.example.electron-boilerplate",files:["app/**/*","node_modules/**/*","package.json"],directories:{buildResources:"resources"},publish:null},scripts:{postinstall:"electron-builder install-app-deps",preunit:"webpack --config=build/webpack.unit.config.js --env=test --display=none",unit:"electron-mocha temp/specs.js --renderer --require source-map-support/register",pree2e:"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",e2e:"mocha temp/e2e.js --require source-map-support/register",test:"npm run unit && npm run e2e",start:"node build/start.js",release:"npm test && webpack --config=build/webpack.app.config.js --env=production && electron-builder"},dependencies:{axios:"^0.18.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","file-loader":"^3.0.1","fs-extra":"^7.0.1",loigos:"^0.1.0",markdown:"^0.5.0","markdown-it":"^8.4.2","markdown-it-attrs":"^2.3.2",mousetrap:"^1.6.3",nano:"^8.0.1",pug:"^2.0.3",showdown:"^1.9.0","speckled-band":"^2.0.0","split.js":"^1.5.10"},devDependencies:{"@babel/core":"^7.4.0","@babel/preset-env":"^7.4.2","babel-loader":"^8.0.5","babel-plugin-transform-object-rest-spread":"^6.26.0",chai:"^4.2.0","css-loader":"^2.1.1",electron:"4.1.1","electron-builder":"^20.39.0","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0",mocha:"^5.2.0","source-map-support":"^0.5.9",spectron:"^5.0.0","style-loader":"^0.23.1",webpack:"^4.29.6","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2"}}},,,,,,,,,,,,,,function(e,n,t){"use strict";t.r(n);var o=t(3),r=t.n(o),i=t(13),s=t.n(i),a=t(0);const l={label:"<--",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","goleft")}},c={label:"--\x3e",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","goright")}},u=t(3),d=t(0),p=t(7);let f,w=d.app?d.app:d.remote.app,g=(console.log,w.getAppPath()),b={};const m=t(10);function h(e){let n=m.get("lang")||"eng";if(!b[n]){let e=n+".js",t=u.resolve(g,"src/locales",e);if(p.pathExistsSync(t))f=p.readJsonSync(t);else{let e=u.resolve(g,"src/locales/eng.js");f=p.readJsonSync(e)}b[n]=f}let t=k(e);return v(b[n][t])||v(e)}const v=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1),k=e=>"string"!=typeof e?"":e.charAt(0).toLowerCase()+e.slice(1);console.log;const W={label:"ENG",submenu:[{label:"DEU",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},y={label:"DEU",submenu:[{label:"ENG",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"RUS",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},C={label:"RUS",submenu:[{label:"DEU",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"ENG",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"TIB",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}},{label:"ZHO",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},B={label:"ZHO",submenu:[{label:"ENG",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"TIB",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","tib")}}]},j={label:"TIB",submenu:[{label:"ENG",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","eng")}},{label:"DEU",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","deu")}},{label:"RUS",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","rus")}},{label:"ZHO",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("lang","zho")}}]},x=t(0).Menu;t(2),console.log;var F=t(14),E=t(9);const _=console.log;let O=r.a.resolve(process.env.HOME,".config/MorpheusGreek (development)");Object(E.setDBs)(O,["lsjn"]),a.ipcMain.on("queryDBs",(e,n)=>{Object(F.antrax)(n.query).then(e=>{a.BrowserWindow.getFocusedWindow().webContents.send("query-result",e)}).catch(function(e){console.log("ANTRAX-ERR",e)})});var D=t(4);const S=t(10);console.log,t(2);if(_("testing..."),"production"!==D.name){const e=a.app.getPath("userData");a.app.setPath("userData",`${e} (${D.name})`)}a.app.on("ready",()=>{!function(e){const n=[l,c,{label:"File",submenu:[{label:h("home"),accelerator:"CmdOrCtrl+L",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","home")}},{label:h("Quit"),accelerator:"CmdOrCtrl+Q",click:()=>{a.app.quit()}}]},{label:h("dictionary"),submenu:[{label:h("Arrange local dicts"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","arrange-dicts")}},{label:h("Clone from server"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","remote-dicts")}},{label:h("Import form CSV"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","csv")}},{label:h("Create CSV from texts"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","localdict")}},{label:h("Publish dictionary"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","publish")}},{label:h("Reread the source"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","reread-dict")}},{label:h("Cleanup DBs completely"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","cleanup")}}]},{label:h("Book"),submenu:[{label:h("Import from ODS"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("parseOds")}},{label:h("Import from file"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("parseDir")}},{type:"separator"},{label:h("Clone from Github"),enabled:!1,click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","cloneGithub")}},{label:h("Publish book"),enabled:!1,click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","publish")}},{type:"separator"},{label:h("Export to TXT"),enabled:!1,click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","exportTXT")}},{label:h("Export to PDF"),enabled:!1,click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","exportPDF")}},{label:h("Export to HTML"),enabled:!1,click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","exportHTML")}},{type:"separator"},{label:h("Create dictionary for book"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","createDict")}},{type:"separator"},{label:h("Reread the source"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","reread-book")}},{label:h("Cleanup DBs completely"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("action","cleanup")}},{type:"separator"}]},{label:h("About"),submenu:[{label:h("About"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","about")}},{label:h("code and download"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","code")}},{label:h("License"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","license")}},{label:h("Contacts"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","contacts")}},{label:h("Acknowledgements"),click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","acknowledgements")}}]},{label:h("Help"),submenu:[{label:h("hot keys"),accelerator:"Shift+CmdOrCtrl+H",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.send("section","help")}},{label:"Reload",accelerator:"Shift+CmdOrCtrl+R",click:()=>{a.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()}},{label:h("Toggle devTools"),accelerator:"Alt+CmdOrCtrl+I",click:()=>{a.BrowserWindow.getFocusedWindow().toggleDevTools()}}]}];switch(e){case"eng":n.push(W);break;case"deu":n.push(y);break;case"rus":n.push(C);break;case"tib":n.push(j);break;case"zho":n.push(B);break;default:n.push(W)}x.setApplicationMenu(x.buildFromTemplate(n))}();const e=new a.BrowserWindow({webPreferences:{nodeIntegration:!0}});let n=S.get("winBounds")||e.getBounds();n.y-=21,e.setBounds(n),e.loadURL(s.a.format({pathname:r.a.join(__dirname,"app.html"),protocol:"file:",slashes:!0})),"development"===D.name&&e.openDevTools(),e.webContents.on("did-finish-load",()=>{let n=t(23),o=n.name,r=n.version;e.webContents.send("version",r),e.setTitle([o,"v.",r].join(" "))}),e.on("resize",function(){e.webContents.send("reload")}),e.on("close",()=>{S.set("winBounds",e.getBounds())})}),a.ipcMain.on("unload",(e,n)=>{S.set("state",n)}),a.app.on("window-all-closed",()=>{a.app.quit()})}]);
//# sourceMappingURL=background.js.map