const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
  '/',
  '/index.html',
  'materialize.min.css',
  'style.css',
  'home.html',
  'app.js',
  'materialize.min.js',
  'ui.js',
  'about.html',
  'web1.png',
  'create.html',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'firebase.js',
  'avatar.png',
  'contact.html',
  'login page.html',
  'login.css',
  'login.js',
  'report.html',
  'seedetails.html',
  'signup.html',
  'style1.css'
];

self.addEventListener('install', evt => {
  console.log('SW Installed', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  console.log('SW Activated', evt);
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  console.log('Fetch event', evt);
  if (
    evt.request.url.indexOf('firestore.googleapis.com') === -1 &&
    evt.request.url.indexOf('firebase-firestore') === -1 &&
    evt.request.url.indexOf('firebase') === -1
  ) {
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return (
          cacheRes ||
          fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
              if (evt.request.method === 'GET') {
                cache.put(evt.request, fetchRes.clone());
              }
              return fetchRes;
            });
          })
        );
      })
    );
  }
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'sw-install') {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
});
