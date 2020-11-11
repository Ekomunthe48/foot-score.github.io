/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 941:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(86);
// EXTERNAL MODULE: ./node_modules/lazysizes/lazysizes.js
var lazysizes = __webpack_require__(272);
// EXTERNAL MODULE: ./node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.js
var ls_parent_fit = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/sweetalert/dist/sweetalert.min.js
var sweetalert_min = __webpack_require__(577);
var sweetalert_min_default = /*#__PURE__*/__webpack_require__.n(sweetalert_min);
// CONCATENATED MODULE: ./src/scripts/source/fetchApi.js
var config = {
  base_url: 'https://api.football-data.org/v2/',
  api_key: '9620be29cf5342b7b0762abb3142c6d4',
  id: 2021
};
var competitionUcl = "".concat(config.base_url, "competitions/").concat(config.id, "/");

var fetchApi = function fetchApi(url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': config.api_key
    }
  }).then(function (res) {
    if (res.status !== 200) {
      console.log("Error: ".concat(res.status));
      return Promise.reject(new Error(res.statusText));
    }

    return Promise.resolve(res);
  }).then(function (res) {
    return res.json();
  })["catch"](function (err) {
    console.log('fetch failed', err);
  });
};


// CONCATENATED MODULE: ./src/scripts/component/preloader.js
function showLoader() {
  var Content = document.getElementById('body-content');
  var title = document.getElementById('headerTitle');
  Content.innerHTML = '';
  title.innerHTML = '';
  var html = "<div style=\"padding: 35% 20%; height: 50%;\">\n                  <div class=\"preloader-wrapper big active\">\n                    <div class=\"spinner-layer spinner-layer \">\n                      <div class=\"circle-clipper left\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"gap-patch\">\n                        <div class=\"circle\"></div>\n                      </div><div class=\"circle-clipper right\">\n                        <div class=\"circle\"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>";
  document.getElementById('loader').innerHTML = html;
}

function hideLoader() {
  document.getElementById('loader').innerHTML = '';
}


// EXTERNAL MODULE: ./node_modules/idb/build/esm/index.js + 1 modules
var esm = __webpack_require__(701);
// CONCATENATED MODULE: ./src/scripts/component/db.js
;
var dbPromise = (0,esm/* openDB */.X3)('football-scorer', 1, {
  upgrade: function upgrade(upgradeDb) {
    upgradeDb.createObjectStore('clubs', {
      keyPath: 'id'
    });
  }
});
/* harmony default export */ const db = (dbPromise);
// CONCATENATED MODULE: ./src/scripts/component/clubs.js
;



var teamsData = null;
var teamElement = document.getElementById('body-content');
var title = document.getElementById('headerTitle');
function clubs() {
  var getAllClubs = function getAllClubs() {
    showLoader();

    if ('caches' in window) {
      caches.match("".concat(competitionUcl, "teams")).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            showClub(data);
          });
        }
      });
    }

    fetchApi("".concat(competitionUcl, "teams")).then(function (data) {
      showClub(data);
    })["catch"](function (error) {
      console.log(error);
    });
  };

  function showClub(data) {
    var teams = '';
    var renderTarget = teamElement;
    teamsData = data;
    db.then(function (db) {
      var tx = db.transaction('clubs', 'readwrite').objectStore('clubs');
      var txTeams = tx.getAll() || [];
      return txTeams;
    }).then(function (team) {
      showLoader();
      var favTeams = team.map(function (i) {
        return i.id;
      });

      function renderButton(teamId) {
        if (!favTeams.includes(teamId)) {
          return "\n                  <a class=\"btn-floating btn-medium halfway-fab waves-effect waves-light green addFavorite\"\n                  >\n                    <i id=\"icon-".concat(teamId, "\" class=\"large material-icons\" data-id=\"").concat(teamId, "\">favorite</i>\n                  </a>");
        }

        return '';
      }

      data.teams.forEach(function (team) {
        teams += "\n          <div class=\"col s12 m6 l4\">\n                <div class=\"card\" style=\"height: 22rem;\">\n                    <div class=\"card-image waves-effect waves-block waves-light\">\n                        <img class=\"lazyload\" src=\"".concat(team.crestUrl.replace(/^http:\/\//i, 'https://'), "\" style=\"padding: 16px; margin: auto; height: 135px; width: 135px\">\n                        ").concat(renderButton(team.id), "\n                    </div>\n                  <div class=\"card-content\">\n                    <h5>").concat(team.name, "</h5>\n                    <p>Founded  : ").concat(team.founded, "</p>\n                    <p>Colors   : ").concat(team.clubColors, "</p>\n                    <p>Stadium  : ").concat(team.venue, "</p>\n                    <a href=\"").concat(team.website, "\">").concat(team.website, "</a>\n                  </div>\n                </div>\n          </div>");
        title.innerHTML = 'English Premiere League Teams';
        renderTarget.innerHTML = teams;
        hideLoader();
        var addFavorite = document.querySelectorAll('.addFavorite');
        addFavorite.forEach(function (el) {
          el.addEventListener('click', function (e) {
            var getId = e.target.dataset.id;
            addFavoriteTeam(getId);
          });
        });
      });
    });
  }

  function addFavoriteTeam(teamId) {
    // eslint-disable-next-line eqeqeq
    var teamObject = teamsData.teams.filter(function (el) {
      return el.id == teamId;
    })[0];
    db.then(function (db) {
      var tx = db.transaction('clubs', 'readwrite');
      var store = tx.objectStore('clubs');
      store.add(teamObject);
      return tx.complete;
    }).then(function () {
      // remove the button
      var element = document.getElementById("icon-".concat(teamId));
      element.parentNode.remove();
      sweetalert_min_default()({
        title: 'succes!',
        text: "".concat(teamObject.name, " Added into your favorite."),
        icon: 'success',
        button: 'Ok!'
      });
    });
  }

  getAllClubs();
}
// CONCATENATED MODULE: ./src/scripts/component/standings.js
;

function standings() {
  var standingElement = document.getElementById('body-content');
  var title = document.getElementById('headerTitle');

  function getAllStandings() {
    showLoader();

    if ('caches' in window) {
      console.log('getting your data from system');
      caches.match("".concat(competitionUcl, "standings")).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log("Competition Data: ".concat(data));
            showStanding(data);
          });
        }
      });
    }

    fetchApi("".concat(competitionUcl, "standings")).then(function (data) {
      showStanding(data);
    })["catch"](function (error) {
      console.log(error);
    });
  }

  var showStanding = function showStanding(data) {
    var standings = '';
    data.standings[0].table.forEach(function (standing) {
      standings += "\n                  <tr>\n                    <td>".concat(standing.position, "</td>\n                    <td><img src=\"").concat(standing.team.crestUrl.replace(/^http:\/\//i, 'https://'), "\" width=\"30px\" alt=\"badge\"></td>\n                    <td>").concat(standing.team.name, "</td>\n                    <td>").concat(standing.playedGames, "</td>\n                    <td>").concat(standing.won, "</td>\n                    <td>").concat(standing.draw, "</td>\n                    <td>").concat(standing.lost, "</td>\n                    <td>").concat(standing.goalsFor, "</td>\n                    <td>").concat(standing.goalsAgainst, "</td>\n                    <td>").concat(standing.goalDifference, "</td>\n                    <td>").concat(standing.points, "</td>\n                    <td>").concat(standing.form, "</td>\n                  </tr>\n          ");
    });
    standingElement.innerHTML = " \n      <div class=\"card\">\n            <table class=\"striped responsive-table\">\n                <thead>\n                    <tr>\n                      <th>Pos</th>\n                      <th></th>\n                      <th>Team</th>\n                      <th>P</th>\n                      <th>W</th>\n                      <th>D</th>\n                      <th>L</th>\n                      <th>F</th>\n                      <th>A</th>\n                      <th>+/-</th>\n                      <th>PTS</th>\n                      <th>Form</th>\n                    </tr>\n                </thead>\n                <tbody id=\"standings\">\n                    ".concat(standings, "\n                </tbody>\n              </table>\n        </div>");
    title.innerHTML = 'English Premiere League Standings';
    hideLoader();
  };

  getAllStandings();
}
// CONCATENATED MODULE: ./src/scripts/component/favorites.js
;


function favorites() {
  var Content = document.getElementById('body-content');
  var title = document.getElementById('headerTitle');
  var _dataTeams = null;

  var loadFavoriteTeams = function loadFavoriteTeams() {
    showLoader();
    var html = "\n          <a class=\"waves-effect waves-light btn-small red darken-4\" id=\"delete\">Clear All Your Favorites</a>\n          <div class=\"row\" id=\"yourFavorite\" style=\"margin-top: 16px;\"></div>";
    Content.innerHTML = html;
    title.innerHTML = 'My Favorites Teams';
    document.getElementById('delete').addEventListener('click', function () {
      deletesAllFavoriteTeam();
    });
    renderFavorite(); // render favorited teams

    hideLoader();
  };

  function renderFavorite() {
    db.then(function (db) {
      var tx = db.transaction('clubs', 'readwrite').objectStore('clubs');
      return tx.getAll() || [];
    }).then(function (team) {
      _dataTeams = team;
      var listFavorite = document.getElementById('yourFavorite');

      if (team.length) {
        var _favorite = ''; // eslint-disable-next-line no-shadow

        team.forEach(function (team) {
          _favorite += "\n            <div class=\"col s12 m6 l4\">\n                <div class=\"card\" id=\"card-".concat(team.id, "\" >\n                    <div class=\"card-image waves-effect waves-block waves-light\">\n                        <img class=\"lazyload\" src=\"").concat(team.crestUrl, "\" style=\"padding: 16px; margin: auto; height: 135px; width: 135px\">\n                        <a class=\"btn-floating btn-medium halfway-fab waves-effect waves-light red remove\" data-id=\"").concat(team.id, "\">\n                            <i id=\"card-").concat(team.id, "\" class=\"large material-icons\">delete</i>\n                        </a>\n                    </div>\n                  <div class=\"card-content\">\n                    <div class=\"center flow-text\"><strong>").concat(team.name, "</strong></div>\n                    <div class=\"center\"><strong>Founded:</strong> ").concat(team.founded, "</div>\n                    <div class=\"center\"><strong>Color: </strong>").concat(team.clubColors, "</div>\n                    <div class=\"center\"><strong>Stadium: </strong>").concat(team.venue, "</div>\n                    <div class=\"center\"><a href=\"").concat(team.website, "\" target=\"_blank\"><strong>Website : </strong>").concat(team.website, "</a></div>\n                  </div>\n                </div>\n            </div>");
          listFavorite.innerHTML = _favorite;
          var removeFavorite = document.querySelectorAll('.remove');
          removeFavorite.forEach(function (element) {
            element.addEventListener('click', function (e) {
              var getId = e.target.parentElement.dataset.id;
              removeFavoriteTeam(getId);
            });
          });
        });
      } else {
        listFavorite.innerHTML = '<h5 class="center-align">You have no favorite team! get one !</h5>';
      }

      hideLoader();
    });
  }

  function removeFavoriteTeam(teamId) {
    var teamObject = _dataTeams.filter(function (el) {
      return el.id === parseInt(teamId);
    })[0];

    db.then(function (db) {
      var tx = db.transaction('clubs', 'readwrite');
      tx.objectStore('clubs')["delete"](parseInt(teamId));
    }).then(function () {
      var element = document.getElementById("card-".concat(teamId));
      element.parentNode.removeChild(element);
      sweetalert_min_default()({
        title: 'succes!',
        text: "Success Delete ".concat(teamObject.name, " From Your Favorite."),
        icon: 'success',
        button: 'Ok!'
      });
    })["catch"](function (e) {
      sweetalert_min_default()({
        title: "Please Check Your Network.".concat(e)
      });
    });
  }

  function deletesAllFavoriteTeam() {
    db.then(function (db) {
      var tx = db.transaction('clubs', 'readwrite');
      var store = tx.objectStore('clubs').clear();
      return store;
    }).then(function () {
      loadFavoriteTeams();
      sweetalert_min_default()('Poof! Your favorites has been deleted!', {
        icon: 'success'
      });
    });
  }

  loadFavoriteTeams();
}
// CONCATENATED MODULE: ./src/scripts/view/nav.js
/* eslint-disable no-var */
;



var main = function main() {
  console.log('DOMContentLoaded');
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest(); // eslint-disable-next-line func-names

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        var topnav = document.querySelector('.topnav');
        topnav.innerHTML = xhttp.responseText;
        topnav.addEventListener('click', function (event) {
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      }
    };

    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  loadMobile();

  function loadMobile() {
    var xhttp = new XMLHttpRequest(); // eslint-disable-next-line func-names

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        var navMobile = document.querySelector('#view-mobile');
        navMobile.innerHTML = xhttp.responseText;
        navMobile.addEventListener('click', function (event) {
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      }
    };

    xhttp.open('GET', 'mobile.html', true);
    xhttp.send();
  } // eslint-disable-next-line no-var
  // eslint-disable-next-line vars-on-top


  var page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  loadPage(page);

  function loadPage(page) {
    if (page === 'home') standings();
    if (page === 'club') clubs();
    if (page === 'favorite') favorites();
  }
};

/* harmony default export */ const nav = (main);
// EXTERNAL MODULE: ./node_modules/workbox-window/build/workbox-window.prod.es5.mjs
var workbox_window_prod_es5 = __webpack_require__(580);
// CONCATENATED MODULE: ./src/scripts/source/swScript.js
;
function Sw() {
  var appServerPublicKey = 'BGskf64ORP1oZC9MRVEjnZa1ExXn-MG9-4TerpLDwyeGm3KEKny0g-7Yp6j1rkES64qlOCxm8X9EoF2dgKgL7Bs';
  var pushButton = document.querySelector('.js-push-btn');
  var isSubs = false;
  var swRegi = null;

  function urlB64ToUint8Array(base64String) {
    // eslint-disable-next-line no-mixed-operators
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding). // eslint-disable-next-line no-useless-escape
    replace(/\-/g, '+').replace(/_/g, ' /');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length); // eslint-disable-next-line no-plusplus

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  function initUI() {
    pushButton.addEventListener('click', function () {
      pushButton.disabled = true;
      console.log(isSubs);

      if (isSubs) {
        // eslint-disable-next-line no-alert
        alert('You not subcribed yet');
        unsubsUser();
      } else {
        subsUser();
      }
    });
    swRegi.pushManager.getSubscription().then(function (subscription) {
      isSubs = !(subscription === null);

      if (isSubs) {
        console.log('User is Subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Notifications is block.'; // eslint-disable-next-line no-alert

      alert('You block the notifications');
      pushButton.disabled = true;
      return;
    }

    if (isSubs) {
      pushButton.textContent = 'Turn off subscribes';
    } else {
      pushButton.textContent = 'Turn on subscribes';
    }

    pushButton.disabled = false;
  }

  function subsUser() {
    var appServerKey = urlB64ToUint8Array(appServerPublicKey);
    swRegi.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: appServerKey
    }).then(function (subscription) {
      console.log('User is subscribed:', subscription);
      var data = JSON.stringify(subscription);
      console.log(data); // eslint-disable-next-line no-const-assign

      isSubs = true;
      updateBtn();
    })["catch"](function (err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
  }

  function unsubsUser() {
    swRegi.pushManager.getSubscription() // eslint-disable-next-line consistent-return
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })["catch"](function (error) {
      console.log('Error unsubscribing', error);
    }).then(function () {
      console.log('User is unsubscribed.');
      isSubs = false;
      updateBtn();
    });
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    var workbox = new workbox_window_prod_es5/* Workbox */.Z('./service-worker.js');
    workbox.register();
    navigator.serviceWorker.register('./service-worker.js').then(function (swReg) {
      console.log('Pendaftaran ServiceWorker berhasil', swReg);
      swRegi = swReg;
      initUI();
    })["catch"](function (error) {
      console.log('Pendaftaran ServiceWorker gagal', error);
    });
  } else {
    console.log('ServiceWorker belum didukung browser ini.');
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
}
// EXTERNAL MODULE: ./node_modules/materialize-css/dist/js/materialize.min.js
var materialize_min = __webpack_require__(542);
// CONCATENATED MODULE: ./src/scripts/main.js
/* eslint-disable import/no-unresolved */
;





 // eslint-disable-next-line import/extensions


window.addEventListener('DOMContentLoaded', function () {
  nav();
  Sw();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			[941,904,542,86,457]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = () => {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = () => {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = () => {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfootball_score"] = self["webpackChunkfootball_score"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;