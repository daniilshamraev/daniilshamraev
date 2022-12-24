(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function t(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(l){if(l.ep)return;l.ep=!0;const o=t(l);fetch(l.href,o)}})();const y={};let M=P;const m=1,w=2,F={owned:null,cleanups:null,context:null,owner:null};var a=null;let g=null,u=null,h=null,N=0;function _(e,s){const t=a,i=e.length===0,l=i?F:{owned:null,cleanups:null,context:null,owner:s||t},o=i?e:()=>e(()=>T(()=>B(l)));a=l;try{return v(o,!0)}finally{a=t}}function C(e,s,t){const i=G(e,s,!1,m);O(i)}function T(e){try{return e()}finally{}}function J(e,s,t){let i=e.value;return(!e.comparator||!e.comparator(i,s))&&(e.value=s,e.observers&&e.observers.length&&v(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l],f=g&&g.running;f&&g.disposed.has(o),(f&&!o.tState||!f&&!o.state)&&(o.pure?u.push(o):h.push(o),o.observers&&R(o)),f||(o.state=m)}if(u.length>1e6)throw u=[],new Error},!1)),s}function O(e){if(!e.fn)return;B(e);const s=a,t=N;a=e,q(e,e.value,t),a=s}function q(e,s,t){let i;try{i=e.fn(s)}catch(l){e.pure&&(e.state=m),j(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?J(e,i):e.value=i,e.updatedAt=t)}function G(e,s,t,i=m,l){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:a,context:null,pure:t};return a===null||a!==F&&(a.owned?a.owned.push(o):a.owned=[o]),o}function U(e){const s=g;if(e.state===0||s)return;if(e.state===w||s)return S(e);if(e.suspense&&T(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<N);)(e.state||s)&&t.push(e);for(let i=t.length-1;i>=0;i--)if(e=t[i],e.state===m||s)O(e);else if(e.state===w||s){const l=u;u=null,v(()=>S(e,t[0]),!1),u=l}}function v(e,s){if(u)return e();let t=!1;s||(u=[]),h?t=!0:h=[],N++;try{const i=e();return H(t),i}catch(i){u||(h=null),j(i)}}function H(e){if(u&&(P(u),u=null),e)return;const s=h;h=null,s.length&&v(()=>M(s),!1)}function P(e){for(let s=0;s<e.length;s++)U(e[s])}function S(e,s){const t=g;e.state=0;for(let i=0;i<e.sources.length;i+=1){const l=e.sources[i];l.sources&&(l.state===m||t?l!==s&&U(l):(l.state===w||t)&&S(l,s))}}function R(e){const s=g;for(let t=0;t<e.observers.length;t+=1){const i=e.observers[t];(!i.state||s)&&(i.state=w,i.pure?u.push(i):h.push(i),i.observers&&R(i))}}function B(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const o=l.pop(),f=t.observerSlots.pop();i<l.length&&(o.sourceSlots[f]=i,l[i]=o,t.observerSlots[i]=f)}}if(e.owned){for(s=0;s<e.owned.length;s++)B(e.owned[s]);e.owned=null}if(e.cleanups){for(s=0;s<e.cleanups.length;s++)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function K(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function j(e){throw e=K(e),e}function Q(e,s){return T(()=>e(s||{}))}function V(e,s,t){let i=t.length,l=s.length,o=i,f=0,n=0,r=s[l-1].nextSibling,c=null;for(;f<l||n<o;){if(s[f]===t[n]){f++,n++;continue}for(;s[l-1]===t[o-1];)l--,o--;if(l===f){const d=o<i?n?t[n-1].nextSibling:t[o-n]:r;for(;n<o;)e.insertBefore(t[n++],d)}else if(o===n)for(;f<l;)(!c||!c.has(s[f]))&&s[f].remove(),f++;else if(s[f]===t[o-1]&&t[n]===s[l-1]){const d=s[--l].nextSibling;e.insertBefore(t[n++],s[f++].nextSibling),e.insertBefore(t[--o],d),s[l]=t[o]}else{if(!c){c=new Map;let p=n;for(;p<o;)c.set(t[p],p++)}const d=c.get(s[f]);if(d!=null)if(n<d&&d<o){let p=f,A=1,L;for(;++p<l&&p<o&&!((L=c.get(s[p]))==null||L!==d+A);)A++;if(A>d-n){const I=s[f];for(;n<d;)e.insertBefore(t[n++],I)}else e.replaceChild(t[n++],s[f++])}else f++;else s[f++].remove()}}}function W(e,s,t,i={}){let l;return _(o=>{l=o,s===document?e():X(s,e(),s.firstChild?null:void 0,t)},i.owner),()=>{l(),s.textContent=""}}function $(e,s,t){const i=document.createElement("template");i.innerHTML=e;let l=i.content.firstChild;return t&&(l=l.firstChild),l}function X(e,s,t,i){if(t!==void 0&&!i&&(i=[]),typeof s!="function")return b(e,s,i,t);C(l=>b(e,s(),l,t),i)}function b(e,s,t,i,l){for(y.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(s===t)return t;const o=typeof s,f=i!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(y.context)return t;if(o==="number"&&(s=s.toString()),f){let n=t[0];n&&n.nodeType===3?n.data=s:n=document.createTextNode(s),t=x(e,t,i,n)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s}else if(s==null||o==="boolean"){if(y.context)return t;t=x(e,t,i)}else{if(o==="function")return C(()=>{let n=s();for(;typeof n=="function";)n=n();t=b(e,n,t,i)}),()=>t;if(Array.isArray(s)){const n=[],r=t&&Array.isArray(t);if(E(n,s,t,l))return C(()=>t=b(e,n,t,i,!0)),()=>t;if(y.context){if(!n.length)return t;for(let c=0;c<n.length;c++)if(n[c].parentNode)return t=n}if(n.length===0){if(t=x(e,t,i),f)return t}else r?t.length===0?D(e,n,i):V(e,t,n):(t&&x(e),D(e,n));t=n}else if(s instanceof Node){if(y.context&&s.parentNode)return t=f?[s]:s;if(Array.isArray(t)){if(f)return t=x(e,t,i,s);x(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}}return t}function E(e,s,t,i){let l=!1;for(let o=0,f=s.length;o<f;o++){let n=s[o],r=t&&t[o];if(n instanceof Node)e.push(n);else if(!(n==null||n===!0||n===!1))if(Array.isArray(n))l=E(e,n,r)||l;else if(typeof n=="function")if(i){for(;typeof n=="function";)n=n();l=E(e,Array.isArray(n)?n:[n],Array.isArray(r)?r:[r])||l}else e.push(n),l=!0;else{const c=String(n);r&&r.nodeType===3&&r.data===c?e.push(r):e.push(document.createTextNode(c))}}return l}function D(e,s,t=null){for(let i=0,l=s.length;i<l;i++)e.insertBefore(s[i],t)}function x(e,s,t,i){if(t===void 0)return e.textContent="";const l=i||document.createTextNode("");if(s.length){let o=!1;for(let f=s.length-1;f>=0;f--){const n=s[f];if(l!==n){const r=n.parentNode===e;!o&&!f?r?e.replaceChild(l,n):e.insertBefore(l,t):r&&n.remove()}else o=!0}}else e.insertBefore(l,t);return[l]}const Y=$('<div><nav><h2 class=" text-center text-white py-3 top-0 w-screen bg-white bg-opacity-20 backdrop-blur-lg fixed text-xl z-50">Daniil Shamraev</h2></nav><header class="h-screen w-screen flex"><div class="stars"></div><div class="mx-auto my-auto"><h1 class="lg:max-2xl:text-7xl md:text-5xl text-5xl fixed inset-x-4 inset-y-1/3 md:w-3/5 w-1/2 font-extrabold text-gray-50">\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u0435 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 <br> <code class="type-header whitespace-pre-wrap txt-gr"></code></h1></div></header><section class="first-s relative z-10 w-screen pb-28 bg-slate-800"><div class="flex md:max-2xl:flex-row flex-col items-center justify-center mx-auto flex-wrap"><div class="flex flex-wrap flex-col sm:max-2xl:w-2/4 w-3/4"><h3 class="mx-auto mt-28 mb-16 font-extrabold text-gray-50 text-3xl">\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438:</h3><div class="mx-auto text-center text-gray-50 text-xl sm:pb-10 sm:max-2xl:pb-10"><ul><li>Python 3.11</li><li class="mt-5">Aiogram</li><li class="mt-5">Aiobgjobs</li><li class="mt-5">Django</li><li class="mt-5">Django Rest Framework</li><li class="mt-5">Flask</li><li class="mt-5">Falcon</li><li class="mt-5">Aiohttp</li><li class="mt-5">React JS</li><li class="mt-5">Solid JS</li></ul></div></div><div class="pb-3 px-3 bg-gray-300 rounded-xl sm:max-2xl:mx-auto sm:max-2xl:w-1/4 w-3/4 mt-10"><div class="py-3 flex"><div id="circle1"></div><div id="circle2"></div><div id="circle3"></div></div><div class="py-3 px-5 bg-gray-400 rounded-lg"><code class="text-cyan-800 font-mono text-2xl type-daniil"></code></div></div></div></section><section class="relative z-10 second-s pb-36"><div class="flex flex-col"><h3 class="mx-auto my-auto mt-36 mb-16 font-extrabold text-gray-50 text-3xl">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B:</h3><ul class="mx-auto text-gray-50"><li class="mt-10">\u0422\u0435\u043B\u0435\u0444\u043E\u043D: <a href="tel:89518549748" class="cursor-pointer">+7-951-854-97-48</a></li><li class="mt-10">Telegram: <a href="https://t.me/on_plc" class="cursor-pointer">@on_plc</a></li></ul></div></section></div>');function Z(){return Y.cloneNode(!0)}W(()=>Q(Z,{}),document.getElementById("root"));
