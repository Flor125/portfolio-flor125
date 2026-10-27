# Sprint 12 — Activación de Supabase y verificación real

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Base remota activa; frontend verificado en la rama feature; pendiente de publicación en main |
| Rama | `feature/supabase-portfolio` |
| Proyecto | `iwllvbwevpflsbtquhiz` — organización Portfolio |
| Migración remota | `20261027024908_portfolio_content` |
| Commit funcional | `34aec71` |
| Incorporación de documentación de main | `83ce237`, fusión hacia feature; no publica la funcionalidad en main |

## Objetivo

Aplicar el esquema relacional ya preparado, habilitar las consultas públicas de solo lectura y verificar que las tarjetas se generen con datos reales de Supabase.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Confirmar el destino | Consultar URL, tablas públicas e historial de migraciones mediante el nuevo MCP autorizado. | Proyecto correcto, sin tablas públicas ni migraciones previas. |
| 02 | Aplicar el esquema | Ejecutar `portfolio_content` con las siete tablas, relaciones, índices, RLS y carga inicial. | Migración aplicada correctamente. |
| 03 | Verificar la carga | Consultar cantidades y relaciones después del commit de la migración. | 3 proyectos, 3 experiencias, 5 credenciales, 6 párrafos y 12 asociaciones de tecnologías. |
| 04 | Probar permisos | Ejecutar `database/test-policies.sql` con registros de prueba dentro de una transacción revertida. | Borradores y detalles privados ocultos; sin permisos públicos de escritura. Los datos de prueba no quedan guardados. |
| 05 | Revisar advisors | Consultar seguridad y rendimiento después del cambio de esquema. | Seguridad sin hallazgos; rendimiento informa únicamente cuatro índices aún sin uso. |
| 06 | Configurar el navegador | Obtener la publishable key y guardarla junto con la URL en `portfolio-config.js`. | El cliente usa una clave pública, sin secretos de servidor ni service_role. |
| 07 | Consultar la API real | Ejecutar el modelo del frontend contra REST con la clave pública. | Se reciben las tres colecciones y las relaciones embebidas con tecnologías, instituciones y párrafos. |
| 08 | Verificar la interfaz | Abrir el sitio local en Chrome y cargar las secciones desde Supabase real. | 3 proyectos, 3 experiencias y 5 credenciales renderizados; textos ES/EN e imágenes correctos, sin errores JavaScript. |
| 09 | Revisar móvil | Comprobar el ancho móvil y el carrusel de educación con los registros remotos. | Sin desbordamiento horizontal de la página. |
| 10 | Registrar procedencia | Marcar contenedores cargados con `data-content-source="database"`. | Las pruebas distinguen datos remotos del HTML inicial de respaldo. |
| 11 | Sincronizar migraciones | Renombrar la migración local al identificador registrado por Supabase MCP. | Archivo local e historial remoto usan `20261027024908`; evita intentar aplicar de nuevo el mismo esquema con otra versión. |
| 12 | Mantener la rama | Guardar el cambio funcional e incorporar la documentación de main hacia feature. | La publicación productiva continúa separada de la preparación y verificación. |

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| `supabase/migrations/20261027024908_portfolio_content.sql` | Migración inicial aplicada; reemplaza el nombre local anterior `20261027002058`. |
| `assets/js/portfolio-config.js` | URL y publishable key pública del proyecto activo. |
| `assets/js/portfolio-content.js` | Renderizado de las tarjetas y marca de procedencia remota. |
| `.gitignore` | Exclusión de la caché local `supabase/.temp/`. |
| `database/README.md` | Estado activo y guía de administración del contenido. |
| `README.md`, `docs/README.md` | Estado de la integración y navegación de la documentación. |
| `database/verify.sql`, `database/test-policies.sql` | Comprobaciones SQL utilizadas, ya preparadas en el sprint 09. |

## Verificaciones registradas

- El esquema tiene siete tablas con RLS habilitado.
- Las cantidades remotas coinciden con las tarjetas iniciales: 3/3/5.
- Las experiencias incluyen dos párrafos cada una y una organización vinculada.
- El proyecto Padrón Electoral devuelve sus cuatro tecnologías relacionadas.
- La lectura pública usa la publishable key; las políticas ocultan borradores, sus párrafos y organizaciones privadas.
- Pasaron las cuatro pruebas de `tests/portfolio-model.test.mjs`.
- Chrome confirmó el renderizado real de las tres secciones, el cambio a inglés, las imágenes y el ancho móvil sin desbordamiento. No registró errores JavaScript.
- El advisor de seguridad devolvió una lista vacía de hallazgos.
- El advisor de rendimiento informó índices sin uso todavía: uno de relación de tecnologías y tres de orden de tarjetas publicadas. Se conservan porque la base acaba de crearse; [referencia del aviso](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index).

## Administración del contenido

Desde **Supabase → Table Editor**, agregar o modificar filas en `portfolio_projects`, `portfolio_experiences` o `portfolio_credentials`, completar sus relaciones y establecer `published = true` para mostrarlas. `sort_order` controla la posición. Los campos `_es` y `_en` controlan los idiomas.

Los proyectos se agregan al carrusel, las experiencias por encima de las tres iniciales habilitan el despliegue del historial y las credenciales se agregan al carrusel actual. Basta recargar una instancia del frontend que tenga esta integración. El sitio publicado en main todavía requiere la fusión de la rama para usarla.

## Despliegue y comprobación operativa

1. Revisar `feature/supabase-portfolio` y su documentación antes de fusionarla.
2. Al autorizarse la publicación, fusionar a main y esperar el despliegue de GitHub Pages.
3. Confirmar en flor125.dev que los tres contenedores tengan `data-content-source="database"`.
4. Revisar tarjetas, enlaces y cambio de idioma en escritorio y móvil.
5. Para cambios futuros del esquema, crear una migración nueva. No reaplicar ni modificar la migración inicial ya registrada.

## Estado final y pendientes

La base remota y las consultas están operativas. La verificación del navegador se hizo contra Supabase real desde el servidor local de pruebas. La funcionalidad permanece en la rama feature: no se ha fusionado ni comprobado su despliegue en flor125.dev.

La adición de tarjetas se había probado con datos simulados en el sprint 09. En este sprint no se dejaron tarjetas ficticias publicadas en la base de producción; los registros usados para probar políticas se revirtieron.

## Recuperación o reversión

Si falla una consulta, el frontend conserva el HTML inicial de la sección. Una respuesta válida vacía muestra el estado vacío en lugar de restaurar contenido retirado. Revisar RLS, permisos y la clave pública antes de cambiar la configuración.

Revertir el frontend no requiere borrar tablas. Conservar los registros y preparar una migración correctiva si el esquema necesita ajustes. Nunca eliminar la base para deshacer una entrega visual ni publicar credenciales privadas en el repositorio.
