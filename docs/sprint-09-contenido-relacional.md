# Sprint 09 — Contenido relacional y tarjetas dinámicas

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Preparado localmente; no aplicado ni publicado |
| Referencias | Sin commit: feature/supabase-portfolio |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Administrar proyectos, experiencia y credenciales desde PostgreSQL, conservando las tarjetas actuales y su presentación bilingüe.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Inventario inicial | Extraer del HTML 3 proyectos, 3 experiencias y 5 credenciales, con textos, imágenes, enlaces y tecnologías. | Se prepara portfolio-seed.json sin inventar fechas. |
| 02 | Modelo relacional | Diseñar siete tablas: organizaciones, proyectos, tecnologías, relación proyecto-tecnología, experiencias, párrafos y credenciales. | Las tecnologías y organizaciones se reutilizan mediante claves foráneas. |
| 03 | Migración | Generar el archivo SQL con la CLI y preparar índices, restricciones y carga inicial por slugs. | La migración queda versionable y transaccional, sin ejecutarse en remoto. |
| 04 | Permisos | Habilitar RLS y permisos explícitos de lectura para anon/authenticated; limitar filas a published y detalles de padres publicados. | Se prepara separación de borradores y ausencia de escritura pública. |
| 05 | Consultas | Implementar lecturas REST por sección, paginadas de 100 en 100 y ordenadas por sort_order e id. | La cantidad de tarjetas puede crecer sin editar HTML. |
| 06 | Renderizado | Construir nodos con textContent, validar URLs y seleccionar textos ES/EN con respaldo español. | Se evita insertar HTML procedente de los registros. |
| 07 | Proyectos | Agregar carrusel adaptable, flechas, teclado y deslizamiento táctil; reinicializar los efectos de tarjetas nuevas. | Tres tarjetas por vista de escritorio, dos en tablet y una en móvil. |
| 08 | Experiencia | Mostrar inicialmente tres experiencias y agregar Ver toda la experiencia/Ver menos cuando haya más. | El historial adicional puede desplegarse con una flecha. |
| 09 | Credenciales | Conservar el carrusel y refrescar sus controles al cargar datos nuevos. | Educación y certificaciones se generan desde sus registros. |
| 10 | Respaldo | Mantener HTML inicial si falta configuración o falla una consulta; mostrar estado vacío si una consulta válida no devuelve publicaciones. | Una falla de API no borra las tarjetas originales. |
| 11 | Administración | Preparar guía para insertar filas, asociar tecnologías, ordenar y publicar contenido desde Supabase. | No se implementa un panel público de administración. |

## Archivos y responsabilidades

Estos archivos pertenecen al trabajo local pendiente y pueden no estar disponibles en `main`.

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `supabase/migrations/20261027002058_portfolio_content.sql` | Esquema, relaciones, RLS y datos iniciales. |
| `database/portfolio-seed.json` | Copia inicial de contenido. |
| `database/verify.sql; database/test-policies.sql` | Consultas y regresiones de permisos. |
| `database/README.md` | Guía de administración y conexión. |
| `scripts/build-portfolio-sql.py` | Generación de la migración inicial. |
| `assets/js/portfolio-config.js` | URL y publishable key pendiente. |
| `assets/js/portfolio-model.mjs; assets/js/portfolio-content.js` | Acceso y renderizado de datos. |
| `assets/js/portfolio-ui.js` | Controles de proyectos e historial. |
| `tests/portfolio-model.test.mjs` | Pruebas del modelo. |
| `index.html; assets/css/styles.css; assets/js/script.js; assets/js/education.js; assets/js/language.js` | Integración con la interfaz existente. |

## Verificaciones registradas

- PGlite/PostgreSQL local: migración válida, siete tablas con RLS y cantidades iniciales 3/3/5.
- Lectura anónima: borradores de proyectos, experiencias y credenciales ocultos; organizaciones privadas y párrafos privados también ocultos. Escritura pública rechazada.
- Cuatro pruebas del modelo: URLs seguras, idiomas/orden, paginación y fallos de API.
- Chrome con datos simulados: nuevas tarjetas, flechas, experiencia desplegable, credenciales, idiomas y ancho móvil sin desbordamiento.
- Se revisaron capturas de escritorio y móvil. Estas pruebas no acreditan todavía la conexión a Supabase real.

## Despliegue y comprobación operativa

1. Inspeccionar el esquema remoto antes de aplicar la migración y resolver conflictos de nombres.
2. Aplicar la migración y verificar permisos y advisors. Obtener la publishable key pública y completar portfolio-config.js.
3. Probar consultas y tarjetas contra el proyecto real antes de publicar la rama. Nunca exponer service_role ni claves secretas.

## Estado final y pendientes

Los archivos permanecen locales en feature/supabase-portfolio. No forman parte de main ni existe confirmación de creación de las tablas remotas. No se preparó Realtime: las novedades aparecerán al recargar.

## Recuperación o reversión

No hay migración remota que revertir al redactar este registro. Después de aplicarla, preservar los datos antes de cualquier rollback; no eliminar tablas con contenido para deshacer un cambio de frontend.
