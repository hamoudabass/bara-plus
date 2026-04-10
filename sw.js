const CACHE_NAME = 'baraplus-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/images/2.png',
  '/images/3.png'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Répondre avec le cache si on est hors-ligne
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});