# Sprint 11 — Documentación de entregas por sprint

[Volver al índice](README.md)

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Publicado en main; ampliado en esta entrega |
| Referencias | f302d16 y commit de esta reorganización |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Mantener una documentación de entrega por sprint, con acciones, evidencias, despliegue y pendientes, dentro de docs.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Revisión del historial | Consultar los commits y el estado del árbol de trabajo antes de documentar. | Se distinguen cambios publicados y preparación local. |
| 02 | Aislamiento | Usar un worktree de main separado de feature/supabase-portfolio. | La documentación no incorpora ni altera el código de base pendiente. |
| 03 | Primer registro | Crear SPRINTS.md con tabla general, referencias y pendientes; enlazarlo desde README. | Entrega inicial publicada en f302d16. |
| 04 | Detalle por sprint | Crear docs/sprint-01 a docs/sprint-11 con objetivos, acciones, archivos, verificación y operación. | Cada sprint dispone de un Markdown independiente. |
| 05 | Navegación | Crear docs/README.md como índice y convertir SPRINTS.md en acceso de compatibilidad. | El README principal apunta al índice de documentación. |
| 06 | Revisión de estados | Registrar FormSubmit y portadas anteriores como históricos; mantener base local y conexión verificada como estados distintos. | El documento no presenta trabajo pendiente como producción operativa. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `docs/README.md` | Índice general de sprints. |
| `docs/sprint-*.md` | Detalle independiente por entrega. |
| `SPRINTS.md` | Referencia al índice para enlaces anteriores. |
| `README.md` | Entrada a la documentación. |

## Verificaciones registradas

- Se contrastaron referencias de commits con el historial del repositorio.
- Se revisaron enlaces Markdown locales, existencia de archivos de sprint y estructura de las tablas.
- Se ejecutó git diff --check sin errores antes del commit documental. No se requiere ejecutar pruebas de correo para cambiar documentos.

## Despliegue y comprobación operativa

1. Publicar solamente docs, SPRINTS.md y el enlace del README desde main.
2. Después del push, comprobar la navegación del índice en GitHub.

## Estado final y pendientes

Los sprints son una agrupación retrospectiva de entregas; no se inventaron fechas de inicio/cierre ni resultados de producción sin evidencia. La integración de base conserva sus pendientes.

## Recuperación o reversión

Una reversión documental no debe incluir código de la rama de base. Mantener un acceso válido desde README si se reorganizan las rutas nuevamente.
