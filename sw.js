const CACHE_NAME = 'lucca-cache-v7';
const urlsToCache = ['./', 'index.html', 'manifest.json'];

// インストール時に、古い記憶を待たずに強制的に最新へ進む「スキップ処理」を追加
self.addEventListener('install', event => {
  self.skipWaiting(); // 🌟【追加】スマホに「遠慮せずすぐ進化して！」と命令する隠し味
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// アクティベート時に古いキャッシュを即座に消去し、アプリ全体を支配する
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
    }).then(() => self.clients.claim()) // 🌟【追加】開いている画面を即座に最新にする処理
  );
});

// キャッシュがあればそれを返し、なければネットワークから取得
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
