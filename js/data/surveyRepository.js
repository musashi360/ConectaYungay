/**
 * CAPA DE DATOS (Data Access Layer — Visitas y clics en Supabase)
 * ConectaYungay — Inserta filas en las tablas "visitas" y "clics_info"
 *
 * La clave publicable (anon) es pública por diseño. La protección real está en
 * las tablas: RLS activo y una política que solo permite INSERT a usuarios
 * anónimos (ver supabase/visitas_y_clics.sql). Nadie puede leer los datos
 * desde el navegador.
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.SurveyRepository = (function () {

    const SUPABASE_URL = 'https://nsevebyyjlixehekoqxi.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_b1o9cpMZKk9uZu9Ov8gwqw_atm0K_HQ';
    const TIMEOUT_MS = 8000;

    /**
     * Inserta una fila en una tabla de Supabase.
     * @param {'visitas'|'clics_info'} tabla
     * @param {object} fila
     * @returns {Promise<void>} rechaza si Supabase responde con error o no hay conexión
     */
    async function insert(tabla, fila) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${tabla}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(fila),
                signal: controller.signal
            });
            if (!res.ok) {
                throw new Error(`Supabase respondió ${res.status} al insertar en ${tabla}`);
            }
        } finally {
            clearTimeout(timer);
        }
    }

    return { insert };

})();
