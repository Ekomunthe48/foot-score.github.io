self.addEventListener('install', (event) => {
  event.waitUntil(
    cache.addAll(serviceWorkerOption['assets']),
  );
});

self.addEventListener('fetch', (event) => {
  // eslint-disable-next-line camelcase
  const base_url = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      fetch(event.request).then((response) => {
        cache.put(event.request.url, response.clone());
        return response;
      }),
    );
  } else {
    event.respondWith(
      // eslint-disable-next-line max-len
      caches.match(event.request, { ignoreSearch: true }).then((response) => response || fetch(event.request)),
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      // eslint-disable-next-line array-callback-return
      cacheNames.map((cacheName) => {
        // eslint-disable-next-line eqeqeq
        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
        return caches.delete(cacheName);
      }),
    )),
  );
});
