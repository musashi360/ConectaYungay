# supabase/

Esta carpeta **no es una capa de la aplicación** ni un controlador. Contiene el
script SQL que crea las tablas de la base de datos en Supabase
(`visitas` y `clics_info`) y sus políticas de seguridad (RLS: solo INSERT anónimo).

- No se carga desde `index.html`; se ejecuta una vez en el editor SQL de Supabase.
- `2026-10-10_accion_clics.sql`: migración que agrega la columna `accion`
  (`apertura` / `mas_info`) a `clics_info`, más la consulta para comparar
  aperturas del cartel contra clics en "Más información" por lugar.
- La conexión a la base (URL + clave publicable) vive en la capa de negocio:
  `js/business/visitService.js`.
