/**
 * CAPA DE DATOS (Modelo — Locales con descuento)
 * ConectaYungay — Cafeterías, restaurantes y heladerías asociadas
 *
 * Solo estructura: categoría, nombre, dirección y coordenadas GPS.
 * Coordenadas geocodificadas desde la dirección en OpenStreetMap.
 * Categorías válidas: 'cafeterias' | 'restaurantes' | 'heladerias'.
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.DESCUENTOS = [
    { category: 'cafeterias',   name: 'Café Cité',                     address: 'Compañía de Jesús 2820',          lat: -33.441143, lng: -70.674440 },
    { category: 'cafeterias',   name: 'Café Brunet',                   address: 'Compañía de Jesús 2695',          lat: -33.440731, lng: -70.673192 },
    { category: 'cafeterias',   name: 'Mingus Coffee',                 address: 'Huérfanos 2919',                  lat: -33.442168, lng: -70.675866 },
    { category: 'cafeterias',   name: 'Planta Café',                   address: 'Maipú 330',                       lat: -33.441969, lng: -70.676742 },
    { category: 'cafeterias',   name: 'Cafetería Popular',             address: 'Maipú 363',                       lat: -33.441584, lng: -70.676377 },
    { category: 'cafeterias',   name: 'Un Café Y Algo Más',            address: 'Catedral 2802',                   lat: -33.439860, lng: -70.674550 },
    { category: 'cafeterias',   name: 'Espacio Gárgola',               address: 'Maipú 357',                       lat: -33.441660, lng: -70.676344 },
    { category: 'cafeterias',   name: 'Café100',                       address: 'Av. Matucana 100',                lat: -33.444738, lng: -70.679919 },
    { category: 'cafeterias',   name: 'Puente Café',                   address: 'Av. Matucana 151',                lat: -33.444448, lng: -70.678671 },
    { category: 'cafeterias',   name: 'Café Estación',                 address: 'Av. Matucana 4',                  lat: -33.449350, lng: -70.679750 },
    { category: 'restaurantes', name: 'Fogón Andino',                  address: 'Erasmo Escala 3133',              lat: -33.446130, lng: -70.677585 },
    { category: 'restaurantes', name: 'Fuente Mardoqueo',              address: 'Libertad 551',                    lat: -33.438930, lng: -70.674224 },
    { category: 'restaurantes', name: 'Zarita',                        address: 'Compañía de Jesús 3023',          lat: -33.441186, lng: -70.676866 },
    { category: 'restaurantes', name: 'El Huaso Enrique',              address: 'Maipú 462',                       lat: -33.440495, lng: -70.676784 },
    { category: 'restaurantes', name: 'Na Que Ver, Cocineria Chilena', address: 'Gral. Bulnes 41',                 lat: -33.445918, lng: -70.669291 },
    { category: 'heladerias',   name: 'Sweet Gelateria',               address: 'Catedral 2913 (esquina Esperanza)', lat: -33.439792, lng: -70.675903 },
    { category: 'heladerias',   name: 'Grido Helado',                  address: 'Av. Mapocho 2821',                lat: -33.432401, lng: -70.675170 },
    { category: 'heladerias',   name: 'Ice Bar',                       address: 'Compañía de Jesús 2129',          lat: -33.440115, lng: -70.667160 },
    { category: 'heladerias',   name: 'Amavi Heladería y Cafetería',   address: 'Av. Mapocho 2346',                lat: -33.432242, lng: -70.669982 },
    { category: 'heladerias',   name: 'Filippo',                       address: 'Av. Brasil 327',                  lat: -33.440686, lng: -70.664792 }
];
