/**
 * CAPA DE DATOS (Modelo — Lugares)
 * ConectaYungay — Hitos que pueden formar parte de un recorrido
 *
 * Solo estructura: cada lugar tiene su dirección y coordenadas GPS (lat/lng).
 * Las coordenadas se obtuvieron geocodificando la dirección en OpenStreetMap
 * (Nominatim/Overpass) y apuntan al edificio o a la cuadra del lugar.
 * El nombre es la clave que usan los recorridos (ver routes.js).
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.LUGARES = {
    // Estaciones de metro (punto de partida de los recorridos)
    "Metro Quinta Normal":                    { direccion: 'Av. Matucana 501',                          lat: -33.440368, lng: -70.680291 },
    "Metro Cumming":                          { direccion: 'Catedral con Av. Ricardo Cumming',          lat: -33.439144, lng: -70.668534 },

    // Hitos
    "Museo de la Memoria y los Derechos Humanos": { direccion: 'Av. Matucana 501',                      lat: -33.439744, lng: -70.679405 },
    "Museo de la Educación Gabriela Mistral": { direccion: 'Compañía de Jesús 3150',                    lat: -33.441749, lng: -70.678280 },
    "Pasaje Adriana Cousiño":                 { direccion: 'Adriana Cousiño 375',                       lat: -33.441865, lng: -70.677096 },
    "Espacio 330":                            { direccion: 'Maipú 330',                                 lat: -33.441964, lng: -70.676637 },
    "Cité Lucrecia Valdés de Barros Borgoño": { direccion: 'Lucrecia Valdés de Barros Borgoño 343-367', lat: -33.441765, lng: -70.676035 },
    "Museo del Sonido":                       { direccion: 'Huérfanos 2919',                            lat: -33.442190, lng: -70.675806 },
    "Yungay Histórico":                       { direccion: 'Huérfanos 2896',                            lat: -33.442414, lng: -70.675240 },
    "Iglesia de San Antonio de Padua":        { direccion: 'Catedral 2345',                             lat: -33.439132, lng: -70.669391 },
    "Plaza Libertad (mural)":                 { direccion: 'Libertad 499',                              lat: -33.440066, lng: -70.674157 },
    "Parroquia San Saturnino":                { direccion: 'Santo Domingo 2772',                        lat: -33.438271, lng: -70.674251 },
    "Plaza Yungay":                           { direccion: 'Santo Domingo 2745-2799',                   lat: -33.437687, lng: -70.674019 },
    "Casa de Ignacio Domeyko":                { direccion: 'Cueto 572',                                 lat: -33.438513, lng: -70.672721 },
    "Peluquería Francesa":                    { direccion: 'Compañía de Jesús 2789',                    lat: -33.440873, lng: -70.674105 }
};
