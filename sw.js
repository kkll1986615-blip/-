const CACHE='manar-sports-pwa-v2026-09-02';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/favicon-48.png','./icons/apple-touch-icon.png'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==location.origin) return;
  if(req.mode==='navigate' || req.destination==='document'){
    event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(res=>{
    if(res.ok) caches.open(CACHE).then(c=>c.put(req,res.clone())).catch(()=>{});
    return res;
  }).catch(()=>cached)));
});
