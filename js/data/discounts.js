/**
 * CAPA DE DATOS (Modelo — Locales con descuento)
 * ConectaYungay — Cafeterías y restaurantes asociados
 *
 * Solo estructura: categoría, nombre, dirección y coordenadas GPS.
 * Coordenadas geocodificadas desde la dirección en OpenStreetMap.
 * Categorías válidas: 'cafeterias' | 'restaurantes' | 'heladerias'.
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.DESCUENTOS = [
    { category: 'cafeterias',   name: 'La Tetería Cleopatra',          address: 'Adriana Cousiño 383',             lat: -33.441485, lng: -70.677138 },
    { category: 'cafeterias',   name: 'Planta Café',                   address: 'Maipú 330',                       lat: -33.441969, lng: -70.676742 },
    { category: 'cafeterias',   name: 'Cafetería Popular',             address: 'Maipú 363',                       lat: -33.441584, lng: -70.676377 },
    { category: 'cafeterias',   name: 'Mingus Café',                   address: 'Huérfanos 2919',                  lat: -33.442168, lng: -70.675866 },
    { category: 'cafeterias',   name: 'Café Cité',                     address: 'Compañía de Jesús 2820',          lat: -33.441143, lng: -70.674440 },
    { category: 'cafeterias',   name: 'Un Café y Algo Más',            address: 'Catedral 2802',                   lat: -33.439860, lng: -70.674550 },
    { category: 'cafeterias',   name: 'Selvaggio Panadería',           address: 'Huérfanos 2744',                  lat: -33.442170, lng: -70.673601 },
    { category: 'cafeterias',   name: 'Café Brunet',                   address: 'Compañía de Jesús 2695',          lat: -33.440731, lng: -70.673192 },
    { category: 'restaurantes', name: 'Restaurante El Verde',          address: 'Huérfanos 3020',                  lat: -33.442250, lng: -70.676650 },
    { category: 'restaurantes', name: 'Restaurante Zarita',            address: 'Compañía de Jesús 3023',          lat: -33.441186, lng: -70.676866 },
    { category: 'restaurantes', name: 'El Chancho Seis',               address: 'Huérfanos 3025',                  lat: -33.442316, lng: -70.676703 },
    { category: 'restaurantes', name: 'Restaurant El Huaso Enrique',   address: 'Maipú 462',                       lat: -33.440495, lng: -70.676784 },
    { category: 'restaurantes', name: 'Restaurante La Gárgola',        address: 'Maipú 357',                       lat: -33.441660, lng: -70.676344 },
    { category: 'restaurantes', name: 'Darkolics Restobar',            address: 'Esperanza 320',                   lat: -33.441921, lng: -70.675644 },
    { category: 'restaurantes', name: 'El Putamadre Restorant',        address: 'Huérfanos 2897',                  lat: -33.442150, lng: -70.675650 },
    { category: 'restaurantes', name: 'Fuente Mardoqueo',              address: 'Libertad 551',                    lat: -33.438930, lng: -70.674224 },
    { category: 'restaurantes', name: 'Boulevard Lavaud Restaurant',   address: 'Compañía de Jesús 2789',          lat: -33.440880, lng: -70.674021 },
    { category: 'restaurantes', name: 'La Trova',                      address: 'Av. Portales 2683',               lat: -33.442842, lng: -70.673005 }
];
