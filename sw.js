/* المنصة الرياضية - Service Worker التحديث التلقائي */
const VERSION = 'sports-platform-2026.09.25.1';
const CACHE = VERSION;

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // صفحات HTML: الشبكة أولاً حتى لا تبقى نسخة قديمة مفتوحة.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {cache: 'no-store'});
        const copy = fresh.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return fresh;
      } catch (e) {
        return caches.match(req) || caches.match('./index.html');
      }
    })());
    return;
  }

  // باقي الملفات: استخدم الكاش عند توفره، مع تحديثه من الشبكة.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    const network = fetch(req).then(res => {
      if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {});
      return res;
    }).catch(() => null);
    return cached || await network || Response.error();
  })());
});
