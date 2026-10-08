/**
 * CAPA DE DATOS (Modelo — Recorridos)
 * ConectaYungay — Recorridos disponibles y sus paradas
 *
 * Estructura: recorrido → lista de paradas { lugar, orden }.
 * "lugar" es la clave del lugar en places.js. Para agregar un recorrido nuevo
 * basta con sumar un objeto a esta lista; el id es el que llega por el QR
 * (?origin=<id>).
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.RECORRIDOS = [
    {
        id: 'cumming',
        nombre: 'Metro Cumming',
        paradas: [
            { orden: 1,  lugar: "Metro Cumming" },
            { orden: 2,  lugar: "Teatro Novedades" },
            { orden: 3,  lugar: "Estudio Caffarena" },
            { orden: 4,  lugar: "Casa Chilota" },
            { orden: 5,  lugar: "Espacio Arte Yungay" },
            { orden: 6,  lugar: "Yungay Histórico" },
            { orden: 7,  lugar: "Museo del Sonido" },
            { orden: 8,  lugar: "Nave" },
            { orden: 9,  lugar: "Casa Arpa" },
            { orden: 10, lugar: "Casa Museo Peluquería Francesa" },
            { orden: 11, lugar: "Casona Compañía" },
            { orden: 12, lugar: "Museo G. Mistral" },
            { orden: 13, lugar: "Parroquia San Saturnino" },
            { orden: 14, lugar: "Palacio de Adobe" },
            { orden: 15, lugar: "Espacio 330" },
            { orden: 16, lugar: "Biblioteca de Santiago" },
            { orden: 17, lugar: "Matucana 100" },
            { orden: 18, lugar: "MAC / Violeta Parra" },
            { orden: 19, lugar: "Museo de la Memoria y DDHH" }
        ]
    },
    {
        id: 'quintanormal',
        nombre: 'Metro Quinta Normal',
        paradas: [
            { orden: 1,  lugar: "Metro Quinta Normal" },
            { orden: 2,  lugar: "Museo de la Memoria y DDHH" },
            { orden: 3,  lugar: "MAC / Violeta Parra" },
            { orden: 4,  lugar: "Biblioteca de Santiago" },
            { orden: 5,  lugar: "Matucana 100" },
            { orden: 6,  lugar: "Palacio de Adobe" },
            { orden: 7,  lugar: "Espacio 330" },
            { orden: 8,  lugar: "Parroquia San Saturnino" },
            { orden: 9,  lugar: "Casona Compañía" },
            { orden: 10, lugar: "Museo G. Mistral" },
            { orden: 11, lugar: "Yungay Histórico" },
            { orden: 12, lugar: "Museo del Sonido" },
            { orden: 13, lugar: "Nave" },
            { orden: 14, lugar: "Casa Arpa" },
            { orden: 15, lugar: "Casa Museo Peluquería Francesa" },
            { orden: 16, lugar: "Estudio Caffarena" },
            { orden: 17, lugar: "Teatro Novedades" },
            { orden: 18, lugar: "Casa Chilota" },
            { orden: 19, lugar: "Espacio Arte Yungay" }
        ]
    }
];
