/**
 * Genera js/data/walkingDistances.js: distancia CAMINANDO (metros) desde cada
 * lugar de places.js hasta cada local de discounts.js.
 *
 * Usa el servicio de rutas peatonales de OpenStreetMap (OSRM). Ejecutar desde
 * la raíz del proyecto cada vez que cambien lugares, recorridos o descuentos:
 *
 *     node tools/generar-distancias.js
 *
 * Requiere Node 18 o superior (usa fetch) y conexión a internet.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'js', 'data', 'walkingDistances.js');
const WALKING_TABLE_URL = 'https://routing.openstreetmap.de/routed-foot/table/v1/foot/';

function cargarModelo() {
    const ctx = {};
    ctx.window = ctx;
    vm.createContext(ctx);
    for (const file of ['places.js', 'discounts.js']) {
        vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', file), 'utf8'), ctx);
    }
    return ctx.ConectaYungay.Data;
}

async function main() {
    const { LUGARES, DESCUENTOS } = cargarModelo();
    const lugares = Object.entries(LUGARES);

    const points = [...lugares.map(([, c]) => c), ...DESCUENTOS]
        .map(p => `${p.lng},${p.lat}`)
        .join(';');
    const sources = lugares.map((_, i) => i).join(';');
    const destinations = DESCUENTOS.map((_, j) => lugares.length + j).join(';');
    const url = `${WALKING_TABLE_URL}${points}?sources=${sources}&destinations=${destinations}&annotations=distance`;

    const res = await fetch(url, { headers: { 'User-Agent': 'ConectaYungay/1.0' } });
    if (!res.ok) throw new Error(`El servicio de rutas respondió ${res.status}`);
    const json = await res.json();
    if (json.code !== 'Ok') throw new Error(`Respuesta inválida: ${json.code} ${json.message || ''}`);

    const tabla = {};
    lugares.forEach(([nombre], i) => {
        tabla[nombre] = {};
        DESCUENTOS.forEach((local, j) => {
            const metros = json.distances[i][j];
            if (metros === null) {
                console.warn(`Sin camino a pie: "${nombre}" → "${local.name}". Se omite.`);
                return;
            }
            tabla[nombre][local.name] = Math.round(metros);
        });
    });

    const cuerpo = Object.entries(tabla).map(([nombre, locales]) => {
        const filas = Object.entries(locales)
            .map(([local, m]) => `        ${JSON.stringify(local)}: ${m}`)
            .join(',\n');
        return `    ${JSON.stringify(nombre)}: {\n${filas}\n    }`;
    }).join(',\n');

    const contenido = `/**
 * CAPA DE DATOS (Modelo — Distancias a pie)
 * ConectaYungay — Metros caminando desde cada lugar hasta cada local con descuento
 *
 * ARCHIVO GENERADO: no editar a mano. Para actualizarlo ejecutar
 *     node tools/generar-distancias.js
 * Fuente: rutas peatonales de OpenStreetMap (OSRM). Generado el ${new Date().toISOString().slice(0, 10)}.
 */

window.ConectaYungay = window.ConectaYungay || {};
ConectaYungay.Data = ConectaYungay.Data || {};

ConectaYungay.Data.DISTANCIAS_A_PIE = {
${cuerpo}
};
`;
    fs.writeFileSync(OUTPUT, contenido.replace(/\n/g, '\r\n'));
    console.log(`Listo: ${lugares.length} lugares × ${DESCUENTOS.length} locales → ${path.relative(ROOT, OUTPUT)}`);
}

main().catch(e => {
    console.error('No se pudo generar la tabla:', e.message);
    process.exit(1);
});
