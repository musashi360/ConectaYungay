/**
 * CAPA DE DATOS (Modelo — Recorridos)
 * ConectaYungay — Recorridos disponibles y sus paradas
 *
 * Estructura: recorrido → lista de paradas { orden, lugar }.
 *   - "lugar" es la clave del lugar en places.js.
 *   - "estacion" es la estación de metro desde donde parte (la que llega por
 *     el QR: ?origin=cumming | quintanormal).
 *
 * Cada estación puede tener varios recorridos: al volver a abrir la página
 * desde la misma estación, el visitante recibe el siguiente de la lista
 * (A, B, A, B…). Para agregar uno nuevo basta con sumar un objeto aquí.
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.RECORRIDOS = [
    {
        id: 'quintanormal-a',
        estacion: 'quintanormal',
        nombre: 'Recorrido A',
        paradas: [
            { orden: 1, lugar: "Metro Quinta Normal" },
            { orden: 2, lugar: "Museo de la Memoria y los Derechos Humanos" },
            { orden: 3, lugar: "Museo de la Educación Gabriela Mistral" },
            { orden: 4, lugar: "Pasaje Adriana Cousiño" },
            { orden: 5, lugar: "Espacio 330" }
        ]
    },
    {
        id: 'quintanormal-b',
        estacion: 'quintanormal',
        nombre: 'Recorrido B',
        paradas: [
            { orden: 1, lugar: "Metro Quinta Normal" },
            { orden: 2, lugar: "Museo de la Educación Gabriela Mistral" },
            { orden: 3, lugar: "Cité Lucrecia Valdés de Barros Borgoño" },
            { orden: 4, lugar: "Museo del Sonido" },
            { orden: 5, lugar: "Yungay Histórico" }
        ]
    },
    {
        id: 'cumming-a',
        estacion: 'cumming',
        nombre: 'Recorrido A',
        paradas: [
            { orden: 1, lugar: "Metro Cumming" },
            { orden: 2, lugar: "Iglesia de San Antonio de Padua" },
            { orden: 3, lugar: "Plaza Libertad (mural)" },
            { orden: 4, lugar: "Parroquia San Saturnino" },
            { orden: 5, lugar: "Plaza Yungay" }
        ]
    },
    {
        id: 'cumming-b',
        estacion: 'cumming',
        nombre: 'Recorrido B',
        paradas: [
            { orden: 1, lugar: "Metro Cumming" },
            { orden: 2, lugar: "Iglesia de San Antonio de Padua" },
            { orden: 3, lugar: "Casa de Ignacio Domeyko" },
            { orden: 4, lugar: "Plaza Yungay" },
            { orden: 5, lugar: "Peluquería Francesa" }
        ]
    }
];
