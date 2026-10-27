# Sprint 07 — Backend de correo con Nodemailer y Vercel

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main |
| Referencias | d606dee, 97468f6 |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Enviar desde el formulario a un backend propio y mostrar confirmación solamente después de la aceptación SMTP.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Proyecto independiente | Crear contact-api con runtime Node.js 24, Nodemailer y configuración de Vercel. | La función se aloja aparte del frontend de GitHub Pages. |
| 02 | Transporte SMTP | Configurar Gmail con variables privadas, timeouts y bloqueo de acceso a archivos/URLs en el transporte. | Las credenciales no llegan al navegador ni al repositorio. |
| 03 | Contrato del endpoint | Recibir JSON por POST y atender preflight OPTIONS para el origen autorizado. | El frontend puede llamar al endpoint desde flor125.dev. |
| 04 | Validación | Comprobar tamaño, campos, email, saltos de línea, trampa para bots y configuración del servidor. | Las solicitudes inválidas se rechazan antes de intentar enviar. |
| 05 | Control de envío | Usar destinatario fijo, cuenta autenticada como remitente y visitante como Reply-To; limitar intentos por IP en cada instancia. | El endpoint no funciona como un relay hacia destinatarios arbitrarios. |
| 06 | Confirmación y errores | Responder ok solo cuando SMTP acepta el destinatario. Mostrar dialog tras ok; conservar los campos si falla. | No se muestra éxito ante rechazo SMTP o fallo de red. |
| 07 | Configuración externa | Crear el proyecto Vercel con Root Directory contact-api y cargar las variables de entorno; generar la contraseña de aplicación en Google. | Configuración del entorno de producción separada del código. |
| 08 | Conexión del frontend | Usar data-contact-endpoint y fetch JSON; retirar FormSubmit y agregar alternativa noscript con mailto. | El formulario queda conectado al endpoint público de Vercel. |
| 09 | Integración opcional | Ejecutar el comando del plugin Vercel solicitado. Informó instalación para Claude y registro en VS Code; falló para Codex. | La instalación del plugin no es necesaria para el envío de correo. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `contact-api/api/contact.js` | Nodemailer y Gmail SMTP. |
| `contact-api/lib/contact.js` | Contrato, validación y respuestas. |
| `contact-api/package.json; contact-api/package-lock.json` | Runtime y dependencia fijada. |
| `contact-api/vercel.json` | Despliegue y duración máxima. |
| `contact-api/.env.example; .gitignore` | Nombres de variables y exclusión de secretos. |
| `contact-api/lib/contact.test.js; contact-api/lib/contact-form.test.js` | Pruebas de servidor y formulario. |
| `assets/js/contact-form.js` | Envío y confirmación. |
| `index.html; assets/css/styles.css; assets/js/language.js` | Dialog, estilo, endpoint e idiomas. |
| `contact-api/README.md; README.md` | Configuración y operación. |

## Verificaciones registradas

- Pasaron ocho pruebas: éxito SMTP, rechazo/fallo SMTP, validaciones, métodos, configuración, límite de intentos, errores del cliente y duplicados.
- La API pública respondió 204 al preflight con Access-Control-Allow-Origin: https://flor125.dev.
- Una solicitud vacía devolvió 400 con error fields. Estas comprobaciones de producción no enviaron mensajes reales.
- Se comprobó la carga del handler con Nodemailer y una instalación sin vulnerabilidades reportadas en ese momento.

## Despliegue y comprobación operativa

1. Endpoint: https://portfolio-flor125-contact-api.vercel.app/api/contact.
2. En Vercel: SMTP_USER, SMTP_APP_PASSWORD y ALLOWED_ORIGINS=https://flor125.dev, sin barra final. No registrar valores secretos en documentación.
3. Para comprobar recepción real, enviar un mensaje desde el sitio y revisar Gmail y Reply-To. Registrar ese resultado aparte; no inferirlo de una prueba simulada.

## Estado final y pendientes

La confirmación representa aceptación SMTP, no lectura ni llegada garantizada a la bandeja principal. El límite de intentos es por instancia y CORS no autentica clientes externos.

## Recuperación o reversión

Ante fallos, revisar los logs sin exponer mensajes ni contraseñas, variables y conectividad SMTP. Una reversión del frontend debe apuntar a un mecanismo de envío válido; el backend puede mantenerse desplegado durante la transición.
