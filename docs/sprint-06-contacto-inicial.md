# Sprint 06 — Primera habilitación del formulario

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado; implementación sustituida |
| Referencias | a113862 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Habilitar una vía de envío desde el formulario estático antes de incorporar el backend propio.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Bloqueo de envío | Retirar el listener que cancelaba todos los submit en contacto.js. | El formulario deja de estar bloqueado como vista previa. |
| 02 | Servicio temporal | Configurar POST nativo a FormSubmit con el destinatario del portfolio. | Los campos se envían al proveedor de correo del formulario. |
| 03 | Campos y asunto | Conservar validaciones requeridas y agregar asunto y formato de correo. | Nombre, empresa opcional, correo y mensaje viajan identificados. |
| 04 | Textos ES/EN | Actualizar el aviso del formulario y las traducciones. | La interfaz informa que el envío usa el servicio externo. |
| 05 | Activación | Documentar la confirmación del destinatario requerida por FormSubmit. | Queda identificado el paso externo necesario para recibir mensajes. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `index.html` | Action, method y campos ocultos. |
| `assets/js/contacto.js` | Retiro del preventDefault del formulario. |
| `assets/js/language.js` | Avisos traducidos. |
| `README.md` | Activación y comprobación de recepción. |

## Verificaciones registradas

- Se verificaron el endpoint POST, los campos con nombre, los requeridos y el tipo email.
- Se comprobó que no se deshabilitara el CAPTCHA del servicio.
- Se revisó sintaxis de JavaScript y git diff --check. La entrega real requería activar el destinatario.

## Despliegue y comprobación operativa

1. Esta entrega necesitaba la confirmación por correo del destinatario en FormSubmit.
2. Se documentó el envío de una prueba después de la activación.

## Estado final y pendientes

FormSubmit ya no es el mecanismo actual. Fue retirado al conectar Nodemailer en el sprint 07.

## Recuperación o reversión

Restaurar FormSubmit requeriría volver a configurar el formulario y su activación; no basta con revertir solamente contacto.js.
