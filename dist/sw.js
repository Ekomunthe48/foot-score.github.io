var serviceWorkerOption = {
  "assets": [
    "/main.dacfdffae88f8a7ec731.css",
    "/main.9e0896fef9daae6b00af.bundle.js",
    "/favicon.ico",
    "/icon.png",
    "/icon180.png",
    "/icon192.png",
    "/icon256.png",
    "/icon384.png",
    "/mobile.html",
    "/nav.html",
    "/manifest.d834ca6c98968028227344dfcb5a9cf4.json",
    "/images/ios/icon_512x512.9d3222c30355d63f17726f9976574741.png",
    "/images/ios/icon_192x192.6993fdb888c0d079e7775fecb0b597db.png",
    "/images/ios/icon_180x180.7d8662155646bd5fed4dd493bf762b00.png",
    "/images/icon/icon_512x512.9d3222c30355d63f17726f9976574741.png",
    "/images/icon/icon_384x384.05caa01a9e67d0dae205319f6b461bd3.png",
    "/images/icon/icon_256x256.931ff17ce6bb938ba04b31855aacb813.png",
    "/images/icon/icon_192x192.6993fdb888c0d079e7775fecb0b597db.png",
    "/images/icon/icon_180x180.7d8662155646bd5fed4dd493bf762b00.png"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/scripts/sw.js":
/*!***************************!*\
  !*** ./src/scripts/sw.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {const CACHE_NAME = 'footscore-v9';\r\n\r\n/* eslint-disable array-callback-return */\r\nself.addEventListener('install', (event) => {\r\n  const { assets } = global.serviceWorkerOption;\r\n  event.waitUntil(\r\n    caches.open(CACHE_NAME).then((cache) => cache.addAll([\r\n      ...assets,\r\n      '/',\r\n      'https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap',\r\n      'https://fonts.googleapis.com/icon?family=Material+Icons',\r\n      'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',\r\n      'https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr5KPxWnVaE.woff2',\r\n    ])),\r\n  );\r\n});\r\n\r\nself.addEventListener('fetch', (event) => {\r\n  // eslint-disable-next-line camelcase\r\n  const base_url = 'https://api.football-data.org/v2/';\r\n  if (event.request.url.indexOf(base_url) > -1) {\r\n    event.respondWith(\r\n      caches.open(CACHE_NAME).then((cache) => fetch(event.request).then((response) => {\r\n        cache.put(event.request.url, response.clone());\r\n        return response;\r\n      })),\r\n    );\r\n  } else {\r\n    event.respondWith(\r\n      // eslint-disable-next-line max-len\r\n      caches.match(event.request, { ignoreSearch: true }).then((response) => response || fetch(event.request)),\r\n    );\r\n  }\r\n});\r\n\r\nself.addEventListener('activate', (event) => {\r\n  event.waitUntil(\r\n    caches.keys().then((cacheNames) => Promise.all(\r\n      // eslint-disable-next-line consistent-return\r\n      cacheNames.map((cacheName) => {\r\n        // eslint-disable-next-line eqeqeq\r\n        if (cacheName != CACHE_NAME) {\r\n          console.log(`ServiceWorker: cache ${cacheName} dihapus`);\r\n          return caches.delete(cacheName);\r\n        }\r\n      }),\r\n    )),\r\n  );\r\n});\r\n\r\nself.addEventListener('push', (event) => {\r\n  console.log('[Service Worker] Push Received.');\r\n  console.log(`[Service Worker] Push had this data: \"${event.data.text()}\"`);\r\n\r\n  const title = 'Push Notification.';\r\n  const options = {\r\n    body: 'Your Notification is Success.',\r\n    icon: 'assets/icon.png',\r\n    vibrate: [100, 50, 100],\r\n    dateOfArrival: Date.now(),\r\n    primaryKey: 1,\r\n  };\r\n\r\n  const notificationPromise = self.registration.showNotification(title, options);\r\n  event.waitUntil(notificationPromise);\r\n});\r\n\r\nself.addEventListener('notificationclick', (event) => {\r\n  console.log('[Service Worker] Notification click Received.');\r\n\r\n  event.notification.close();\r\n\r\n  event.waitUntil(\r\n    clients.openWindow('https://dicoding.com/'),\r\n  );\r\n});\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/scripts/sw.js?");

/***/ })

/******/ });