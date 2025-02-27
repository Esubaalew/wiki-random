self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("wiki-random-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon.svg",
        "/icon-192.png",
        "/icon-512.png",
        "/favicon.ico",
      ])
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

