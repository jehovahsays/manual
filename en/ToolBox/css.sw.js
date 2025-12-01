const CACHE = "mev-wiki-v8"; // INCREMENTED CACHE VERSION TO FORCE UPDATE

// Only caching the essential local files
const FILES = [
  "/",
  "/index.html",
  // The service worker itself must be listed
  "/sw.js" 
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(FILES);
    })
    .catch(err => console.error('[Service Worker] Failed to cache files:', err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
          console.log('[Service Worker] Deleting old cache:', k);
          return caches.delete(k);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      // Return cached response if available, otherwise fetch from network
      return cacheRes || fetch(event.request).catch(() =>
        // Fallback to index.html if offline/network fails or asset not found
        caches.match("/index.html")
      );
    })
  );
});

