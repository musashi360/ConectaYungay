# Graph Report - ConectaYungay  (2026-10-07)

## Corpus Check
- Corpus is ~35,902 words - fits in a single context window. You may not need a graph.

## Summary
- 152 nodes · 208 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.88)
- Token cost: 71,049 input · 0 output

## Community Hubs (Navigation)
- Page Shell, Security & Config
- Shared Heritage Landmarks A
- Shared Heritage Landmarks B
- Map Screen & Rendering
- Visitor Survey Panel Logic
- UI Controller / Screen Navigation
- Cafeteria Discounts
- Interactive Map Visual Elements
- Shared Heritage Landmarks C
- Ice Cream Discounts
- Restaurant Discounts
- Visit Tracking Service
- Visitor Panel UI (Screenshot)
- Route Data Repository
- Local Dev Server
- Route Definitions
- Brand Logo (Main)
- Brand Logo (Transparent)

## God Nodes (most connected - your core abstractions)
1. `Conecta Yungay — index.html` - 19 edges
2. `Cafeterías (Discount Category)` - 10 edges
3. `run()` - 6 edges
4. `init()` - 6 edges
5. `enviar()` - 5 edges
6. `Restaurantes (Discount Category)` - 5 edges
7. `Heladerías (Discount Category)` - 5 edges
8. `Cuadrícula de calles del Barrio Yungay` - 5 edges
9. `Content Security Policy (CSP)` - 5 edges
10. `Visitor Survey Screen (Cuéntanos de tu Visita)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Barrio Yungay Color Palette (#A7302A, #F6EFE4, #C88A2A, #66754D, #6E6A65)` --conceptually_related_to--> `Conecta Yungay — index.html`  [INFERRED]
  data/codigo de colores.txt → index.html
- `Recorrido Metro Cumming (Route)` --semantically_similar_to--> `Recorrido Metro Quinta Normal (Route)`  [INFERRED] [semantically similar]
  data/Recorrido Metro Cumming.txt → data/Recorrido Metro Quinta Normal.txt
- `Café100 — Av. Matucana 100` --shares_data_with--> `Matucana 100`  [INFERRED]
  data/Descuentos.txt → data/Recorrido Metro Cumming.txt
- `Café100 — Av. Matucana 100` --shares_data_with--> `Matucana 100`  [INFERRED]
  data/Descuentos.txt → data/Recorrido Metro Quinta Normal.txt
- `Teatro Novedades` --shares_data_with--> `Teatro Novedades`  [INFERRED]
  data/Recorrido Metro Cumming.txt → data/Recorrido Metro Quinta Normal.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Recorrido Metro Cumming — Full Stop Sequence** — data_recorrido_metro_cumming_route, data_recorrido_metro_cumming_metro_cumming, data_recorrido_metro_cumming_teatro_novedades, data_recorrido_metro_cumming_estudio_caffarena, data_recorrido_metro_cumming_casa_chilota, data_recorrido_metro_cumming_espacio_arte_yungay, data_recorrido_metro_cumming_yungay_historico, data_recorrido_metro_cumming_museo_del_sonido, data_recorrido_metro_cumming_nave, data_recorrido_metro_cumming_casa_arpa, data_recorrido_metro_cumming_casa_museo_peluqueria_francesa, data_recorrido_metro_cumming_casona_compania, data_recorrido_metro_cumming_museo_g_mistral, data_recorrido_metro_cumming_parroquia_san_saturnino, data_recorrido_metro_cumming_palacio_de_adobe, data_recorrido_metro_cumming_espacio_330, data_recorrido_metro_cumming_biblioteca_de_santiago, data_recorrido_metro_cumming_matucana_100, data_recorrido_metro_cumming_mac_violeta_parra, data_recorrido_metro_cumming_museo_de_la_memoria_y_ddhh [EXTRACTED 1.00]
- **Recorrido Metro Quinta Normal — Full Stop Sequence** — data_recorrido_metro_quinta_normal_route, data_recorrido_metro_quinta_normal_metro_quinta_normal, data_recorrido_metro_quinta_normal_museo_de_la_memoria_y_ddhh, data_recorrido_metro_quinta_normal_mac_violeta_parra, data_recorrido_metro_quinta_normal_biblioteca_de_santiago, data_recorrido_metro_quinta_normal_matucana_100, data_recorrido_metro_quinta_normal_palacio_de_adobe, data_recorrido_metro_quinta_normal_espacio_330, data_recorrido_metro_quinta_normal_parroquia_san_saturnino, data_recorrido_metro_quinta_normal_casona_compania, data_recorrido_metro_quinta_normal_museo_g_mistral, data_recorrido_metro_quinta_normal_yungay_historico, data_recorrido_metro_quinta_normal_museo_del_sonido, data_recorrido_metro_quinta_normal_nave, data_recorrido_metro_quinta_normal_casa_arpa, data_recorrido_metro_quinta_normal_casa_museo_peluqueria_francesa, data_recorrido_metro_quinta_normal_estudio_caffarena, data_recorrido_metro_quinta_normal_teatro_novedades, data_recorrido_metro_quinta_normal_casa_chilota, data_recorrido_metro_quinta_normal_espacio_arte_yungay [EXTRACTED 1.00]
- **Frontend Security Layer (CSP, HTTPS, Referrer Policy, SRI)** — index_content_security_policy, index_https_enforcement, index_referrer_policy, index_sri_resource_integrity [EXTRACTED 1.00]
- **N-Layer Script Loading Order (Security/Data/Business/Presentation)** — index_layered_architecture, js_data_securityutils, js_data_routerepository, js_data_surveycatalogs, js_data_surveyrepository, js_business_routeservice, js_business_visitservice, js_presentation_maprenderer, js_presentation_surveypanel, js_presentation_uicontroller [EXTRACTED 1.00]
- **Main App Screen Panel Layout (Map, Route, Discounts)** — index_app_screen, index_map_card, index_route_card, index_discounts_card [EXTRACTED 1.00]

## Communities (18 total, 4 thin omitted)

### Community 0 - "Page Shell, Security & Config"
Cohesion: 0.11
Nodes (11): styles.css, Barrio Yungay Color Palette (#A7302A, #F6EFE4, #C88A2A, #66754D, #6E6A65), Google Fonts (Outfit, Playfair Display), html2canvas Library (CDN), Leaflet.js Library (CDN), Conecta Yungay — index.html, Supabase Backend (connect-src endpoint), Visitor Survey Screen (Cuéntanos de tu Visita) (+3 more)

### Community 1 - "Shared Heritage Landmarks A"
Cohesion: 0.18
Nodes (16): Casa Arpa, Casa Museo Peluquería Francesa, Casona Compañía, Museo del Sonido, Museo G. Mistral, Nave, Parroquia San Saturnino, Yungay Histórico (+8 more)

### Community 2 - "Shared Heritage Landmarks B"
Cohesion: 0.21
Nodes (14): Café100 — Av. Matucana 100, Biblioteca de Santiago, Espacio 330, MAC / Violeta Parra, Matucana 100, Museo de la Memoria y DDHH, Palacio de Adobe, Biblioteca de Santiago (+6 more)

### Community 3 - "Map Screen & Rendering"
Cohesion: 0.23
Nodes (8): Main App Screen, Tus Beneficios (Discounts Panel), Interactive Map Panel, Tu Ruta (Route Panel), animateRoute(), addNext(), clearRoute(), createNodeIcon()

### Community 4 - "Visitor Survey Panel Logic"
Cohesion: 0.33
Nodes (11): actualizarComuna(), crearOpcion(), enviar(), leerFormulario(), marcarVista(), mostrarError(), omitir(), poblarSelectores() (+3 more)

### Community 5 - "UI Controller / Screen Navigation"
Cohesion: 0.42
Nodes (10): appendNodeToList(), detectQRParams(), init(), renderDiscountsUI(), resetToWelcome(), selectActiveNode(), selectOrigin(), showScreen() (+2 more)

### Community 6 - "Cafeteria Discounts"
Cohesion: 0.20
Nodes (10): Café Brunet — Compañía de Jesús 2695, Café Cité — Compañía de Jesús 2820, Café Estación — Av. Matucana 4, Cafetería Popular — Maipú 363, Cafeterías (Discount Category), Espacio Gárgola — Maipú 357, Mingus Coffee — Huérfanos 2919, Planta Café — Maipú 330 (+2 more)

### Community 7 - "Interactive Map Visual Elements"
Cohesion: 0.28
Nodes (9): Av. Alameda Libertador Bernardo O'Higgins (límite sur), Av. Ricardo Cumming (límite este), Paradas de descuento destacadas (naranja): Rosas, Santo Domingo, Catedral, Compañía de Jesús, Huérfanos, Av. Portales, Agustinas, Moneda, Erasmo Escala, Av. Matucana (límite oeste), Estación Metro Cumming, Estación Metro Quinta Normal, Mapa Barrio Yungay (Recorrido), Calle San Pablo (límite norte) (+1 more)

### Community 8 - "Shared Heritage Landmarks C"
Cohesion: 0.31
Nodes (9): Casa Chilota, Espacio Arte Yungay, Estudio Caffarena, Metro Cumming, Teatro Novedades, Casa Chilota, Espacio Arte Yungay, Estudio Caffarena (+1 more)

### Community 9 - "Ice Cream Discounts"
Cohesion: 0.33
Nodes (6): Amavi Heladería y Cafetería — Av. Mapocho 2346, Filippo — Av. Brasil 327, Grido Helado — Av. Mapocho 2821, Heladerías (Discount Category), Ice Bar — Compañía de Jesús 2129, Sweet Gelateria — Catedral 2913 (esquina Esperanza)

### Community 10 - "Restaurant Discounts"
Cohesion: 0.33
Nodes (6): El Huaso Enrique — Maipú 462, Fogón Andino — Erasmo Escala 3133, Fuente Mardoqueo — Libertad 551, Na Que Ver, Cocinería Chilena — Gral. Bulnes 41, Restaurantes (Discount Category), Zarita — Compañía de Jesús 3023

### Community 11 - "Visit Tracking Service"
Cohesion: 0.47
Nodes (3): generarUUID(), iniciarVisita(), leerRespuestas()

### Community 12 - "Visitor Panel UI (Screenshot)"
Cohesion: 0.40
Nodes (5): Age Range Selector (¿Qué edad tienes?), Conecta Yungay Brand Logo, Nationality Dropdown (¿Cuál es tu nacionalidad?), Visit Reason Selector (¿Qué te trae al barrio?), Visitor Survey Panel (Cuéntanos de tu Visita)

### Community 13 - "Route Data Repository"
Cohesion: 0.60
Nodes (4): getDiscounts(), getRoute(), mapNamesToNodes(), withCoordinates()

## Knowledge Gaps
- **36 isolated node(s):** `Café Cité — Compañía de Jesús 2820`, `Café Brunet — Compañía de Jesús 2695`, `Mingus Coffee — Huérfanos 2919`, `Planta Café — Maipú 330`, `Cafetería Popular — Maipú 363` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 46 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Conecta Yungay — index.html` connect `Page Shell, Security & Config` to `Map Screen & Rendering`, `Visitor Survey Panel Logic`, `UI Controller / Screen Navigation`, `Visit Tracking Service`, `Route Data Repository`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `run()` (e.g. with `actualizarComuna()` and `enviar()`) actually correct?**
  _`run()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Café Cité — Compañía de Jesús 2820`, `Café Brunet — Compañía de Jesús 2695`, `Mingus Coffee — Huérfanos 2919` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Shell, Security & Config` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Are the 4 inferred relationships involving `init()` (e.g. with `detectQRParams()` and `resetToWelcome()`) actually correct?**
  _`init()` has 4 INFERRED edges - model-reasoned connections that need verification._