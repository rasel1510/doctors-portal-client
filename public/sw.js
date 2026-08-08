const CACHE_NAME = 'doctors-portal-v2';
const DYNAMIC_CACHE = 'doctors-portal-dynamic-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/services.json'
];

// Install Event - Pre-cache core app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core app shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old cache storage
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache storage:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event Handler - Smart Caching Strategies
self.addEventListener('fetch', (event) => {
  // Only process HTTP/HTTPS GET requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Strategy 1: Network-First with Cache Fallback for API Endpoints (/booking, /appointment, /doctor, /user, /services)
  if (
    url.pathname.includes('/appointment') ||
    url.pathname.includes('/booking') ||
    url.pathname.includes('/doctor') ||
    url.pathname.includes('/user') ||
    url.pathname.includes('/services')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          console.log('[SW] Network error fetching API. Falling back to cache:', url.pathname);
          return caches.match(event.request);
        })
    );
    return;
  }

  // Strategy 2: Stale-While-Revalidate / Cache-First for static assets, scripts, styles & navigation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline Fallback: If navigating to HTML route and network fails, return app shell index.html
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
