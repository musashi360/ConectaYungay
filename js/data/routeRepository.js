/**
 * CAPA DE DATOS (Data Access Layer)
 * ConectaYungay - Repositorio de Rutas y Descuentos
 * Coordenadas GPS reales de cada hito — para uso con Leaflet.js
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.Repository = (function () {

    // Coordenadas GPS reales (lat/lng) de cada hito del recorrido
    // Basadas en las direcciones oficiales de cada lugar en Barrio Yungay, Santiago
    const NODE_COORDINATES = {
        "Metro Cumming":                   { lat: -33.43910, lng: -70.66861 },
        "Teatro Novedades":                { lat: -33.43820, lng: -70.67075 },
        "Estudio Caffarena":               { lat: -33.44075, lng: -70.67725 },
        "Casa Chilota":                    { lat: -33.43720, lng: -70.66940 },
        "Espacio Arte Yungay":             { lat: -33.43720, lng: -70.67200 },
        "Yungay Histórico":                { lat: -33.43870, lng: -70.67330 },
        "Museo del Sonido":                { lat: -33.44180, lng: -70.67470 },
        "Nave":                            { lat: -33.44130, lng: -70.67330 },
        "Casa Arpa":                       { lat: -33.44050, lng: -70.66950 },
        "Casa Museo Peluquería Francesa":  { lat: -33.44060, lng: -70.67290 },
        "Casona Compañía":                 { lat: -33.44055, lng: -70.67205 },
        "Museo G. Mistral":                { lat: -33.44070, lng: -70.67730 },
        "Parroquia San Saturnino":         { lat: -33.43880, lng: -70.67340 },
        "Palacio de Adobe":                { lat: -33.43700, lng: -70.66800 },
        "Espacio 330":                     { lat: -33.44115, lng: -70.67595 },
        "Biblioteca de Santiago":          { lat: -33.44380, lng: -70.68020 },
        "Matucana 100":                    { lat: -33.44520, lng: -70.67980 },
        "MAC / Violeta Parra":             { lat: -33.44130, lng: -70.67995 },
        "Museo de la Memoria y DDHH":      { lat: -33.44085, lng: -70.67990 },
        "Metro Quinta Normal":             { lat: -33.44039, lng: -70.68031 }
    };

    // Coordenadas GPS reales de los locales con descuento
    const DISCOUNT_COORDINATES = {
        "Café Cité":                      { lat: -33.44055, lng: -70.67205 },
        "Café Brunet":                    { lat: -33.44050, lng: -70.67285 },
        "Mingus Coffee":                  { lat: -33.44180, lng: -70.67470 },
        "Planta Café":                    { lat: -33.44115, lng: -70.67595 },
        "Cafetería Popular":              { lat: -33.44120, lng: -70.67580 },
        "Un Café Y Algo Más":             { lat: -33.43920, lng: -70.67100 },
        "Espacio Gárgola":                { lat: -33.44112, lng: -70.67570 },
        "Café100":                        { lat: -33.44520, lng: -70.67980 },
        "Puente Café":                    { lat: -33.44380, lng: -70.68020 },
        "Café Estación":                  { lat: -33.44039, lng: -70.68031 },
        "Fogón Andino":                   { lat: -33.44285, lng: -70.67800 },
        "Fuente Mardoqueo":               { lat: -33.44000, lng: -70.67260 },
        "Zarita":                         { lat: -33.44080, lng: -70.67720 },
        "El Huaso Enrique":               { lat: -33.44130, lng: -70.67400 },
        "Na Que Ver, Cocineria Chilena":  { lat: -33.44250, lng: -70.67050 },
        "Sweet Gelateria":                { lat: -33.43990, lng: -70.67445 },
        "Grido Helado":                   { lat: -33.43100, lng: -70.67400 },
        "Ice Bar":                        { lat: -33.43900, lng: -70.65500 },
        "Amavi Heladería y Cafetería":    { lat: -33.43050, lng: -70.66200 },
        "Filippo":                        { lat: -33.43950, lng: -70.66100 }
    };

    // FALLBACKS LOCALES — recorridos completos en texto plano
    const CUMMING_ROUTE_FALLBACK = [
        "Metro Cumming", "Teatro Novedades", "Estudio Caffarena", "Casa Chilota",
        "Espacio Arte Yungay", "Yungay Histórico", "Museo del Sonido", "Nave",
        "Casa Arpa", "Casa Museo Peluquería Francesa", "Casona Compañía",
        "Museo G. Mistral", "Parroquia San Saturnino", "Palacio de Adobe",
        "Espacio 330", "Biblioteca de Santiago", "Matucana 100",
        "MAC / Violeta Parra", "Museo de la Memoria y DDHH"
    ];

    const QUINTA_NORMAL_ROUTE_FALLBACK = [
        "Metro Quinta Normal", "Museo de la Memoria y DDHH", "MAC / Violeta Parra",
        "Biblioteca de Santiago", "Matucana 100", "Palacio de Adobe", "Espacio 330",
        "Parroquia San Saturnino", "Casona Compañía", "Museo G. Mistral",
        "Yungay Histórico", "Museo del Sonido", "Nave", "Casa Arpa",
        "Casa Museo Peluquería Francesa", "Estudio Caffarena", "Teatro Novedades",
        "Casa Chilota", "Espacio Arte Yungay"
    ];

    const DISCOUNTS_FALLBACK = [
        { category: 'cafeterias',   name: 'Café Cité',                     address: 'Compañía de Jesús 2820' },
        { category: 'cafeterias',   name: 'Café Brunet',                   address: 'Compañía de Jesús 2695' },
        { category: 'cafeterias',   name: 'Mingus Coffee',                 address: 'Huérfanos 2919' },
        { category: 'cafeterias',   name: 'Planta Café',                   address: 'Maipú 330' },
        { category: 'cafeterias',   name: 'Cafetería Popular',             address: 'Maipú 363' },
        { category: 'cafeterias',   name: 'Un Café Y Algo Más',            address: 'Catedral 2802' },
        { category: 'cafeterias',   name: 'Espacio Gárgola',               address: 'Maipú 357' },
        { category: 'cafeterias',   name: 'Café100',                       address: 'Av. Matucana 100' },
        { category: 'cafeterias',   name: 'Puente Café',                   address: 'Av. Matucana 151' },
        { category: 'cafeterias',   name: 'Café Estación',                 address: 'Av. Matucana 4' },
        { category: 'restaurantes', name: 'Fogón Andino',                  address: 'Erasmo Escala 3133' },
        { category: 'restaurantes', name: 'Fuente Mardoqueo',              address: 'Libertad 551' },
        { category: 'restaurantes', name: 'Zarita',                        address: 'Compañía de Jesús 3023' },
        { category: 'restaurantes', name: 'El Huaso Enrique',              address: 'Maipú 462' },
        { category: 'restaurantes', name: 'Na Que Ver, Cocineria Chilena', address: 'Gral. Bulnes 41' },
        { category: 'heladerias',   name: 'Sweet Gelateria',               address: 'Catedral 2913' },
        { category: 'heladerias',   name: 'Grido Helado',                  address: 'Av. Mapocho 2821' },
        { category: 'heladerias',   name: 'Ice Bar',                       address: 'Compañía de Jesús 2129' },
        { category: 'heladerias',   name: 'Amavi Heladería y Cafetería',   address: 'Av. Mapocho 2346' },
        { category: 'heladerias',   name: 'Filippo',                       address: 'Av. Brasil 327' }
    ];

    async function getRoute(origin) {
        const fileName = origin === 'cumming'
            ? 'data/Recorrido Metro Cumming.txt'
            : 'data/Recorrido Metro Quinta Normal.txt';
        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const text = await response.text();
            const names = text.split(/→|->/).map(n => n.trim()).filter(Boolean);
            return mapNamesToNodes(names);
        } catch (e) {
            console.warn('Usando datos de respaldo para la ruta.');
            const names = origin === 'cumming' ? CUMMING_ROUTE_FALLBACK : QUINTA_NORMAL_ROUTE_FALLBACK;
            return mapNamesToNodes(names);
        }
    }

    // Un hito sin coordenadas se omite y se registra como error: no se dibuja
    // en un punto inventado que haría ver una ruta falsa.
    function mapNamesToNodes(names) {
        return names.reduce((nodes, name) => {
            const c = NODE_COORDINATES[name];
            if (!c) {
                console.error(`[Repository] Sin coordenadas para el hito: "${name}". Se omite.`);
                return nodes;
            }
            nodes.push({ name, lat: c.lat, lng: c.lng });
            return nodes;
        }, []);
    }

    async function getDiscounts() {
        try {
            const response = await fetch('data/Descuentos.txt');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const text = await response.text();
            const lines = text.split('\n').map(l => l.trim());
            const discounts = [];
            let cat = '';
            for (const line of lines) {
                if (!line) continue;
                if (line === 'Cafeterías')  { cat = 'cafeterias';   continue; }
                if (line === 'Restaurantes') { cat = 'restaurantes'; continue; }
                if (line === 'Heladerías')   { cat = 'heladerias';   continue; }
                const parts = line.split(/—|-/);
                if (parts.length >= 2) {
                    const name    = parts[0].trim();
                    const address = parts.slice(1).join('-').trim();
                    discounts.push(withCoordinates({ category: cat, name, address }));
                }
            }
            return discounts.filter(Boolean);
        } catch (e) {
            console.warn('Usando datos de respaldo para descuentos.');
            return DISCOUNTS_FALLBACK.map(item => withCoordinates({ ...item })).filter(Boolean);
        }
    }

    // Agrega lat/lng desde DISCOUNT_COORDINATES. Si no hay coordenadas, devuelve null
    // para que el local no aparezca con una distancia falsa.
    function withCoordinates(discount) {
        const c = DISCOUNT_COORDINATES[discount.name];
        if (!c) {
            console.error(`[Repository] Sin coordenadas para el descuento: "${discount.name}". Se omite.`);
            return null;
        }
        return { ...discount, lat: c.lat, lng: c.lng };
    }

    return { getRoute, getDiscounts };
})();
