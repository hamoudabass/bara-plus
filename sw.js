/*const CACHE_NAME = 'baraplus-v2';
const STATIC_ASSETS = [
  '/bara-plus/',
  '/bara-plus/index.html',
  '/bara-plus/assets/css/superapp.css',
  '/bara-plus/assets/images/2.png',
  '/bara-plus/assets/images/3.png',
  '/bara-plus/pages/restaurants.html'
];

// Installation : cache des ressources critiques
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting(); // active immédiatement le nouveau SW
});

// Nettoyage des anciens caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim(); // prend le contrôle immédiatement
});

// Stratégie Cache-first avec fallback réseau + offline fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((networkResponse) => {
        // Mettre en cache les nouvelles ressources dynamiques (optionnel)
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // Fallback pour les pages HTML (évite écran blanc)
        if (e.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
        return new Response('Hors ligne – Bara+ revient bientôt', { status: 503 });
      });
    })
  );
});
*/

// Désactivation du Service Worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});