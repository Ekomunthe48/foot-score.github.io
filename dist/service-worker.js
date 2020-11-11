importScripts("autoprecache-manifest.91d597b5c297baebc54870b5f31915e1.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

console.log('Hai Domo, From Service Worker');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

if (workbox) console.log('Yay! Workbox is loaded 🎉');
else console.log('Boo! Workbox didn\'t load');

workbox.core.setCacheNameDetails({
  prefix: 'FootScore-PWA',
  precache: 'precache',
  runtime: 'runtime',
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.NetworkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

workbox.precaching.cleanupOutdatedCaches();

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Notification.';
  const options = {
    body: 'Your Notification is Success.',
    icon: 'assets/icon.png',
    vibrate: [100, 50, 100],
    dateOfArrival: Date.now(),
    primaryKey: 1,
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://dicoding.com/'),
  );
});

