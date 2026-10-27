# Sprint 03 — Open Graph y Twitter Card

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado; imagen inicial sustituida |
| Referencias | 10e920f |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Permitir que los servicios de redes obtengan título, descripción e imagen desde el HTML inicial del portfolio.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Revisión del head | Detectar que faltaban metadatos sociales y revisar los recursos disponibles. | Definición de las etiquetas que debía incorporar la página. |
| 02 | Título y descripción | Configurar «Florencia Sombra \| Portfolio» y «Programadora Universitaria de Sistemas. Conocé mis proyectos de desarrollo web, backend y aplicaciones.». | Textos consistentes entre descripción general, Open Graph y Twitter. |
| 03 | Open Graph | Agregar tipo website, URL, nombre del sitio, idioma es_AR, título, descripción, imagen, MIME, dimensiones y texto alternativo. | Metadatos disponibles sin ejecutar JavaScript. |
| 04 | Twitter Card | Agregar `summary_large_image`, título, descripción, imagen y texto alternativo. | Configuración de tarjeta con imagen grande. |
| 05 | Primera portada | Crear `portfolio-social.jpg` de 1200 × 630 px con el retrato y la identidad visual oscura. | Imagen inicial para compartir con URL HTTPS absoluta. |
| 06 | Documentación | Agregar instrucciones para revisar el código fuente y probar las vistas previas después de publicar. | Procedimiento de comprobación posterior al despliegue. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `index.html` | Metadatos y URL canónica. |
| `assets/images/portfolio-social.jpg` | Imagen histórica; eliminada en el sprint 04. |
| `scripts/generate-social-image.swift` | Generador histórico; eliminado en el sprint 04. |
| `README.md` | Instrucciones de comprobación. |

## Verificaciones registradas

- Se comprobó que las etiquetas estuvieran en el head inicial y no hubiera duplicados.
- Se verificaron el título, la descripción, las URLs absolutas y las dimensiones reales de la imagen.
- Se revisó visualmente la portada.

## Despliegue y comprobación operativa

1. La página y la imagen deben ser públicas en HTTPS.
2. Después del despliegue, probar el enlace en LinkedIn Post Inspector y en un mensaje nuevo de WhatsApp.

## Estado final y pendientes

La portada con retrato dejó de ser la elegida. La configuración de imagen vigente queda documentada en el sprint 05.

## Recuperación o reversión

Las etiquetas y el archivo de imagen deben mantenerse sincronizados. No restaurar una URL cuyo archivo ya no exista.
