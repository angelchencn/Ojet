define(["./persistenceManager","./persistenceStoreManager","./persistenceUtils","./impl/logger","./impl/sql-where-parser.min"],function(a,b,c,d,e){"use strict";function f(a,b){return b=b||function(a){return h(a,null)},function(e,f){if("GET"==e.method||"HEAD"==e.method){d.log("Offline Persistence Toolkit queryHandlers: OracleRestQueryHandler processing request");var h,i,j=e.url.split("?"),l={};i="undefined"==typeof URLSearchParams?k(j[1]):new URLSearchParams(j[1]).entries();var m,n,o,p,q;do m=i.next(),null!=m.value&&(n=m.value[0],o=m.value[1],"q"==n?h=o:"limit"==n?p=o:"offset"==n&&(q=o));while(!m.done);var r,s,l=b(h);if(null!=f.jsonProcessor&&(r=f.jsonProcessor.shredder,s=f.jsonProcessor.unshredder),null!=r&&null!=s)return g(e,a,l,r,s,q,p).then(function(a){if(!a)return Promise.resolve();var b=a.clone();return b.text().then(function(b){if(null!=b&&b.length>0)try{var d=JSON.parse(b);return d.links?Promise.resolve(a):(d.links=[{rel:"self",href:e.url}],c.setResponsePayload(a,d).then(function(a){return Promise.resolve(a)}))}catch(a){}})})}return Promise.resolve()}}function g(d,e,f,g,h,i,j){return a.getCache().hasMatch(d,{ignoreSearch:!0}).then(function(k){return b.openStore(e).then(function(b){if(k)return a.getCache().match(d,{ignoreSearch:!0}).then(function(a){return"single"===a.headers.get("x-oracle-jscpt-resource-type")?Promise.resolve():b.find(f)});var c=m(d);return c?b.findByKey(c):Promise.resolve([])}).then(function(b){return a.getCache().match(d,{ignoreSearch:!0}).then(function(f){if(f){var k=!1,l=0;return b&&(l=b.length,i&&i>0&&(k=i<b.length,b=b.slice(i,b.length)),j&&j>0&&(k=j<=b.length,b=b.slice(0,j))),g(f).then(function(a){var d=a[0].resourceType,g={name:e,data:null!=b?b:a[0].data,resourceType:d};return h([g],f).then(function(a){var b=a.clone();return b.text().then(function(b){if(!(null!=b&&b.length>0))return a;try{var d=JSON.parse(b);return null!=d.items&&(j&&(d.limit=parseInt(j,10)),i&&(d.offset=parseInt(i,10)),d.hasMore=k,d.totalResults=l),c.setResponsePayload(a,d)}catch(a){}})})})}if(b&&Object.keys(b).length>0){var m=n(d);return m?c.requestToJSON(d).then(function(d){return d.url=m,c.requestFromJSON(d).then(function(c){return a.getCache().match(c,{ignoreSearch:!0}).then(function(a){if(a){var c={name:e,data:[b],resourceType:"single"};return h([c],a)}})})}):Promise.resolve()}return Promise.resolve()})})})}function h(a){var b={};if(a){var c,d=new e,f=a.split(";"),g={};for(c=0;c<f.length;c++)g=d.parse(f[c],function(a,b){a=a.toUpperCase(),"AND"!=a&&"OR"!=a&&(b[0]="value."+b[0]);var c=b[0],d=b[1],e={};switch(a){case">":e[c]={$gt:d};break;case"<":e[c]={$lt:d};break;case">=":e[c]={$gte:d};break;case"<=":e[c]={$lte:d};break;case"=":e[c]={$eq:d};break;case"!=":e[c]={$ne:d};break;case"AND":e={$and:b};break;case"OR":e={$or:b};break;case"LIKE":d=d.replace("%",".+"),e[c]={$regex:d};break;case"BETWEEN":var f=[];f[0]={},f[1]={},f[0][c]={$gte:b[1]},f[1][c]={$lte:b[2]},e={$and:f}}return e});Object.keys(g).length>0&&(b.selector=g)}return b}function i(a,b){return function(c,e){if("GET"==c.method||"HEAD"==c.method){d.log("Offline Persistence Toolkit queryHandlers: SimpleQueryHandler processing request");var f,h,i=c.url.split("?"),k=j(i,b);if(null!=e.jsonProcessor&&(f=e.jsonProcessor.shredder,h=e.jsonProcessor.unshredder),null!=f&&null!=h)return g(c,a,k,f,h)}return Promise.resolve()}}function j(a,b){var c={};if(a&&a.length>1){var d,e={};d="undefined"==typeof URLSearchParams?k(a[1]):new URLSearchParams(a[1]).entries();var f,g,h;do f=d.next(),null!=f.value&&(g=f.value[0],h=f.value[1],b&&b.indexOf(g)!=-1||(e["value."+g]=h));while(!f.done);Object.keys(e).length>0&&(c.selector=e)}return c}function k(a){var b=[];if(null!=a){"?"===a.charAt(0)&&(a=a.slice(1)),a=a||"";var c,d,e,f=a.split("&");b=f.map(function(a){return e=a.indexOf("="),e>-1?(c=a.slice(0,e),d=a.slice(e+1),d=l(d)):(c=a,d=""),c=l(c),[c,d]})}var g={next:function(){var a=b.shift();return{done:void 0===a,value:a}}};return g}function l(a){return decodeURIComponent(a.replace(/\+/g," "))}function m(a){var b=a.url.split("/");return b.length>1?b[b.length-1].split("?")[0]:null}function n(a){var b=a.url.split("/");return b.length>1?(b.pop(),b.join("/")):null}return{getSimpleQueryHandler:i,getOracleRestQueryHandler:f}});