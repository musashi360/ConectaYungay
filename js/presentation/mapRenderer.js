/**
 * CAPA DE PRESENTACIÓN (Presentation Layer - Map Renderer)
 * ConectaYungay - Renderizador con Leaflet.js + OpenStreetMap
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.MapRenderer = (function () {
    let map = null;
    let routePolyline = null;
    let markers = [];
    let currentRoute = [];
    let animatedCount = 0;
    let isAnimating = false;

    // Centro del Barrio Yungay
    const CENTER = { lat: -33.4405, lng: -70.6745 };
    const ZOOM   = 15;

    // Colores de la paleta del proyecto
    const COLOR_CRIMSON = '#A7302A';
    const COLOR_GOLD    = '#C88A2A';
    const COLOR_CREAM   = '#F6EFE4';

    /**
     * Crea el ícono SVG personalizado para los nodos del recorrido
     * @param {boolean} isActive - Si es el nodo activo (rojo) o pasado (dorado)
     * @param {number} number - Número del nodo en la ruta
     */
    function createNodeIcon(isActive, number) {
        const color  = isActive ? COLOR_CRIMSON : COLOR_GOLD;
        const size   = isActive ? 32 : 26;
        const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="${color}" stroke="${COLOR_CREAM}" stroke-width="2.5"/>
            <text x="16" y="21" text-anchor="middle" fill="${COLOR_CREAM}"
                  font-family="Outfit, sans-serif" font-size="${isActive ? 13 : 11}" font-weight="bold">${number}</text>
        </svg>`;
        return L.divIcon({
            html: svg,
            className: '',
            iconSize:   [size, size],
            iconAnchor: [size / 2, size / 2],
            popupAnchor:[0, -(size / 2)]
        });
    }

    /**
     * Inicializa el mapa Leaflet en el contenedor indicado
     * @param {string} containerId - ID del div contenedor del mapa
     */
    function init(containerId) {
        if (typeof L === 'undefined') {
            throw new Error('Leaflet (L) no está disponible. Verifica tu conexión a internet.');
        }
        if (map) { map.remove(); map = null; }
        markers = [];
        currentRoute = [];
        animatedCount = 0;

        map = L.map(containerId, {
            center:         [CENTER.lat, CENTER.lng],
            zoom:           ZOOM,
            zoomControl:    true,
            scrollWheelZoom: true
        });

        // Tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(map);
    }

    /**
     * Limpia marcadores y líneas del mapa, sin destruir el mapa
     */
    function clearRoute() {
        markers.forEach(m => map.removeLayer(m));
        markers = [];
        if (routePolyline) { map.removeLayer(routePolyline); routePolyline = null; }
        animatedCount = 0;
        isAnimating = false;
    }

    /**
     * Anima el recorrido añadiendo un nodo cada `intervalMs` ms
     * @param {Array}    routeNodes  - Nodos cargados del repositorio
     * @param {Function} onNodeAdded - Callback al agregar cada nodo
     * @param {number}   intervalMs  - Milisegundos entre nodo y nodo (defecto 350)
     */
    function animateRoute(routeNodes, onNodeAdded, intervalMs = 350) {
        if (!map) return;
        clearRoute();
        isAnimating   = true;
        currentRoute  = routeNodes;
        animatedCount = 0;

        const latlngs = [];

        function addNext() {
            if (!isAnimating || animatedCount >= currentRoute.length) return;

            const node    = currentRoute[animatedCount];
            const number  = animatedCount + 1;
            const isFirst = animatedCount === 0;

            // Desmarcar el anterior como activo
            if (animatedCount > 0 && markers[animatedCount - 1]) {
                markers[animatedCount - 1].setIcon(createNodeIcon(false, animatedCount));
            }

            // Añadir marcador activo
            const marker = L.marker([node.lat, node.lng], {
                icon:      createNodeIcon(true, number),
                zIndexOffset: 1000
            }).addTo(map);

            marker.bindPopup(`
                <div style="font-family:'Outfit',sans-serif;text-align:center;min-width:140px">
                    <strong style="color:${COLOR_CRIMSON};font-size:14px">${number}. ${node.name}</strong>
                </div>
            `);
            markers.push(marker);

            // Añadir segmento de polyline
            latlngs.push([node.lat, node.lng]);
            if (routePolyline) {
                map.removeLayer(routePolyline);
            }
            routePolyline = L.polyline(latlngs, {
                color:     COLOR_CRIMSON,
                weight:    4,
                opacity:   0.85,
                lineJoin:  'round',
                lineCap:   'round',
                dashArray: null
            }).addTo(map);

            // Mover el mapa suavemente al nuevo nodo si es el primero o hay cambio de zona
            if (isFirst || animatedCount % 4 === 0) {
                map.panTo([node.lat, node.lng], { animate: true, duration: 0.5 });
            }

            animatedCount++;
            if (onNodeAdded) onNodeAdded(node, animatedCount - 1);

            if (animatedCount < currentRoute.length) {
                setTimeout(addNext, intervalMs);
            } else {
                // Al terminar: centrar el mapa para ver toda la ruta
                map.fitBounds(routePolyline.getBounds(), { padding: [40, 40], animate: true });
            }
        }

        addNext();
    }

    /**
     * Descarga el mapa como imagen PNG usando html2canvas
     * @param {string} routeName - Nombre para el archivo
     */
    function downloadMap(routeName) {
        if (!map) return;
        const mapEl = map.getContainer();
        // html2canvas está cargado desde CDN en index.html
        if (typeof html2canvas === 'undefined') {
            alert('La librería de captura no está disponible. Asegúrate de tener conexión a internet.');
            return;
        }
        html2canvas(mapEl, {
            useCORS:    true,
            allowTaint: true,
            scale:      2
        }).then(canvas => {
            const link     = document.createElement('a');
            link.download  = `recorrido-${routeName.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href      = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(err => {
            console.error('Error al exportar el mapa:', err);
            alert('No se pudo exportar el mapa. Intenta de nuevo en unos segundos.');
        });
    }

    /**
     * Recentra el mapa en el Barrio Yungay
     */
    function resetView() {
        if (map) map.setView([CENTER.lat, CENTER.lng], ZOOM);
    }

    return { init, animateRoute, downloadMap, clearRoute, resetView };
})();
