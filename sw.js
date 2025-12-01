const CACHE = "mev-wiki-v9"; // 🌟 FIX: BUMPED CACHE VERSION TO FORCE UPDATE

// Full list of all static assets for robust offline-first caching
const FILES = [
  // Core HTML/Entry points
  "/",
  "/index.html",
  "/css.html",            // CSS-only fallback page
  
  // PWA & Service Worker files
  "/sw.js",
  "/en/index.json",  
  "/manifest.json",       // PWA manifest file
  
  // Static Assets (The four required icons)
  "/assets/icons/icon-192.png", 
  "/assets/icons/icon-512.png",
  "/assets/icons/maskable-192.png",
  "/assets/icons/maskable-512.png"
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
          return caches.delete(k); // Deletes the old cache (v8)
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      // Cache-first strategy: Return cached response, otherwise fetch from network
      return cacheRes || fetch(event.request).catch(() =>
        // Fallback to index.html if offline/network fails
        caches.match("/index.html")
      );
    })
  );
});
