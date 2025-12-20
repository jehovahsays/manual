/**
 * sw.js - Service Worker for MEV Wiki PWA
 *
 * This Service Worker implements a Cache-First strategy for static assets
 * and a Network-First strategy for the main index page.
 */

// A unique name for your cache. Increment this version number every time
// you make changes to the files listed in the 'FILES' array.
const CACHE = "mev-wiki-v14"; 

// Full list of all static assets to cache during installation.
// All paths must be relative to the Service Worker's scope (which is the root '/').
// In sw.js
const FILES = [
  "/mev/",
  "/mev/index.html",
  // Dedicated 404 page for robust offline fallback
  "/mev/404.html", 
  "/mev/assets/js/app.js",
  "/mev/assets/css/index.css",
  "/mev/css.html", 
  "/mev/sw.js", 
  "/mev/manifest.json",
  "/mev/assets/icons/icon-192.png",
  "/mev/assets/icons/icon-512.png",
  "/mev/assets/icons/maskable-192.png",
  "/mev/assets/icons/maskable-512.png"
];

// --- Install Listener ---
self.addEventListener("install", event => {
  console.log('[Service Worker] Install Event - Caching App Shell:', CACHE);
  // waitUntil ensures the Service Worker won't install until the cache is fully populated.
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => {
        // cache.addAll performs multiple fetches and adds to the cache
        return cache.addAll(FILES);
      })
      .catch(err => {
        // If caching fails for any file (e.g., a 404), the Service Worker installation fails.
        console.error('[Service Worker] Failed to cache critical assets:', err);
      })
  );
  // Force the new Service Worker to activate immediately instead of waiting for existing ones to close.
  self.skipWaiting(); 
});

// --- Activate Listener ---
self.addEventListener("activate", event => {
  console.log('[Service Worker] Activate Event - Cleaning old caches.');
  // Delete outdated caches to free up space.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the current cache name is not in the whitelist (i.e., it's an old version), delete it.
          if (cacheName !== CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients immediately to take control of all open pages within the scope.
  return self.clients.claim();
});

// --- Fetch Listener ---
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  // Check if the request is for the main document (root or index.html)
  const isMainDocument = url.pathname === '/' || url.pathname === '/index.html';
  
  // Strategy 1: Network-First with Cache Fallback for index.html (and other non-static, critical URLs)
  if (isMainDocument) {
    event.respondWith(
      fetch(event.request)
        .then(networkRes => {
          // If the network response is good (200 OK), clone it, cache it (optional, for update freshness), 
          // and return the original response.
          if (networkRes.status === 200) {
            const resToCache = networkRes.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, resToCache));
          }
          return networkRes;
        })
        .catch(() => {
          // If network fails (offline or error), serve from cache.
          // This will serve the cached index.html, which is generally what you want for a navigation failure.
          return caches.match(event.request) || caches.match('/404.html');
        })
    );
    return;
  }

  // Strategy 2: Cache-First for all other static assets (CSS, JS, Icons)
  // This is the fastest strategy for assets that rarely change.
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      // Return cached response if available
      return cacheRes || fetch(event.request)
        .catch(() => {
          // If both cache and network fail (e.g., a dynamic request), return the offline 404 page.
          if (event.request.mode === 'navigate') {
              return caches.match('/mev/404.html');
          }
          // For sub-resources (images, scripts), failing silently is often better than serving HTML.
        });
    })
  );
});

