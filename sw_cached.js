const cacheName = "cacheName";

const cacheFiles = ["index.html", "about.html", "index.css", "main.js"];
// Call Install Event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("service worker caching");
        cache.addAll(cacheFiles);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  //remove old cache
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(x => {
          if (x !== cacheName) {
            console.log("SW clearing old cache");
            return caches.delete(x);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request).catch(err => caches.match(e.request).then(res => res))
  );
});
