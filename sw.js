// Saves the app on the phone so it opens without internet. Tries the web first (so updates arrive), falls back to the saved copy.
const C = "lifetracker-v1";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "./index.html"]))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
});
