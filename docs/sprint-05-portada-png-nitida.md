# Sprint 05 — Portada nítida en PNG

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main |
| Referencias | f55f982 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Mejorar la calidad de la vista previa sin ampliar el JPG anterior y mantener legibles el nombre y los textos.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Diagnóstico | Comprobar que el JPG medía 1200 × 630 px y que procedía de una imagen de 1730 × 909 px. | Se descartó que el archivo se estuviera ampliando. |
| 02 | Reconstrucción | Redibujar tipografía y geometría desde los estilos del sitio a 2400 × 1260 px. | La composición no reutiliza el raster pixelado como fuente. |
| 03 | Exportación final | Reducir una sola vez a 1200 × 630 px y exportar PNG sRGB sin pérdida. | Se crea `portfolio-preview-v2.png` con una URL nueva. |
| 04 | Metadatos | Actualizar Open Graph y Twitter a la URL PNG, manteniendo ancho 1200, alto 630 y MIME image/png. | El HTML inicial referencia el formato real del archivo. |
| 05 | Reproducción | Guardar el generador Swift y documentar su ejecución. | La portada puede reconstruirse desde el repositorio. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `assets/images/portfolio-preview-v2.png` | Portada vigente. |
| `scripts/generate-social-preview.swift` | Renderizado nativo de la composición. |
| `index.html` | URLs, MIME y dimensiones. |
| `README.md` | Generación y prueba posterior al despliegue. |

## Verificaciones registradas

- Se verificó la firma PNG y sus dimensiones reales: 1200 × 630 px.
- Se comprobó que og:image y twitter:image coincidieran con la ruta del archivo.
- Se revisó la imagen a tamaño completo y se ejecutó git diff --check.

## Despliegue y comprobación operativa

1. Abrir https://flor125.dev/assets/images/portfolio-preview-v2.png después del despliegue.
2. Ingresar https://flor125.dev/ en LinkedIn Post Inspector y comprobar que detecte la URL .png.

## Estado final y pendientes

La caché de cada plataforma puede conservar una vista previa anterior. Las publicaciones ya existentes pueden mantener su propia imagen.

## Recuperación o reversión

Si se revierte el PNG, actualizar también la URL y el MIME de las etiquetas. No sustituir el archivo por un JPG manteniendo image/png.
