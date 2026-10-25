/* PWA shell cache for المنصة الرياضية. Data/API requests are deliberately not cached. */
'use strict';
const CACHE_NAME = 'sports-platform-pwa-v20261025';
const ICONS = [
  './icons/favicon-32.png?v=20261025',
  './icons/favicon-48.png?v=20261025',
  './icons/apple-touch-icon.png?v=20261025',
  './icons/icon-192.png?v=20261025',
  './icons/icon-512.png?v=20261025',
  './icons/icon-192-maskable.png?v=20261025',
  './icons/icon-512-maskable.png?v=20261025'
];
const SHELL = [
  './index.html',
  './manifest.webmanifest?v=20261025',
  ...ICONS
];
const INDEX_URL = new URL('./index.html', self.registration.scope).href;
const SCOPE_URL = new URL(self.registration.scope);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('sports-platform-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(SCOPE_URL.href)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(INDEX_URL, fresh.clone());
        }
        return fresh;
      } catch (error) {
        return (await caches.match(INDEX_URL)) || Response.error();
      }
    })());
    return;
  }

  if (url.pathname.includes('/icons/') || url.pathname.endsWith('/manifest.webmanifest')) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) await cache.put(request, fresh.clone());
        return fresh;
      } catch (error) { return Response.error(); }
    })());
  }
});
