// Ritmo · © AitoROCKET apps
const CACHE = 'ritmo-946c7cb592e1';
const ARCHIVOS = ["./","app.js","fonts/texto.woff2","fonts/titulos.woff2","icono-180.png","icono-192.png","icono-512.png","index.html","lib/leaflet/images/layers-2x.png","lib/leaflet/images/layers.png","lib/leaflet/images/marker-icon-2x.png","lib/leaflet/images/marker-icon.png","lib/leaflet/images/marker-shadow.png","lib/leaflet/leaflet-maplibre-gl.js","lib/leaflet/leaflet.css","lib/leaflet/leaflet.js","lib/leaflet/maplibre-gl.css","lib/leaflet/maplibre-gl.js","manifest.webmanifest","motor.js","tutorial.js"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // el mapa y las búsquedas van por internet
  // Primero lo nuevo (si hay internet); si no, lo guardado
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
});
