# Documentación de sprints

Registro de las entregas del [portfolio](https://flor125.dev). Cada sprint tiene su propio archivo Markdown con objetivo, acciones ejecutadas, archivos, verificaciones registradas, despliegue, pendientes y recuperación.

Los sprints agrupan retrospectivamente el trabajo realizado. No representan períodos de duración fija. «Publicado» significa incorporado a `main`; no implica que se haya verificado cada servicio externo de extremo a extremo.

## Índice de entregas

| Sprint | Entrega | Estado |
| --- | --- | --- |
| 01 | [Publicación inicial del portfolio](sprint-01-publicacion-inicial.md) | Publicado en main |
| 02 | [Educación, certificaciones e interacciones](sprint-02-educacion-e-interacciones.md) | Publicado en main |
| 03 | [Open Graph y Twitter Card](sprint-03-metadatos-sociales.md) | Publicado; imagen inicial sustituida |
| 04 | [Portada basada en la captura elegida](sprint-04-portada-con-captura.md) | Publicado; JPG sustituido por PNG |
| 05 | [Portada nítida en PNG](sprint-05-portada-png-nitida.md) | Publicado en main |
| 06 | [Primera habilitación del formulario](sprint-06-contacto-inicial.md) | Publicado; implementación sustituida |
| 07 | [Backend de correo con Nodemailer y Vercel](sprint-07-nodemailer-vercel.md) | Publicado en main |
| 08 | [Transiciones suaves de confirmación](sprint-08-transiciones-confirmacion.md) | Publicado en main |
| 09 | [Contenido relacional y tarjetas dinámicas](sprint-09-contenido-relacional.md) | Preparado localmente; no aplicado ni publicado |
| 10 | [Conexión de Supabase y acceso al proyecto](sprint-10-conexion-supabase.md) | Conexión verificada; esquema sin modificar |
| 11 | [Documentación de entregas por sprint](sprint-11-documentacion-produccion.md) | Publicado en main; ampliado en esta entrega |
| 12 | [Activación de Supabase y verificación real](sprint-12-activacion-supabase.md) | Base activa; integración verificada en feature; pendiente de main |

## Estado de producción y trabajo pendiente

- La portada vigente es `assets/images/portfolio-preview-v2.png`.
- Contacto usa Nodemailer en Vercel; el popup depende de la aceptación SMTP y conserva los campos ante error.
- La integración del sprint 09 está versionada en `feature/supabase-portfolio`; su activación remota y verificación se registran en el sprint 12.
- Las siete tablas están creadas en Supabase y el frontend de la rama feature consulta datos reales. El sitio de producción en `main` todavía no incluye la integración.

## Próxima entrega: publicar la integración

- [x] Inspeccionar el esquema y las migraciones remotas.
- [x] Aplicar la migración al proyecto correcto.
- [x] Configurar la publishable key pública del frontend.
- [x] Verificar RLS, relaciones, permisos y advisors.
- [x] Probar consultas y tarjetas con datos reales en ambos idiomas y tamaños de pantalla.
- [ ] Revisar la rama y autorizar su fusión a `main`.
- [ ] Comprobar el despliegue final en flor125.dev.

## Convención para próximos sprints

Crear `docs/sprint-NN-nombre-de-entrega.md` y agregarlo a esta tabla. Separar las verificaciones realmente ejecutadas de los procedimientos sugeridos. Si una entrega reemplaza otra, conservar el historial e indicar cuál implementación está vigente. No incluir contraseñas, tokens ni enlaces de autorización temporales.
