const CACHE_VERSION = "2026.09.24.1";
const STATIC_CACHE = `manar-static-${CACHE_VERSION}`;
const HTML_CACHE = `manar-html-${CACHE_VERSION}`;

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => (k.startsWith("manar-static-") || k.startsWith("manar-html-")) && k !== STATIC_CACHE && k !== HTML_CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // لا نتدخل في Firebase أو الطلبات الخارجية.
  if (url.origin !== self.location.origin) return;

  // صفحات HTML: الشبكة أولاً حتى لا تبقى الصفحة على نسخة قديمة.
  if (req.mode === "navigate" || req.destination === "document" || url.pathname.endsWith(".html") || url.pathname === "/") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        if (fresh && fresh.ok) {
          const copy = fresh.clone();
          caches.open(HTML_CACHE).then(c => c.put(req, copy)).catch(() => {});
          return fresh;
        }
      } catch (e) {}
      const cached = await caches.match(req);
      return cached || Response.error();
    })());
    return;
  }

  // الملفات الثابتة: استخدم الكاش بسرعة، ثم حدّثه من الشبكة.
  if (["script","style","image","font"].includes(req.destination)) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      const network = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => null);
      return cached || await network || Response.error();
    })());
  }
});
