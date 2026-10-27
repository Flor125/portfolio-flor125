# Sprint 08 — Transiciones suaves de confirmación

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main |
| Referencias | d9e5026 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Agregar un retardo de un segundo y animaciones suaves al popup, conservando la confirmación condicionada al envío exitoso.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Retardo de apertura | Después del ok de la API, limpiar el timeout de red, reiniciar el formulario y esperar 1000 ms antes de showModal. | La confirmación aparece con el retardo solicitado. |
| 02 | Entrada | Agregar desvanecimiento y un desplazamiento/escala leve durante un segundo; animar también el backdrop. | El popup aparece de forma gradual. |
| 03 | Cierre por botón | Agregar la clase is-closing, esperar la salida y cerrar el dialog al terminar. | La salida dura un segundo y no desaparece de golpe. |
| 04 | Cierre por Escape | Interceptar cancel, evitar el cierre inmediato y reutilizar el mismo flujo animado. | Botón y teclado cierran con el mismo efecto. |
| 05 | Estado y foco | Evitar cierres duplicados y devolver el foco al botón de envío al cerrar. | Se conserva el comportamiento del diálogo. |
| 06 | Movimiento reducido | Deshabilitar animaciones y omitir la espera de cierre si el visitante pide movimiento reducido. | La preferencia de accesibilidad se respeta; el retardo de apertura permanece. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `assets/js/contact-form.js` | Retardo y manejo común de cierre. |
| `assets/css/styles.css` | Keyframes, backdrop y movimiento reducido. |
| `contact-api/lib/contact-form.test.js` | Verificación del cierre y estado durante la espera. |

## Verificaciones registradas

- Pasaron nueve pruebas de contacto, incluidas las de cierre con botón/Escape.
- Se comprobó que el diálogo siga abierto durante la espera de cierre y se cierre después.
- Se verificaron sintaxis de JavaScript y git diff --check.

## Despliegue y comprobación operativa

1. Publicar los archivos de frontend y recargar el sitio para obtener los recursos actualizados.
2. Probar apertura, cierre por botón y Escape, incluyendo la preferencia de movimiento reducido.

## Estado final y pendientes

Las animaciones no sustituyen la comprobación del envío: el popup sigue dependiendo de ok de la API.

## Recuperación o reversión

Revertir juntos JS, estilos y pruebas del cambio. Conservar el manejo de errores y el criterio de aceptación SMTP del sprint 07.
