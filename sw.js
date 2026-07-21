// QADAM / M-CHAT-R offline service worker
// ВАЖНО: при любом обновлении mchat.html / dashboard.html поднимай версию кэша (v2 -> v3),
// иначе у пользователей останется старая версия.
const CACHE = 'mchat-v2';
const ASSETS = ['mchat.html', 'dashboard.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') return caches.match('mchat.html');
      });
    })
  );
});
