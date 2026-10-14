const CACHE_NAME = 'lucca-cache-v2';
const urlsToCache = ['index.html', 'manifest.json'];

// インストール時に新しいキャッシュを保存
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// アクティベート時に古いキャッシュを自動でゴミ箱へ捨てる
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('古いluccaの記憶を消去しました。');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// キャッシュがあればそれを返し、なければネットワークから取得
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
