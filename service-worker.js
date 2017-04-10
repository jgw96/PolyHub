/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint no-console: ["error", { allow: ["info"] }] */

console.info(
  'Service worker disabled for development, will be generated at build time.'
);

// beginning of custom service worker code
!function(){"use strict";function e(){return t||(t=new Promise(function(e,n){var t=indexedDB.open("keyval-store",1);t.onerror=function(){n(t.error)},t.onupgradeneeded=function(){t.result.createObjectStore("keyval")},t.onsuccess=function(){e(t.result)}})),t}function n(n,t){return e().then(function(e){return new Promise(function(r,o){var u=e.transaction("keyval",n);u.oncomplete=function(){r()},u.onerror=function(){o(u.error)},t(u.objectStore("keyval"))})})}var t,r={get:function(e){var t;return n("readonly",function(n){t=n.get(e)}).then(function(){return t.result})},set:function(e,t){return n("readwrite",function(n){n.put(t,e)})},"delete":function(e){return n("readwrite",function(n){n["delete"](e)})},clear:function(){return n("readwrite",function(e){e.clear()})},keys:function(){var e=[];return n("readonly",function(n){(n.openKeyCursor||n.openCursor).call(n).onsuccess=function(){this.result&&(e.push(this.result.key),this.result["continue"]())}}).then(function(){return e})}};"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define("idbKeyval",[],function(){return r}):self.idbKeyval=r}();


self.addEventListener('sync', (event) => {
  if (event.tag === 'starSync') {
    event.waitUntil(() => {
      idbKeyval.get('badRequest').then((value) => {
        fetch(value, {
          method: 'PUT'
        })
      }).then((response) => {
        console.log(response);
      })
    });
  } else if (event.tag === 'followSync') {
    event.waitUntil(() => {
      idbKeyval.get('badFollowRequest').then((value) => {
        fetch(value, {
          method: 'PUT'
        })
      }).then((response) => {
        console.log(response);
      })
    });
  }
});

// notifications
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '701882251983'
});

const messaging = firebase.messaging();