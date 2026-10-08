/**
 * CAPA DE DATOS (Modelo — Lugares)
 * ConectaYungay — Hitos que pueden formar parte de un recorrido
 *
 * Solo estructura: cada lugar tiene su nombre y coordenadas GPS reales (lat/lng)
 * según la dirección oficial del lugar en Barrio Yungay, Santiago.
 * El nombre es la clave que usan los recorridos (ver routes.js).
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.LUGARES = {
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
