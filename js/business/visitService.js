/**
 * CAPA DE NEGOCIO (Business Layer — Visitas y clics)
 * ConectaYungay — Registra la visita y los clics en los hitos del recorrido
 *
 * Flujo:
 *   1. La encuesta guarda sus respuestas en el navegador (guardarRespuestas).
 *   2. Al elegir origen (Metro Cumming / Quinta Normal) se crea una fila en
 *      "visitas" con esas respuestas y el origen (iniciarVisita).
 *   3. Cada clic en un hito del recorrido crea una fila en "clics_info"
 *      (registrarClic). Si no hubo encuesta, el clic queda sin visita asociada.
 *
 * Los errores de red no bloquean la app: solo se registran en consola.
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.VisitService = (function () {
    const RESPUESTAS_KEY = 'conectayungay_respuestas';

    // Promesa con el id de la visita en curso (null si no hay visita o no se guardó)
    let visitaPendiente = Promise.resolve(null);

    // ─────────────────────────────────────────────
    //  RESPUESTAS DE LA ENCUESTA (guardadas en el navegador)
    // ─────────────────────────────────────────────
    function guardarRespuestas(respuestas) {
        try {
            localStorage.setItem(RESPUESTAS_KEY, JSON.stringify(respuestas));
        } catch (e) { }
    }

    function leerRespuestas() {
        try {
            const raw = localStorage.getItem(RESPUESTAS_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    // ─────────────────────────────────────────────
    //  VISITA Y CLICS
    // ─────────────────────────────────────────────
    /**
     * Crea la fila de "visitas" para el origen elegido, si el visitante respondió la encuesta.
     * @param {'cumming'|'quintanormal'} origen
     */
    function iniciarVisita(origen) {
        const respuestas = leerRespuestas();
        if (!respuestas) {
            visitaPendiente = Promise.resolve(null);
            return;
        }

        const id = generarUUID();
        const fila = {
            id,
            edad: respuestas.edad,
            nacionalidad: respuestas.nacionalidad,
            comuna: respuestas.comuna,
            motivo: respuestas.motivo,
            origen
        };

        visitaPendiente = ConectaYungay.SurveyRepository.insert('visitas', fila)
            .then(() => id)
            .catch(err => {
                console.warn('Visita no guardada:', err);
                return null;
            });
    }

    /**
     * Registra un clic en un hito del recorrido. Espera a que la visita esté
     * guardada para poder asociarla (clave foránea).
     * @param {string} puntoInteres - nombre del hito
     */
    function registrarClic(puntoInteres) {
        visitaPendiente
            .then(visitaId => ConectaYungay.SurveyRepository.insert('clics_info', {
                visita_id: visitaId,
                punto_interes: puntoInteres
            }))
            .catch(err => console.warn('Clic no guardado:', err));
    }

    // ─────────────────────────────────────────────
    //  UTILIDADES
    // ─────────────────────────────────────────────
    function generarUUID() {
        if (window.crypto && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        // Fallback UUID v4 para navegadores sin randomUUID
        const b = crypto.getRandomValues(new Uint8Array(16));
        b[6] = (b[6] & 0x0f) | 0x40;
        b[8] = (b[8] & 0x3f) | 0x80;
        const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
        return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
    }

    return { guardarRespuestas, iniciarVisita, registrarClic };

})();
