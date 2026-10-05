/**
 * CAPA DE SEGURIDAD (Security Utilities)
 * ConectaYungay — Sanitización y Validación de Datos
 *
 * Propósito:
 *   - Prevenir ataques XSS (Cross-Site Scripting) sanitizando
 *     cualquier string antes de insertarlo en el DOM.
 *   - Validar datos de usuario antes de enviarlos al backend.
 *   - Centralizar toda la lógica de seguridad de datos en un solo módulo.
 *
 * IMPORTANTE: Este módulo solo corre en el cliente.
 *   La validación definitiva SIEMPRE debe hacerse también en el servidor.
 */

window.ConectaYungay = window.ConectaYungay || {};

ConectaYungay.Security = (function () {

    // ─────────────────────────────────────────────────────────────
    //  SANITIZACIÓN — Prevención de XSS
    // ─────────────────────────────────────────────────────────────

    /**
     * Escapa caracteres HTML especiales para prevenir XSS.
     * Usar SIEMPRE antes de insertar strings externos en el DOM con innerHTML.
     *
     * Ejemplo de uso:
     *   element.innerHTML = Security.escapeHTML(userInput);
     *
     * @param {string} str - El string a sanitizar
     * @returns {string} - El string con caracteres peligrosos escapados
     */
    function escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * Sanitiza un string eliminando caracteres de control y espacios extra.
     * Usar para limpiar inputs antes de enviarlos al backend.
     *
     * @param {string} str - El string a limpiar
     * @param {number} [maxLength=500] - Longitud máxima permitida
     * @returns {string} - El string limpio
     */
    function sanitizeInput(str, maxLength = 500) {
        if (str === null || str === undefined) return '';
        return String(str)
            .trim()
            .replace(/[\x00-\x1F\x7F]/g, '') // Elimina caracteres de control
            .slice(0, maxLength);
    }

    /**
     * Sanitiza una URL para prevenir inyección de javascript: o data: URIs.
     * Usar antes de asignar cualquier URL proveniente del usuario a href o src.
     *
     * @param {string} url - La URL a validar
     * @returns {string} - La URL si es segura, o '#' en caso contrario
     */
    function sanitizeURL(url) {
        if (!url) return '#';
        const sanitized = String(url).trim();
        // Solo permitir http, https y rutas relativas
        if (/^(https?:\/\/|\/|\.\/|#)/i.test(sanitized)) {
            return sanitized;
        }
        console.warn('[Security] URL bloqueada por política de seguridad:', sanitized);
        return '#';
    }

    // ─────────────────────────────────────────────────────────────
    //  VALIDACIÓN — Datos de Usuario (para futuro formulario)
    // ─────────────────────────────────────────────────────────────

    /**
     * Valida la edad del usuario.
     * Reglas: número entero entre 5 y 120.
     *
     * @param {string|number} age - La edad a validar
     * @returns {{ valid: boolean, error: string|null }}
     */
    function validateAge(age) {
        const parsed = parseInt(age, 10);
        if (isNaN(parsed)) return { valid: false, error: 'La edad debe ser un número.' };
        if (parsed < 5) return { valid: false, error: 'La edad debe ser mayor a 5.' };
        if (parsed > 120) return { valid: false, error: 'Por favor ingresa una edad válida.' };
        return { valid: true, error: null };
    }

    /**
     * Valida la nacionalidad del usuario.
     * Reglas: solo letras, espacios y guiones. Entre 2 y 60 caracteres.
     *
     * @param {string} nationality - La nacionalidad a validar
     * @returns {{ valid: boolean, error: string|null }}
     */
    function validateNationality(nationality) {
        const clean = sanitizeInput(nationality, 60);
        if (clean.length < 2) return { valid: false, error: 'Por favor ingresa tu nacionalidad.' };
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$/.test(clean)) {
            return { valid: false, error: 'La nacionalidad solo puede contener letras.' };
        }
        return { valid: true, error: null };
    }

    /**
     * Valida un correo electrónico (campo opcional).
     * Si está vacío, se considera válido (es opcional).
     *
     * @param {string} email - El email a validar
     * @returns {{ valid: boolean, error: string|null }}
     */
    function validateEmail(email) {
        const clean = sanitizeInput(email, 254);
        if (!clean) return { valid: true, error: null }; // Opcional: vacío = OK
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(clean)) {
            return { valid: false, error: 'El formato del correo no es válido.' };
        }
        return { valid: true, error: null };
    }

    /**
     * Valida el nombre del usuario (campo opcional).
     * Reglas: letras, espacios. Máximo 100 caracteres.
     *
     * @param {string} name - El nombre a validar
     * @returns {{ valid: boolean, error: string|null }}
     */
    function validateName(name) {
        const clean = sanitizeInput(name, 100);
        if (!clean) return { valid: true, error: null }; // Opcional: vacío = OK
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/.test(clean)) {
            return { valid: false, error: 'El nombre solo puede contener letras.' };
        }
        return { valid: true, error: null };
    }

    /**
     * Valida un formulario de usuario completo.
     * Retorna un objeto con todos los errores encontrados (o vacío si es válido).
     *
     * @param {{ age: string, nationality: string, email?: string, name?: string }} formData
     * @returns {{ isValid: boolean, errors: Object }}
     */
    function validateUserForm(formData) {
        const errors = {};

        const ageResult = validateAge(formData.age);
        const nationalityResult = validateNationality(formData.nationality);
        const emailResult = validateEmail(formData.email || '');
        const nameResult = validateName(formData.name || '');

        if (!ageResult.valid) errors.age = ageResult.error;
        if (!nationalityResult.valid) errors.nationality = nationalityResult.error;
        if (!emailResult.valid) errors.email = emailResult.error;
        if (!nameResult.valid) errors.name = nameResult.error;

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // ─────────────────────────────────────────────────────────────
    //  GENERACIÓN DE ID SEGURO (para el futuro Pasaporte Digital)
    // ─────────────────────────────────────────────────────────────

    /**
     * Genera un ID único pseudoaleatorio para identificar una visita.
     * NO se usa para criptografía — solo para identificar sesiones de recorrido.
     * Formato: CY-XXXXXX-XXXXXXXXXXXX (ej: CY-2026A1-F3C9D2E1B0A4)
     *
     * @returns {string} - ID único de visita
     */
    function generateVisitId() {
        const year = new Date().getFullYear();
        const rand1 = Math.random().toString(36).substring(2, 8).toUpperCase();
        const rand2 = Math.random().toString(36).substring(2, 14).toUpperCase();
        return `CY-${year}${rand1}-${rand2}`;
    }

    // API pública del módulo
    return {
        escapeHTML,
        sanitizeInput,
        sanitizeURL,
        validateAge,
        validateNationality,
        validateEmail,
        validateName,
        validateUserForm,
        generateVisitId
    };

})();
