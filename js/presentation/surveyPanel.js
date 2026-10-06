/**
 * CAPA DE PRESENTACIÓN (Presentation Layer — Encuesta de visitantes)
 * ConectaYungay — Muestra la encuesta antes de la bienvenida
 *
 * Se muestra una sola vez por navegador. Las respuestas se guardan en el
 * navegador y se envían a Supabase al elegir origen (ver visitService.js).
 * Responder o "Prefiero no responder" marca la encuesta como vista.
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.Survey = (function () {
    const STORAGE_KEY = 'conectayungay_encuesta_vista';
    const PAIS_CHILE = 'Chile';

    let onDone = null;
    const DOM = {};

    // ─────────────────────────────────────────────
    //  ARRANQUE
    // ─────────────────────────────────────────────
    /**
     * Muestra la encuesta si el navegador aún no la vio; si ya la vio, llama
     * directamente a `callback`.
     * @param {Function} callback - se ejecuta al terminar la encuesta
     */
    function run(callback) {
        onDone = callback;

        if (wasSeen()) {
            callback();
            return;
        }

        DOM.screen = document.getElementById('survey-screen');
        DOM.welcome = document.getElementById('welcome-screen');
        DOM.form = document.getElementById('survey-form');
        DOM.edad = document.getElementById('survey-edad');
        DOM.nacionalidad = document.getElementById('survey-nacionalidad');
        DOM.comunaField = document.getElementById('survey-comuna-field');
        DOM.comuna = document.getElementById('survey-comuna');
        DOM.error = document.getElementById('survey-error');
        DOM.skip = document.getElementById('survey-skip');

        poblarSelectores();

        DOM.nacionalidad.addEventListener('change', actualizarComuna);
        DOM.form.addEventListener('submit', enviar);
        DOM.skip.addEventListener('click', omitir);

        DOM.welcome.classList.add('hidden');
        DOM.screen.classList.remove('hidden');
    }

    // ─────────────────────────────────────────────
    //  SELECTORES (países y comunas)
    // ─────────────────────────────────────────────
    function poblarSelectores() {
        const { PAISES, COMUNAS_POR_REGION } = ConectaYungay.SurveyCatalogs;

        PAISES.slice()
            .sort((a, b) => a.localeCompare(b, 'es'))
            .forEach(pais => DOM.nacionalidad.appendChild(crearOpcion(pais, pais)));

        Object.keys(COMUNAS_POR_REGION).forEach(region => {
            const grupo = document.createElement('optgroup');
            grupo.label = region;
            COMUNAS_POR_REGION[region]
                .slice()
                .sort((a, b) => a.localeCompare(b, 'es'))
                .forEach(comuna => grupo.appendChild(crearOpcion(comuna, comuna)));
            DOM.comuna.appendChild(grupo);
        });
    }

    function crearOpcion(valor, texto) {
        const opt = document.createElement('option');
        opt.value = valor;
        opt.textContent = texto;
        return opt;
    }

    function actualizarComuna() {
        const esChile = DOM.nacionalidad.value === PAIS_CHILE;
        DOM.comunaField.classList.toggle('hidden', !esChile);
        if (!esChile) DOM.comuna.value = '';
    }

    // ─────────────────────────────────────────────
    //  ENVÍO Y OMISIÓN
    // ─────────────────────────────────────────────
    function enviar(e) {
        e.preventDefault();
        mostrarError('');

        const resultado = leerFormulario();
        if (resultado.error) {
            mostrarError(resultado.error);
            return;
        }

        // Sin ninguna respuesta no hay nada que guardar: se trata como omitida
        if (resultado.data) {
            ConectaYungay.VisitService.guardarRespuestas(resultado.data);
        }
        terminar();
    }

    function omitir() {
        terminar();
    }

    /**
     * Si el visitante responde algo, la visita exige edad, nacionalidad y motivo
     * (la tabla no admite nulos). La comuna es obligatoria solo si es de Chile.
     */
    function leerFormulario() {
        const edadTexto = DOM.edad.value.trim();
        const nacionalidad = DOM.nacionalidad.value || null;
        const marcado = DOM.form.querySelector('input[name="motivo"]:checked');
        const motivo = marcado ? marcado.value : null;

        if (edadTexto === '' && nacionalidad === null && motivo === null) {
            return { data: null };
        }

        const edad = Number(edadTexto);
        if (edadTexto === '' || !Number.isInteger(edad) || edad < 0 || edad > 120) {
            return { error: 'Indica tu edad (un número entre 0 y 120).' };
        }
        if (nacionalidad === null) {
            return { error: 'Elige tu nacionalidad.' };
        }

        let comuna = null;
        if (nacionalidad === PAIS_CHILE) {
            comuna = DOM.comuna.value || null;
            if (comuna === null) {
                return { error: 'Como eres de Chile, indícanos tu comuna.' };
            }
        }

        if (motivo === null) {
            return { error: 'Elige el motivo de tu visita.' };
        }

        return { data: { edad, nacionalidad, comuna, motivo } };
    }

    // ─────────────────────────────────────────────
    //  ESTADO Y CIERRE
    // ─────────────────────────────────────────────
    function terminar() {
        marcarVista();
        DOM.screen.classList.add('hidden');
        onDone();
    }

    function mostrarError(texto) {
        DOM.error.textContent = texto;
        DOM.error.classList.toggle('hidden', texto === '');
    }

    function wasSeen() {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function marcarVista() {
        try {
            localStorage.setItem(STORAGE_KEY, '1');
        } catch (e) { }
    }

    return { run };

})();
