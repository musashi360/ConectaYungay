-- ConectaYungay — Migración 2026-10-10: tipo de clic en clics_info
-- Ejecutar UNA vez en el editor SQL de Supabase, ANTES de publicar la versión
-- de la app que envía la columna "accion" (si no existe, los clics no se guardan).
--
-- Las filas anteriores eran clics que abrían un hito, así que quedan como 'apertura'.

alter table clics_info
  add column accion text not null default 'apertura'
  check (accion in ('apertura','mas_info'));


-- ─────────────────────────────────────────────────────────────
-- Consulta de análisis (ejecutar en el editor SQL cuando se quiera ver):
-- por lugar, cuántas veces se abrió el cartel, cuántas se pidió más
-- información y cuántas se abrió sin pedirla.
-- ─────────────────────────────────────────────────────────────
-- select
--   punto_interes,
--   count(*) filter (where accion = 'apertura')                as aperturas,
--   count(*) filter (where accion = 'mas_info')                as clics_mas_info,
--   count(*) filter (where accion = 'apertura')
--     - count(*) filter (where accion = 'mas_info')            as aperturas_sin_clic,
--   round(100.0 * count(*) filter (where accion = 'mas_info')
--     / nullif(count(*) filter (where accion = 'apertura'), 0), 1) as porcentaje_clic
-- from clics_info
-- group by punto_interes
-- order by aperturas desc;
