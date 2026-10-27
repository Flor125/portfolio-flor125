# Sprints del portfolio

Registro del trabajo realizado en [flor125.dev](https://flor125.dev) y de los siguientes pasos. Los sprints agrupan retrospectivamente las entregas; no representan períodos de duración fija. Los estados distinguen lo publicado en `main` de lo preparado localmente y de la configuración externa.

## Tabla de seguimiento

| Sprint | Objetivo | Trabajo realizado | Verificación | Estado y referencia |
| --- | --- | --- | --- | --- |
| 01 | Publicar el portfolio | Sitio en HTML, CSS y JavaScript; español e inglés; temas claro y oscuro; navegación, proyectos, contacto y visor del CV. Dominio propio `flor125.dev`. | Publicación inicial y configuración de `CNAME`. | Publicado. Commits `fbb8fa4`, `fbbc421`. |
| 02 | Presentar formación y mejorar las interacciones | Carrusel de educación y certificaciones con enlaces a credenciales; ajustes de navegación e interacciones del portfolio. | Revisión de las tarjetas y sus enlaces. | Publicado. Commit `cf5b21e`. |
| 03 | Incorporar vistas previas al compartir | Etiquetas Open Graph y Twitter Card `summary_large_image` en el HTML inicial, sin duplicados. Título «Florencia Sombra \| Portfolio», descripción acordada, URLs absolutas, dimensiones y texto alternativo. Primera portada de 1200 × 630 px con el retrato existente. | Título y descripción exactos, rutas, dimensiones y ausencia de etiquetas duplicadas. | Publicado. Commit `10e920f`. La primera portada fue reemplazada. |
| 04 | Adaptar la portada al estilo elegido | Captura clara con cuadrícula y píxeles de colores; textos «Florencia Sombra», «web development · backend» y «flor125.dev». Sustitución de la portada con retrato. | Revisión visual y comprobación de 1200 × 630 px. | Publicado. Commit `6215287`. El JPG fue sustituido después por PNG. |
| 05 | Mejorar la nitidez de la vista previa | Reconstrucción con geometría y tipografía nativas a 2400 × 1260 px y reducción a PNG sRGB de 1200 × 630 px. Nueva URL `assets/images/portfolio-preview-v2.png`, etiquetas actualizadas y generador reproducible. | Revisión a tamaño completo, formato real, dimensiones y rutas. La imagen anterior no se estaba ampliando. | Publicado. Commit `f55f982`. |
| 06 | Habilitar el primer envío de contacto | Eliminación del bloqueo de envío en JavaScript y conexión temporal con FormSubmit, incluyendo textos en ambos idiomas e instrucciones de activación. | Validación del formulario, configuración del POST y sintaxis de JavaScript. | Entrega histórica publicada en `a113862`; FormSubmit fue reemplazado en el sprint siguiente. |
| 07 | Enviar correo con Nodemailer y Vercel | Función Node.js independiente en `contact-api`, envío por Gmail SMTP, destinatario fijo y correo del visitante como Reply-To. Validación de campos y origen, trampa para bots, límite por instancia, variables privadas y popup de confirmación. Conexión del formulario a la API pública de Vercel y retiro de FormSubmit. | Ocho pruebas automatizadas; API pública comprobada con preflight CORS y rechazo de campos inválidos. Esas comprobaciones no enviaron correos reales. | Publicado. Commits `d606dee`, `97468f6`. |
| 08 | Suavizar la confirmación de envío | Espera de un segundo tras la aceptación del correo, entrada suave del popup y salida de un segundo al cerrar con el botón o Escape. Respeto de movimiento reducido. | Nueve pruebas automatizadas, incluidos cierre y manejo de errores. | Publicado. Commit `d9e5026`. |
| 09 | Preparar el contenido relacional | Migración de siete tablas relacionadas, datos de los 3 proyectos, 3 experiencias y 5 credenciales actuales; textos ES/EN, orden y publicación. Proyectos en carrusel, experiencia con despliegue del historial y educación/certificaciones desde registros. HTML inicial como respaldo. | Pruebas locales con PostgreSQL/PGlite, cuatro pruebas del modelo y revisión en Chrome de tarjetas nuevas, flechas, idiomas y móvil. | Preparado localmente en `feature/supabase-portfolio`, sin commit ni push al redactar este registro. No aplicado todavía a Supabase. |
| 10 | Conectar el proyecto de Supabase | Configuración del servidor MCP de Codex, autorización OAuth y acceso al proyecto `iwllvbwevpflsbtquhiz`, de la organización Portfolio. | La nueva conexión devolvió la URL correcta y permitió consultar el esquema `public`, que estaba vacío. | Conexión verificada. Creación de tablas y activación del frontend pendientes. |
| 11 | Documentar las entregas | Tabla de sprints, decisiones técnicas, verificaciones, archivos relevantes y pendientes en este documento. | Revisión de commits y del estado local para distinguir entregas publicadas de trabajo pendiente. | Entrega documental en `main`; no incluye los cambios locales del sprint 09. |

## Decisiones y archivos relevantes

### Vistas previas para redes

- `index.html`: metadatos Open Graph y Twitter en el HTML inicial; no dependen de JavaScript.
- `assets/images/portfolio-preview-v2.png`: portada vigente de 1200 × 630 px.
- `scripts/generate-social-preview.swift`: generador de la portada desde tipografía y geometría nativas.
- `README.md`: instrucciones para comprobar la imagen después del despliegue.

Después de publicar, abrir la imagen pública y consultar [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) con `https://flor125.dev/`. El nombre nuevo de imagen permite distinguirla de la versión anterior almacenada en caché. La actualización de una vista previa no implica modificar publicaciones antiguas.

### Contacto

- `contact-api/api/contact.js`: transporte de Nodemailer con Gmail.
- `contact-api/lib/contact.js`: validación y respuesta de la API.
- `contact-api/lib/contact.test.js`: pruebas del servidor.
- `assets/js/contact-form.js`: envío, estados, errores y apertura/cierre del popup.
- `contact-api/lib/contact-form.test.js`: pruebas del comportamiento del formulario.
- `assets/css/styles.css`: estilo y transiciones del popup.
- `contact-api/README.md`: configuración del servicio en Vercel.

Endpoint configurado: `https://portfolio-flor125-contact-api.vercel.app/api/contact`.

Las variables `SMTP_USER`, `SMTP_APP_PASSWORD` y `ALLOWED_ORIGINS` se configuran en Vercel. La contraseña de aplicación de Google no se incluye en este documento ni en el repositorio.

«Envío confirmado» significa que Gmail aceptó el correo por SMTP; no confirma lectura ni llegada garantizada a la bandeja principal. Ante un error, el formulario conserva el texto. El límite por IP es por instancia de la función, no una cuota distribuida.

Se ejecutó también `npx plugins add vercel/vercel-plugin`: informó instalación para Claude y registro en VS Code, pero falló para Codex porque no encontró el paquete en su catálogo. Esa instalación no es necesaria para que funcione el formulario.

### Base de datos: trabajo preparado, todavía no desplegado

Los siguientes archivos están preparados en la rama de trabajo; sus rutas se registran aquí como referencia y pueden no existir aún en `main`:

| Archivo o grupo | Propósito |
| --- | --- |
| `supabase/migrations/20261027002058_portfolio_content.sql` | Crear tablas, relaciones, índices, permisos, RLS y datos iniciales. |
| `database/portfolio-seed.json` | Copia inicial de los contenidos actuales. |
| `database/README.md` | Configuración y guía para agregar proyectos, experiencia y credenciales. |
| `database/verify.sql`, `database/test-policies.sql` | Comprobar cantidades, relaciones, permisos y ocultación de borradores. |
| `scripts/build-portfolio-sql.py` | Reconstruir la migración inicial desde los datos revisados. |
| `assets/js/portfolio-config.js` | URL del proyecto y futura publishable key pública. |
| `assets/js/portfolio-model.mjs`, `assets/js/portfolio-content.js` | Consultas paginadas, validación de URLs y generación de tarjetas. |
| `assets/js/portfolio-ui.js` | Carrusel de proyectos y despliegue de experiencia adicional. |
| `tests/portfolio-model.test.mjs` | Pruebas de URLs, orden, idiomas, paginación y errores. |

Tablas previstas:

| Tabla | Relación o función |
| --- | --- |
| `portfolio_projects` | Proyectos publicados o en borrador. |
| `portfolio_technologies` | Catálogo compartido de tecnologías. |
| `portfolio_project_technologies` | Relación muchos a muchos entre proyectos y tecnologías. |
| `portfolio_organizations` | Empresas e instituciones. |
| `portfolio_experiences` | Experiencias vinculadas a una organización. |
| `portfolio_experience_paragraphs` | Párrafos ordenados vinculados a cada experiencia. |
| `portfolio_credentials` | Educación y certificaciones vinculadas a una institución. |

El diseño previsto ofrece solo lectura pública de los registros publicados. Los cambios se administran desde Supabase; no se implementó un panel público de edición. Las tarjetas nuevas aparecerán al recargar la página, sin editar HTML. No se preparó una suscripción Realtime.

## Próximo sprint: activar la base y publicar la integración

- [ ] Volver a inspeccionar las tablas remotas antes de aplicar cambios.
- [ ] Revisar y aplicar la migración al proyecto correcto, sin afectar tablas ajenas.
- [ ] Obtener la publishable key pública y completar la configuración del frontend.
- [ ] Ejecutar las verificaciones SQL, las pruebas de permisos y los advisors de Supabase.
- [ ] Verificar consultas reales y confirmar que los visitantes no puedan modificar datos ni leer borradores.
- [ ] Comprobar en el navegador los carruseles, la experiencia desplegable y ambos idiomas contra la base real.
- [ ] Revisar el resultado antes de autorizar el commit y push de la integración.
- [ ] Actualizar este documento con los commits y resultados finales.
