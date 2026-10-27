# Sprint 01 — Publicación inicial del portfolio

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main |
| Referencias | fbb8fa4, fbbc421 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Publicar una presentación profesional bilingüe en un dominio propio, con navegación, proyectos, experiencia, educación, contacto y acceso al CV.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Estructura del sitio | Organizar las secciones en `index.html`, con recursos separados en `assets` y visor auxiliar en `pages`. | Portfolio estático compatible con GitHub Pages. |
| 02 | Idiomas | Agregar los textos en español e inglés y la selección de idioma mediante JavaScript. | El visitante puede cambiar el idioma de la interfaz. |
| 03 | Temas | Implementar los temas claro y oscuro, el interruptor y sus transiciones. | La presentación se adapta a la preferencia del visitante. |
| 04 | Interacciones | Incorporar el fondo Grid Pulse, efectos de tarjetas y wordmark animado del pie. | Interacciones visuales integradas con el estilo del portfolio. |
| 05 | Currículum | Incorporar documentos ES/EN y un visor con controles de consulta y descarga. | Acceso al CV desde la página. |
| 06 | Dominio | Agregar `CNAME` con `flor125.dev`. | Configuración del dominio personalizado en el repositorio. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `index.html` | Estructura y contenido inicial. |
| `assets/css/styles.css` | Diseño, temas y adaptación de tamaños. |
| `assets/js/language.js` | Traducciones y selección de idioma. |
| `assets/js/theme.js` | Cambio de tema. |
| `assets/js/grid-pulse.js` | Fondo interactivo. |
| `assets/js/script.js` | Interacciones generales. |
| `assets/js/cv-viewer.js; pages/cv-viewer.html` | Visor del CV. |
| `assets/documents/` | Documentos del CV. |
| `CNAME` | Dominio personalizado. |

## Verificaciones registradas

- El historial de Git registra la entrega del sitio y la incorporación del dominio.
- No hay una cantidad de pruebas automatizadas documentada para esta entrega inicial; no se atribuyen pruebas posteriores a este sprint.

## Despliegue y comprobación operativa

1. Publicar los archivos estáticos con GitHub Pages y mantener el dominio configurado.
2. Las bibliotecas y los recursos externos usados por el sitio requieren conexión a internet.

## Estado final y pendientes

El formulario de contacto todavía no enviaba mensajes. La habilitación se documenta en el sprint 06.

## Recuperación o reversión

Un revert debe considerar el commit del sitio y el de CNAME por separado. Revisar el dominio y el acceso a los recursos tras cualquier reversión.
