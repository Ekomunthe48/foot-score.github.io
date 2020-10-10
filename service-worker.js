const CACHE_NAME = "footballpwa-v1.0.2";
var urlsToCache = [
        "/",
        "/nav.html",
        "/index.html",
        "/pages/home.html",
        "/pages/club.html",
        "/pages/player.html",
        "/css/index.css",
        "/css/materialize.min.css",
        "/css/navi.css",
        "/js/materialize.min.js",
        "/js/nav.js",
        "/js/sw.js",
        "/js/standings.js",
        "/js/db.js",
        "/js/idb.js",
        "/manifest.json",
        "/service-worker.js",
        "https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
        "https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr5mOBWnVaFrNlJz.woff2",

];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
      caches.keys().then(function(cacheNames) {
          return Promise.all(
              cacheNames.map(function(cacheName) {
                  if (cacheName !== CACHE_NAME) {
                      console.log("ServiceWorker: cache " + cacheName + " dihapus");
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
          caches.open(CACHE_NAME).then(function(cache) {
              return fetch(event.request).then(function(response) {
                  cache.put(event.request.url, response.clone());
                  return response;
              })
          })
      );
  } else {
      event.respondWith(
          caches.match(event.request, {ignoreSearch: true}).then(function(response) {
              return response || fetch (event.request);
          })
      )
  }
});