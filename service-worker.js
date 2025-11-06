self.addEventListener('install', (event) => {
  // The service worker is installed
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // The service worker is activated
  // Clear all caches to prevent language caching issues
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Don't cache SVG files to prevent language switching issues
  if (event.request.url.includes('.svg')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // For other resources, use network-first strategy
  event.respondWith(fetch(event.request));
});
  