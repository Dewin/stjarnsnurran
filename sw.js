// Service Worker for Stjärnsnurran
const CACHE_NAME = 'stjarnsnurran-v21';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './audio.js',
  './confetti.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './ian.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Force network reload during install so stale HTTP cache is never stored
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return fetch(url, { cache: 'reload' }).then((res) => {
            if (res.ok) return cache.put(url, res);
          }).catch((err) => console.warn('Cache prefetch failed for', url, err));
        })
      );
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Raderar föråldrad cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Network-First for HTML navigation, JS scripts, and CSS stylesheets
  // This guarantees that any updates arrive immediately when online!
  const isCodeOrHtml = 
    e.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname === '/stjarnsnurran/' ||
    url.pathname.endsWith('/');

  if (isCodeOrHtml) {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' })
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(e.request, { ignoreSearch: true })
            .then((cached) => cached || caches.match('./index.html'));
        })
    );
    return;
  }

  // Cache-First with network fallback for images, icons, and audio
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return response;
      });
    })
  );
});
