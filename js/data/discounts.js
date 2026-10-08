/**
 * CAPA DE DATOS (Modelo — Locales con descuento)
 * ConectaYungay — Cafeterías, restaurantes y heladerías asociadas
 *
 * Solo estructura: categoría, nombre, dirección y coordenadas GPS reales.
 * Categorías válidas: 'cafeterias' | 'restaurantes' | 'heladerias'.
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.DESCUENTOS = [
    { category: 'cafeterias',   name: 'Café Cité',                     address: 'Compañía de Jesús 2820',          lat: -33.44055, lng: -70.67205 },
    { category: 'cafeterias',   name: 'Café Brunet',                   address: 'Compañía de Jesús 2695',          lat: -33.44050, lng: -70.67285 },
    { category: 'cafeterias',   name: 'Mingus Coffee',                 address: 'Huérfanos 2919',                  lat: -33.44180, lng: -70.67470 },
    { category: 'cafeterias',   name: 'Planta Café',                   address: 'Maipú 330',                       lat: -33.44115, lng: -70.67595 },
    { category: 'cafeterias',   name: 'Cafetería Popular',             address: 'Maipú 363',                       lat: -33.44120, lng: -70.67580 },
    { category: 'cafeterias',   name: 'Un Café Y Algo Más',            address: 'Catedral 2802',                   lat: -33.43920, lng: -70.67100 },
    { category: 'cafeterias',   name: 'Espacio Gárgola',               address: 'Maipú 357',                       lat: -33.44112, lng: -70.67570 },
    { category: 'cafeterias',   name: 'Café100',                       address: 'Av. Matucana 100',                lat: -33.44520, lng: -70.67980 },
    { category: 'cafeterias',   name: 'Puente Café',                   address: 'Av. Matucana 151',                lat: -33.44380, lng: -70.68020 },
    { category: 'cafeterias',   name: 'Café Estación',                 address: 'Av. Matucana 4',                  lat: -33.44039, lng: -70.68031 },
    { category: 'restaurantes', name: 'Fogón Andino',                  address: 'Erasmo Escala 3133',              lat: -33.44285, lng: -70.67800 },
    { category: 'restaurantes', name: 'Fuente Mardoqueo',              address: 'Libertad 551',                    lat: -33.44000, lng: -70.67260 },
    { category: 'restaurantes', name: 'Zarita',                        address: 'Compañía de Jesús 3023',          lat: -33.44080, lng: -70.67720 },
    { category: 'restaurantes', name: 'El Huaso Enrique',              address: 'Maipú 462',                       lat: -33.44130, lng: -70.67400 },
    { category: 'restaurantes', name: 'Na Que Ver, Cocineria Chilena', address: 'Gral. Bulnes 41',                 lat: -33.44250, lng: -70.67050 },
    { category: 'heladerias',   name: 'Sweet Gelateria',               address: 'Catedral 2913 (esquina Esperanza)', lat: -33.43990, lng: -70.67445 },
    { category: 'heladerias',   name: 'Grido Helado',                  address: 'Av. Mapocho 2821',                lat: -33.43100, lng: -70.67400 },
    { category: 'heladerias',   name: 'Ice Bar',                       address: 'Compañía de Jesús 2129',          lat: -33.43900, lng: -70.65500 },
    { category: 'heladerias',   name: 'Amavi Heladería y Cafetería',   address: 'Av. Mapocho 2346',                lat: -33.43050, lng: -70.66200 },
    { category: 'heladerias',   name: 'Filippo',                       address: 'Av. Brasil 327',                  lat: -33.43950, lng: -70.66100 }
];
