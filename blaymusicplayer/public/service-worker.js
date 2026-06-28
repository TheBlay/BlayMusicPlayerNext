/* Cache, atualizações, notificações, offline e outros recursos do service worker */

const CACHE_NAME = "blaymusicplayer-cache-v1";
const urlsToCache = [
  "/",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json"
];

// Instala o service worker e adiciona arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta requisições e responde com cache quando possível
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza cache quando houver nova versão
// futuramente analisar a implementação de stale-while-revalidate, usando o cache primeiro e depois atualizando em segundo plano
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
