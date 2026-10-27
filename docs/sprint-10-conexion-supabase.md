# Sprint 10 — Conexión de Supabase y acceso al proyecto

[Volver al índice](README.md)

> Registro histórico. La activación posterior de la base y sus verificaciones reales están en el [sprint 12](sprint-12-activacion-supabase.md).

## Ficha de entrega

| Campo | Detalle |
| --- | --- |
| Estado | Conexión verificada; esquema sin modificar |
| Referencias | Configuración externa, sin commit de aplicación |
| Producto | Portfolio Florencia Sombra — https://flor125.dev |

## Objetivo

Habilitar acceso administrativo al proyecto correcto para poder aplicar y comprobar la integración relacional.

## Acciones realizadas

| Paso | Acción | Implementación | Resultado |
| --- | --- | --- | --- |
| 01 | Diagnóstico del conector anterior | Consultar proyectos y tablas: el conector disponible devolvía lista vacía y falta de permisos. | Se identifica que la sesión existente no accedía al proyecto elegido. |
| 02 | Identificación del proyecto | Confirmar el proyecto iwllvbwevpflsbtquhiz en la organización Portfolio y su URL pública de API. | Queda definido el destino de la migración. |
| 03 | Registro del MCP | Ejecutar codex mcp add supabase con URL de mcp.supabase.com y project_ref del proyecto. | Se agrega el servidor MCP global de Codex. |
| 04 | Autorización | Completar OAuth en el navegador hasta que la CLI informa Successfully logged in. | La cuenta autoriza la conexión del servidor nuevo. |
| 05 | Renovación de la sesión | Cargar las nuevas herramientas mcp__supabase, diferenciándolas del conector anterior sin acceso. | La sesión dispone de herramientas vinculadas al proyecto. |
| 06 | Comprobación | Consultar get_project_url y list_tables del esquema public. | La URL coincide y public devuelve tables vacío, sin cambios en remoto. |

## Archivos y responsabilidades

| Archivo o recurso | Responsabilidad |
| --- | --- |
| `Configuración MCP de Codex` | Servidor supabase vinculado mediante project_ref. No se publican tokens ni credenciales. |
| `assets/js/portfolio-config.js` | Configuración local pendiente de publishable key; corresponde al sprint 09. |

## Verificaciones registradas

- La CLI informó Successfully logged in.
- La herramienta nueva devolvió https://iwllvbwevpflsbtquhiz.supabase.co.
- list_tables con schemas public devolvió tables vacío.
- La consulta de acceso fue de solo lectura: no creó tablas ni aplicó migraciones.

## Despliegue y comprobación operativa

1. Usar las herramientas nuevas del servidor Supabase para el proyecto correcto.
2. Antes de cualquier DDL, volver a inspeccionar tablas y migraciones: la base puede haber cambiado desde esta comprobación.

## Estado final y pendientes

Conectar el servidor MCP no conecta automáticamente las tarjetas del sitio ni aplica los archivos SQL. Esos pasos siguen pendientes.

## Recuperación o reversión

Una desconexión de MCP afecta el acceso administrativo desde Codex, no borra el proyecto. Reautorizar el servidor si caduca la sesión, sin publicar enlaces OAuth transitorios ni tokens.
