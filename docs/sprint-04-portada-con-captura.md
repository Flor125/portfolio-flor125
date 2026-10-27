# Sprint 04 — Portada basada en la captura elegida

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado; JPG sustituido por PNG |
| Referencias | 6215287 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Reemplazar la portada con retrato por una composición basada en la captura clara elegida para el portfolio.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Imagen de referencia | Usar la captura adjuntada con cuadrícula clara, píxeles magenta, violeta y celeste, y el título Portfolio. | Se conserva la composición elegida. |
| 02 | Textos | Incorporar «Florencia Sombra», «web development · backend» y «flor125.dev». | Identificación del perfil y del sitio en la vista previa. |
| 03 | Exportación | Guardar el resultado como `portfolio-preview-v2.jpg` a 1200 × 630 px. | Nueva ruta de imagen diferenciada de la portada anterior. |
| 04 | Actualización de etiquetas | Cambiar las imágenes Open Graph/Twitter y sus textos alternativos. | Las redes consultan la nueva composición. |
| 05 | Limpieza | Retirar la portada con retrato y su generador, y ajustar el README. | Los recursos históricos eliminados dejan de ser la referencia vigente. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `assets/images/portfolio-preview-v2.jpg` | Portada JPG de esta entrega; permanece como recurso histórico. |
| `index.html` | URLs y textos alternativos. |
| `README.md` | Descripción de la nueva portada. |
| `assets/images/portfolio-social.jpg; scripts/generate-social-image.swift` | Archivos retirados en esta entrega. |

## Verificaciones registradas

- Se revisó la composición y la presencia de los tres textos solicitados.
- Se comprobaron las dimensiones 1200 × 630 px, las rutas y la ausencia de metadatos duplicados.

## Despliegue y comprobación operativa

1. Publicar el nuevo archivo junto con las etiquetas actualizadas.
2. La nueva ruta permite distinguir esta portada de la anterior en caché.

## Estado final y pendientes

Luego se reportó falta de nitidez en LinkedIn. Esa corrección corresponde al sprint 05.

## Recuperación o reversión

Revertir coordinadamente imagen, etiquetas y documentación; evitar dejar referencias a archivos eliminados.
