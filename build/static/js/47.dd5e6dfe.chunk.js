/*! For license information please see 47.dd5e6dfe.chunk.js.LICENSE.txt */
(this.webpackJsonpzan=this.webpackJsonpzan||[]).push([[47,4],{261:function(t,e,r){},39:function(t,e,r){"use strict";r.d(e,"a",(function(){return s})),r.d(e,"d",(function(){return c})),r.d(e,"g",(function(){return f})),r.d(e,"h",(function(){return p})),r.d(e,"b",(function(){return v})),r.d(e,"f",(function(){return m})),r.d(e,"c",(function(){return u})),r.d(e,"e",(function(){return w}));var n=r(37);function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(S){s=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),c=new j(o||[]);return n(i,"_invoke",{value:k(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var h={};function p(){}function d(){}function v(){}var y={};s(y,i,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(_([])));g&&g!==e&&r.call(g,i)&&(y=g);var w=v.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return d.prototype=v,n(w,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:d,configurable:!0}),d.displayName=s(v,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),s(x.prototype,c,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),s(w,u,"Generator"),s(w,i,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function a(){return window.setupWebViewJavascriptBridge?new Promise((function(t,e){window.setupWebViewJavascriptBridge((function(e){t(e)}))})):null}var i=function(){var t=Object(n.a)(o().mark((function t(e){var r,n=arguments;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=n.length>1&&void 0!==n[1]?n[1]:{},window.JSBridge){t.next=7;break}return t.next=4,a();case 4:if(window.JSBridge=t.sent,window.JSBridge){t.next=7;break}return t.abrupt("return",null);case 7:return t.abrupt("return",new Promise((function(t,n){window.JSBridge.callHandler(e,r,(function(e){var r=e;"string"===typeof e&&e.length>0&&(r=JSON.parse(e)),t(r)}))})));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function c(){return navigator.userAgent.indexOf("app")>-1}function u(){var t=navigator.userAgent;return t.indexOf("Android")>-1||t.indexOf("Adr")>-1}function s(){return l.apply(this,arguments)}function l(){return(l=Object(n.a)(o().mark((function t(){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("getAccountInfo");case 2:return e=t.sent,t.abrupt("return",e||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function f(){return h.apply(this,arguments)}function h(){return(h=Object(n.a)(o().mark((function t(){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("shareWechat");case 2:return e=t.sent,t.abrupt("return",e||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function p(){return d.apply(this,arguments)}function d(){return(d=Object(n.a)(o().mark((function t(){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("shareWechatTimeline");case 2:return e=t.sent,t.abrupt("return",e||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(){return y.apply(this,arguments)}function y(){return(y=Object(n.a)(o().mark((function t(){var e;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("getShareURL");case 2:return e=t.sent,t.abrupt("return",e||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t){return g.apply(this,arguments)}function g(){return(g=Object(n.a)(o().mark((function t(e){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("openURL",{url:e});case 2:return r=t.sent,t.abrupt("return",r||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t){return b.apply(this,arguments)}function b(){return(b=Object(n.a)(o().mark((function t(e){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i("openCert",{type:e});case 2:return r=t.sent,t.abrupt("return",r||{});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},41:function(t,e,r){"use strict";var n=r(37),o=r(45),a=r.n(o),i=r(39);function c(){c=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(S){s=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),c=new j(o||[]);return n(i,"_invoke",{value:k(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var h={};function p(){}function d(){}function v(){}var y={};s(y,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(_([])));g&&g!==e&&r.call(g,a)&&(y=g);var w=v.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return d.prototype=v,n(w,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:d,configurable:!0}),d.displayName=s(v,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),s(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),s(w,u,"Generator"),s(w,a,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}var u={isLogin:function(){var t=Object(n.a)(c().mark((function t(){var e,r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!Object(i.d)()){t.next=6;break}return t.next=3,Object(i.a)();case 3:if(!t.sent){t.next=6;break}return t.abrupt("return",!0);case 6:return e=a.a.get("token"),r=a.a.get("userId"),t.abrupt("return",!(!e||!r));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),getToken:function(){return Object(n.a)(c().mark((function t(){var e,r,n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!Object(i.d)()){t.next=6;break}return t.next=3,Object(i.a)();case 3:if(!(e=t.sent)){t.next=6;break}return t.abrupt("return",e);case 6:return r=a.a.get("token"),n=a.a.get("userId"),t.abrupt("return",{token:r,uid:n});case 9:case"end":return t.stop()}}),t)})))()},removeUserinfo:function(){a.a.remove("token"),a.a.remove("userId")},setLoginCookie:function(t){a.a.set("token",t.token,{expires:7}),a.a.set("userId",t.id,{expires:7})},isPhoneNumber:function(t){return!!/^1[3456789]\d{9}$/.test(t)},getQueryParams:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),r=window.location.href,n=window.location.search?window.location.search.split("?")[1]:r.split("?")[1];if(!n)return"";var o=n.match(e);return null!=o?unescape(decodeURI(o[2])):null},priceFormat:function(t,e){var r=e?"+":"";return"--"===t?r+t:t?r+((-1!==t.toString().indexOf(".")?t.toLocaleString():t.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"))||"0.0"):r+"0.0"},copyToClip:function(t){var e=navigator.userAgent,r=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,n=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(r||!r&&!n){var o=document.createElement("textarea");o.style="position:absolute;top:-9999px;left:-9999px;",o.setAttribute("id","selector"),o.setAttribute("readonly","readonly"),o.innerHTML=t,document.body.appendChild(o),o.select(),document.execCommand("copy",!1,null)}if(n){var a=document.createElement("a");a.setAttribute("id","selector"),a.setAttribute("style","position:absolute;top:-9999px;left:-9999px;"),a.innerHTML=t,document.body.appendChild(a);var i=document.querySelectorAll("#selector"),c=document.createRange();c.selectNode(i[0]),window.getSelection().removeAllRanges(),window.getSelection().addRange(c),document.execCommand("copy")}var u=document.getElementById("selector");document.body.removeChild(u)},isYoTaApp:function(){return window.location.host.includes("yotajiaoyou")}};e.a=u},43:function(t,e,r){"use strict";e.a={inviteindex:"invite/index",inviteCode:"invite/invite_code",inviterecord:"invite/invite_log",getreward:"invite/get_reward",getTaskList:"task/lists",rewardTask:"task/reward",getSignList:"task/sign/lists",signin:"task/sign",myLevel:"level/index",rankingList:"rank/index",videoPrice:"user/video_price",walletDetail:"user_log/index",walletDetailNew:"user_log/indexNew",login:"postLogin",withdrawalInfo:"withdrawal_info",withdrawal:"withdrawal",smallWithdrawal:"smallWithdrawal",withdrawalLists:"withdrawal_lists",exchange:"exchange",bindAlipay:"bind_alipay",alipayInfo:"alipay_info",uploadSign:"upload/getUploadParams",rankIndex:"rank/index",updatePrice:"user/video_price/update",getVideoPrice:"user/video_price/get",midAutumnRank:"activity/midAutumn/rankInfo",getCashSettingList:"pay/cashSettingList",pay:"pay/index",payCheck:"pay/payCheck",getPayType:"pay/payType",sendSms:"login/sendSms",checkLogin:"captchaLogin",getActivityUserData:"activity/video/getActivityUserData",receiveRewards:"activity/video/receiveRewards",signData:"sign_data",signRemind:"sign_remind",getSignRemind:"get_sign_remind",getQiXiRankInfo:"activity/LoverActivity/rankInfo",getluckDrawPrize:"activity/midAutumn/getluckDrawPrize",luckDraw:"activity/midAutumn/luckDraw",getShuJiaRankingList:"activity/midAutumn/getShuJiaRankingList",getSummerWeekRank:"activity/ShuQiActivity/rankInfo",getFemaleNationalDayIncomeData:"activity/midAutumn/getFemaleNationalDayIncomeData",taskIncome:"task/income"}},435:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return d}));r(50);var n=r(51),o=(r(61),r(62)),a=(r(58),r(59)),i=r(7),c=r(8),u=r(10),s=r(9),l=r(0),f=r.n(l),h=(r(261),r(43)),p=r(44),d=(r(39),function(t){Object(u.a)(r,t);var e=Object(s.a)(r);function r(t){var n;return Object(i.a)(this,r),(n=e.call(this,t)).alert=function(t){a.a.alert("",t,[{text:"\u786e\u5b9a"}])},n.state={activeTab:1,today:[],yesterday:[]},n}return Object(c.a)(r,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getData",value:function(){var t=this;Object(p.a)(h.a.rankIndex,{type:"MALE"}).then((function(e){t.setState({today:e.today,yesterday:e.yesterday})})).catch((function(t){}))}},{key:"onBack",value:function(){this.props.history.goBack()}},{key:"changeTab",value:function(t){var e=this;t!==this.state.activeTab&&this.setState({activeTab:t},(function(){e.getData()}))}},{key:"openUserInfo",value:function(t){}},{key:"render",value:function(){var t=this,e=this.state,r=e.activeTab,a=e.today,i=e.yesterday,c=1===r?a[0]:i[0],u=1===r?a[1]:i[1],s=1===r?a[2]:i[2];return f.a.createElement("div",null,f.a.createElement("div",{className:"ranking-view"},f.a.createElement("div",{className:"tab"},f.a.createElement("div",{className:"view"},f.a.createElement("span",{onClick:function(){t.changeTab(1)},className:1===r?"left active":"left"},"\u4eca\u65e5\u5bcc\u8c6a"),f.a.createElement("span",{onClick:function(){t.changeTab(2)},className:2===r?"right active":"right"},"\u6628\u65e5\u5bcc\u8c6a"))),f.a.createElement("div",{className:"topview"},c&&f.a.createElement("div",{className:"top1"},f.a.createElement("div",{className:"imgview"},f.a.createElement("img",{src:c.head_image,alt:"",onClick:function(){t.openUserInfo(c.uid)}})),f.a.createElement("p",{className:"name"},c.nick_name),f.a.createElement("p",{className:"desc"},"\u8d21\u732e",c.score)),u&&f.a.createElement("div",{className:"top2"},f.a.createElement("div",{className:"imgview"},f.a.createElement("img",{src:u.head_image,alt:"",onClick:function(){t.openUserInfo(u.uid)}})),f.a.createElement("p",{className:"name"},u.nick_name),f.a.createElement("p",{className:"desc"},"\u8d21\u732e",u.score)),s&&f.a.createElement("div",{className:"top3"},f.a.createElement("div",{className:"imgview"},f.a.createElement("img",{src:s.head_image,alt:"",onClick:function(){t.openUserInfo(s.uid)}})),f.a.createElement("p",{className:"name"},s.nick_name),f.a.createElement("p",{className:"desc"},"\u8d21\u732e",s.score))),f.a.createElement(n.a,{size:"lg"},f.a.createElement("ul",{className:"list"},(1===r?a:i).map((function(e,r){return r<3?null:f.a.createElement("li",{key:r},f.a.createElement(o.a,null,f.a.createElement("span",{className:"pm"},r+1),f.a.createElement("img",{src:e.head_image,alt:"",onClick:function(){t.openUserInfo(e.uid)}}),f.a.createElement("span",{className:"name"},e.nick_name),f.a.createElement(o.a.Item,null,f.a.createElement("div",{className:"tr"},"\u8d21\u732e",e.score))))}))))))}}]),r}(f.a.Component))},44:function(t,e,r){"use strict";r.d(e,"b",(function(){return w})),r.d(e,"a",(function(){return b})),r.d(e,"c",(function(){return x}));var n=r(56),o=r(37),a=(r(55),r(41)),i=r(45),c=r.n(i),u=window.location.protocol,s=window.location.host,l=a.a.isYoTaApp()?"yotajiaoyou":"miyijiaoyou",f=s==="h5.".concat(l,".com"),h=s==="h5.staging.".concat(l,".com"),p={domain:f?"".concat(u,"//api.").concat(l,".com"):h?"".concat(u,"//api.staging.").concat(l,".com"):"".concat(u,"//api.dev.").concat(l,".com"),path:"/web/"},d=r(39);function v(){v=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(S){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),c=new j(o||[]);return n(i,"_invoke",{value:k(t,r,c)}),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=s;var f={};function h(){}function p(){}function d(){}var y={};u(y,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(_([])));g&&g!==e&&r.call(g,a)&&(y=g);var w=d.prototype=h.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,c){var u=l(t[o],t,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return p.prototype=d,n(w,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:p,configurable:!0}),p.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),u(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function y(t){var e,r="";for(e in t)r+="&"+e+"="+encodeURIComponent(t[e]);return r&&(r=r.slice(1)),r}function m(){c.a.remove("Authorization"),window.location.replace("/#/login?formUrl="+encodeURIComponent(window.location.href))}function g(t){for(var e in t)return!1;return!0}var w=function(){var t=Object(o.a)(v().mark((function t(e){var r,o,i,c,u=arguments;return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=u.length>1&&void 0!==u[1]?u[1]:{},t.next=3,Object(d.a)();case 3:return g(o=t.sent)&&(o=a.a.getToken()),i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object(n.a)(Object(n.a)({},r),o))},c=0===e.indexOf("http")?e:p.domain+p.path+e,t.next=9,fetch(c,i).then((function(t){if(t.ok)return t.json();var e=new Error(t.statusText);throw{err:e,message:"\u7f51\u7edc\u5f02\u5e38,\u8bf7\u7a0d\u540e\u91cd\u8bd5! \u9519\u8bef\u4ee3\u7801\uff1a"+e.desc}})).then((function(t){if(403===t.code)throw m(),{};if(t.access_token&&t.token_type&&t.expires_at)return a.a.setLoginCookie(t),{message:"\u767b\u5f55\u6210\u529f"};if(0===t.code)return t.data;throw t})).catch((function(t){throw{message:t?t.desc:"",code:t?t.code:""}}));case 9:return t.abrupt("return",t.sent);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=function(){var t=Object(o.a)(v().mark((function t(e){var r,o,i,c,u,s=arguments;return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=s.length>1&&void 0!==s[1]?s[1]:{},t.next=3,Object(d.a)();case 3:return g(o=t.sent)&&(o=a.a.getToken()),i={headers:{"Content-Type":"application/json"}},c=y(Object(n.a)(Object(n.a)({},r),o)),u=p.domain+p.path+e+"?"+c,t.next=10,fetch(u,i).then((function(t){if(t.ok)return t.json();var e=new Error(t.statusText);throw{err:e,message:"\u7f51\u7edc\u5f02\u5e38,\u8bf7\u7a0d\u540e\u91cd\u8bd5! \u9519\u8bef\u4ee3\u7801\uff1a"+e.desc,code:t.status}})).then((function(t){if(0===t.code)return t.data;throw t})).catch((function(t){throw{message:t.desc||"\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",code:t.code}}));case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),x=function(){var t=Object(o.a)(v().mark((function t(e,r){var n;return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"POST",body:r},t.next=4,fetch(e,n).then((function(t){if(t.ok)return{};throw{}})).catch((function(t){throw{message:"\u7f51\u7edc\u4e0d\u7ed9\u529b"}}));case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()}}]);