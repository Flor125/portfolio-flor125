# Sprint 02 — Educación, certificaciones e interacciones

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main |
| Referencias | cf5b21e |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Presentar la formación y las certificaciones con acceso a sus credenciales, conservando una interfaz navegable en escritorio y móvil.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Tarjetas de formación | Agregar las cinco tarjetas de UNViMe, IBM/LearnQuest, IBM/Coursera, IBM CICS y EF SET. | Cada tarjeta presenta institución, título e imagen. |
| 02 | Enlaces de credenciales | Vincular las tarjetas al registro de graduados, Coursera, Credly y EF SET. | El visitante puede abrir la evidencia de cada formación. |
| 03 | Carrusel | Implementar desplazamiento nativo, flechas y respuesta al teclado en `education.js`. | Las tarjetas se consultan horizontalmente. |
| 04 | Contacto rápido | Incorporar tarjetas de redes y copia del correo en `contact-cards.js`. | Accesos rápidos a los canales de contacto. |
| 05 | Globo e idiomas | Ajustar la interacción del globo y ampliar las traducciones. | Los nuevos controles y textos se integran a la interfaz bilingüe. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `index.html` | Tarjetas, enlaces y controles. |
| `assets/js/education.js` | Carrusel de formación. |
| `assets/js/contact-cards.js` | Contacto rápido y redes. |
| `assets/js/contacto.js` | Interacción del globo. |
| `assets/js/language.js` | Textos en ambos idiomas. |
| `assets/css/styles.css` | Presentación de las tarjetas y controles. |
| `assets/images/` | Imágenes de instituciones y certificados. |

## Verificaciones registradas

- Se revisaron las tarjetas y sus enlaces de credenciales.
- El commit registra recursos, controles y ajustes de interacción; no se documentó una suite automatizada específica para esta entrega.

## Despliegue y comprobación operativa

1. Se publica con los archivos estáticos del sitio.
2. Las credenciales se abren en servicios externos; su disponibilidad depende de esos servicios.

## Estado final y pendientes

En este sprint las tarjetas estaban escritas en el HTML. Su origen relacional se prepara en el sprint 09.

## Recuperación o reversión

Antes de revertir, conservar las imágenes que sigan referenciadas por otras secciones. Verificar las rutas después de la reversión.
