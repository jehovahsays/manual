const CACHE = "mev-wiki-v13"; 

// Full list of all static assets
const FILES = [
  "/",
  "/index.html",
  // ✅ ADDED: Dedicated 404 page for robust offline fallback
  "/404.html",
  "/assets/js/app.js",
  "/assets/css/index.css",
  "/css.html",
  // ⚠️ FIXED: The Service Worker is located in /assets/js/, so this path is correct
  "/assets/js/sw.js", 
  "/manifest.json",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/icons/maskable-192.png",
  "/assets/icons/maskable-512.png"
];

// ... (install and activate listeners remain the same) ...

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isMainDocument = url.pathname === '/' || url.pathname === '/index.html';
  
  // Strategy 1: Network-First with Cache Fallback for index.html (Including Security Headers)
  if (isMainDocument) {
    event.respondWith(
      fetch(event.request)
        // ... (Network response handling with security headers remains the same) ...
        .catch(() => {
          // If network fails (offline), serve from cache, falling back to 404.html if that fails.
          return caches.match(event.request) || caches.match('/404.html');
        })
    );
    return;
  }

  // Strategy 2: Cache-First for all other static assets
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).catch(() =>
        // ⚠️ FIXED: If an asset fails (e.g., an icon), serve the offline page, 
        // which tells the user what's wrong, instead of trying to load index.html.
        caches.match("/404.html")
      );
    })
  );
});
