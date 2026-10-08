/**
 * CAPA DE NEGOCIO (Business Logic Layer)
 * ConectaYungay - Servicios de Rutas y Distancias
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.Service = (function () {
    const { LUGARES, RECORRIDOS, DESCUENTOS } = ConectaYungay.Data;

    /**
     * Devuelve los hitos de un recorrido en orden, con sus coordenadas.
     * Un hito sin coordenadas se omite y se registra como error: no se dibuja
     * en un punto inventado que haría ver una ruta falsa.
     * @param {string} recorridoId - id del recorrido (ej. 'cumming', 'quintanormal')
     * @returns {Array<{name, lat, lng}>}
     */
    function getRoute(recorridoId) {
        const recorrido = RECORRIDOS.find(r => r.id === recorridoId);
        if (!recorrido) {
            throw new Error(`No existe el recorrido "${recorridoId}".`);
        }

        return recorrido.paradas
            .slice()
            .sort((a, b) => a.orden - b.orden)
            .reduce((nodes, parada) => {
                const c = LUGARES[parada.lugar];
                if (!c) {
                    console.error(`[Service] Sin coordenadas para el hito: "${parada.lugar}". Se omite.`);
                    return nodes;
                }
                nodes.push({ name: parada.lugar, lat: c.lat, lng: c.lng });
                return nodes;
            }, []);
    }

    /**
     * Devuelve los locales con descuento que tienen coordenadas válidas,
     * para que ninguno aparezca con una distancia falsa.
     * @returns {Array<{category, name, address, lat, lng}>}
     */
    function getDiscounts() {
        return DESCUENTOS.filter(d => {
            const ok = Number.isFinite(d.lat) && Number.isFinite(d.lng);
            if (!ok) console.error(`[Service] Sin coordenadas para el descuento: "${d.name}". Se omite.`);
            return ok;
        }).map(d => ({ ...d }));
    }

    /**
     * Calcula la distancia en metros entre dos puntos geográficos usando la fórmula de Haversine
     * @param {number} lat1 - Latitud punto 1
     * @param {number} lon1 - Longitud punto 1
     * @param {number} lat2 - Latitud punto 2
     * @param {number} lon2 - Longitud punto 2
     * @returns {number} Distancia en metros
     */
    function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Radio de la Tierra en metros
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en metros
    }

    /**
     * Filtra los locales de descuento recomendados más cercanos a una coordenada dada.
     * Selecciona exactamente la cafetería, el restaurante y la heladería más cercanos.
     * @param {Object} coords - Coordenadas del punto actual { lat, lng }
     * @param {Array} discountsList - Lista completa de descuentos cargada desde el repositorio
     * @returns {Object} Un objeto con { cafeteria, restaurante, heladeria } más cercanos
     */
    function getClosestDiscounts(coords, discountsList) {
        const { lat, lng } = coords;
        
        let closestCafeteria = null;
        let closestRestaurant = null;
        let closestIceCream = null;
        
        let minCafeteriaDist = Infinity;
        let minRestaurantDist = Infinity;
        let minIceCreamDist = Infinity;

        discountsList.forEach(place => {
            const distance = calculateHaversineDistance(lat, lng, place.lat, place.lng);
            const placeWithDist = { ...place, distance: Math.round(distance) };

            if (place.category === 'cafeterias') {
                if (distance < minCafeteriaDist) {
                    minCafeteriaDist = distance;
                    closestCafeteria = placeWithDist;
                }
            } else if (place.category === 'restaurantes') {
                if (distance < minRestaurantDist) {
                    minRestaurantDist = distance;
                    closestRestaurant = placeWithDist;
                }
            } else if (place.category === 'heladerias') {
                if (distance < minIceCreamDist) {
                    minIceCreamDist = distance;
                    closestIceCream = placeWithDist;
                }
            }
        });

        return {
            cafeteria: closestCafeteria,
            restaurante: closestRestaurant,
            heladeria: closestIceCream
        };
    }

    return {
        getRoute,
        getDiscounts,
        calculateHaversineDistance,
        getClosestDiscounts
    };
})();
