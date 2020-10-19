/* eslint-disable array-callback-return */
const CACHE_NAME = 'footballpwa-v1.0.4';
const urlsToCache = [
  '/',
  '/index.html',
  '/pages/nav/nav.html',
  '/pages/club.html',
  '/pages/home.html',
  '/css/index.css',
  '/scripts/view/nav.js',
  '/scripts/source/swScript.js',
  '/scripts/source/fetchApi.js',
  '/scripts/component/standings.js',
  '/scripts/component/db.js',
  '/scripts/component/clubs.js',
  '/scripts/component/preloader.js',
  'https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr5mOBWnVaFrNlJz.woff2',
  '/assets/icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line consistent-return
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});

self.addEventListener('fetch', (event) => {
  // eslint-disable-next-line camelcase
  const base_url = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => fetch(event.request).then((response) => {
        cache.put(event.request.url, response.clone());
        return response;
      })),
    );
  } else {
    event.respondWith(
      // eslint-disable-next-line max-len
      caches.match(event.request, { ignoreSearch: true }).then((response) => response || fetch(event.request)),
    );
  }
});
