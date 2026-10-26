# Correo del portfolio en Vercel

Esta carpeta se despliega como un proyecto independiente. El portfolio sigue en GitHub Pages.

1. En Vercel: **Add New → Project → Import Git Repository**, seleccionar `Flor125/portfolio-flor125`.
2. Elegir **Framework Preset: Other** y **Root Directory: contact-api**. Dejar Build Command sin configurar; `vercel.json` fija `public` como directorio de salida. Usar Node.js 24.
3. En **Environment Variables**, cargar para Production:
   - `SMTP_USER`: `sombraflorencia097@gmail.com`
   - `SMTP_APP_PASSWORD`: la contraseña de aplicación creada en Google, nunca la contraseña habitual.
   - `ALLOWED_ORIGINS`: `https://flor125.dev`
4. Pulsar **Deploy**. Si se cambian variables después, hacer **Redeploy**. La URL de producción debe permitir acceso público para que los visitantes puedan usarla (revisar Deployment Protection si responde con una pantalla de acceso).
5. Copiar la URL estable del proyecto (`https://nombre-del-proyecto.vercel.app`). El endpoint es esa URL seguida de `/api/contact`.
6. El formulario ya está conectado a `https://portfolio-flor125-contact-api.vercel.app/api/contact` mediante `data-contact-endpoint` y envía JSON con JavaScript. Si cambia la URL del proyecto, actualizar ese atributo y `action` en `index.html`.
7. Desde `https://flor125.dev`, enviar una prueba y comprobar recepción, Reply-To y popup. Comprobar también un fallo de red: debe conservar los campos y mostrar error. Sin JavaScript se muestra un enlace de correo alternativo.

El correo siempre se manda al destinatario fijo del portfolio. Gmail autentica al remitente; el visitante se usa solo en Reply-To. Se validan campos y origen, se incluye una trampa para bots y un límite de cinco intentos por IP cada diez minutos **por instancia**. Ese límite no es una cuota distribuida: si hay abuso, configurar reglas en Vercel Firewall. CORS no autentica clientes externos.

El popup confirma aceptación por SMTP, no lectura ni llegada garantizada a la bandeja principal. No se registran mensajes ni credenciales en la función. Las variables privadas nunca deben agregarse al HTML ni al repositorio.

Pruebas sin enviar correos: `npm test` desde esta carpeta. Los tests usan un transporte simulado.
