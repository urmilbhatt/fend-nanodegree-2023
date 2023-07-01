// Service Worker Version
const version = 'v1';

// Files to cache
const cacheFiles = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  // Add more files to cache as needed
];

// Install Event - Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate Event - Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== version) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event - Serve cached files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
