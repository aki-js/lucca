const CACHE_NAME = 'simpluna-cache-v1';
const urlsToCache = ['index.html', 'manifest.json'];

// インストール時にファイルをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// アプリ起動時はキャッシュから高速に読み込む
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
