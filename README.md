# Florencia Sombra · Portfolio

[Español](#español) · [English](#english)

## Español

Portfolio personal de **Florencia Alicia Sombra**, Programadora Universitaria de Sistemas, enfocado en desarrollo backend, aplicaciones web y modernización de sistemas. Presenta mi perfil, stack tecnológico, proyectos, experiencia y canales de contacto.

### Características

- Página única con navegación por secciones y transiciones estilo diapositiva.
- Interfaz en español e inglés con preferencia guardada en el navegador.
- Modo claro y oscuro, con switch animado de sol y luna y transición gradual del tema.
- Fondo interactivo Grid Pulse y footer con la palabra «sombra» formada por puntos animados.
- Dock de tecnologías organizado por categorías, con efectos de ampliación y etiquetas.
- Tarjetas de proyectos con efecto 3D y enlaces a repositorios públicos.
- Visor de CV en una ventana: miniaturas, navegación por páginas, zoom, rotación, búsqueda y descarga. El idioma seleccionado determina qué PDF se abre.
- Globo animado en Contacto, diseño adaptable y soporte para preferencias de movimiento reducido.

### Tecnologías del sitio

HTML5, CSS3 y JavaScript, sin framework ni proceso de compilación. Se utilizan **PDF.js** para visualizar el CV, **D3.js** y **TopoJSON Client** para el globo, y recursos externos para mapas y logos. Las dependencias se cargan desde CDN.

El stack mostrado en el portfolio representa mis conocimientos; no todas esas tecnologías se utilizan para implementar este sitio.

### Ejecutar localmente

Abrí la carpeta en VS Code y usá **Live Server** sobre `index.html`. Como alternativa, con Python 3 instalado, ejecutá desde la raíz:

```bash
python3 -m http.server 5500
```

Luego visitá [localhost:5500](http://localhost:5500). No hace falta instalar paquetes de npm. Usá un servidor local para que el visor del CV pueda cargar los documentos. Los recursos de CDN requieren conexión a internet.

### Estructura

```text
.
├── index.html                  # Página principal con todas las secciones
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos y temas
│   ├── js/
│   │   ├── script.js           # Navegación, tarjetas, dock, footer y ventana del CV
│   │   ├── language.js         # Selector y traducciones
│   │   ├── theme.js            # Modo claro/oscuro
│   │   ├── grid-pulse.js       # Fondo interactivo
│   │   ├── contacto.js         # Globo y comportamiento del formulario
│   │   └── cv-viewer.js        # Controles y renderizado del PDF
│   ├── images/                 # Retrato y mockups
│   └── documents/              # CV en español y Resume en inglés
└── pages/
    └── cv-viewer.html          # Interfaz del visor
```

### Proyectos destacados

| Proyecto | Descripción | Repositorio |
| --- | --- | --- |
| Padrón Electoral | Gestión de registros electorales con Java, Swing, JDBC y MySQL. | [Ver código](https://github.com/Flor125/padron) |
| Kiosco Management System | Gestión de inventario y ventas con Python, Flask, COBOL, Db2 y Docker. | [Ver código](https://github.com/Flor125/kiosco-management-system-mainframe) |
| Seeki | Aplicación móvil para crear CVs y organizar postulaciones, con Kotlin, Compose y Firebase. | Privado · En desarrollo |

### Personalización y estado actual

- **Contenido:** editá `index.html`. Las traducciones están en `assets/js/language.js`.
- **Estilos:** modificá `assets/css/styles.css`.
- **CV:** los archivos están en `assets/documents/`; sus rutas por idioma se configuran con `data-pdf-es` y `data-pdf-en` en el diálogo del CV de `index.html`.
- **Contacto:** el formulario es una vista previa y **no envía mensajes**. Los enlaces de correo y redes permiten el contacto directo.

### Contacto

[Email](mailto:sombraflorencia097@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sombraflorencia) · [GitHub](https://github.com/Flor125)

---

## English

Personal portfolio of **Florencia Alicia Sombra**, with an **Associate Degree in System Programming**, focused on backend development, web applications, and system modernization. It showcases my profile, tech stack, projects, experience, and contact channels.

### Features

- Single-page layout with section navigation and slide-style transitions.
- Spanish and English interface with a saved language preference.
- Light and dark modes, an animated sun/moon switch, and a gradual theme transition.
- Interactive Grid Pulse background and a footer featuring «sombra» rendered as animated dots.
- Categorized technology dock with magnification effects and labels.
- Project cards with a 3D effect and links to public repositories.
- Modal CV viewer with thumbnails, page navigation, zoom, rotation, search, and download. The selected language determines which PDF opens.
- Animated contact globe, responsive layout, and support for reduced-motion preferences.

### Website technologies

HTML5, CSS3, and JavaScript, with no framework or build process. The site uses **PDF.js** for the CV viewer, **D3.js** and **TopoJSON Client** for the globe, and external map and logo resources. Dependencies are loaded from CDNs.

The tech stack displayed in the portfolio represents my skills; not all of those technologies are used to build this website.

### Run locally

Open the folder in VS Code and launch `index.html` with **Live Server**. Alternatively, with Python 3 installed, run this command from the project root:

```bash
python3 -m http.server 5500
```

Visit [localhost:5500](http://localhost:5500). No npm installation is required. Use a local server so the CV viewer can load its documents. CDN resources require an internet connection.

### Structure

- `index.html`: main page containing all portfolio sections.
- `assets/css/`: shared styles and themes.
- `assets/js/`: navigation, translations, theme switching, interactive effects, globe, and PDF viewer.
- `assets/images/`: portrait and project mockups.
- `assets/documents/`: Spanish CV and English resume.
- `pages/cv-viewer.html`: PDF viewer interface.

### Featured projects

| Project | Description | Repository |
| --- | --- | --- |
| Electoral Register | Electoral record management with Java, Swing, JDBC, and MySQL. | [View code](https://github.com/Flor125/padron) |
| Kiosco Management System | Inventory and sales management with Python, Flask, COBOL, Db2, and Docker. | [View code](https://github.com/Flor125/kiosco-management-system-mainframe) |
| Seeki | Resume-building and job application tracking mobile app using Kotlin, Compose, and Firebase. | Private · In development |

### Customization and current status

- **Content:** edit `index.html`. Translations live in `assets/js/language.js`.
- **Styles:** edit `assets/css/styles.css`.
- **CV:** PDF files are stored in `assets/documents/`. Language-specific paths are configured through `data-pdf-es` and `data-pdf-en` on the CV dialog in `index.html`.
- **Contact:** the form is a preview and **does not send messages**. Email and social links provide direct contact options.

### Contact

[Email](mailto:sombraflorencia097@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sombraflorencia) · [GitHub](https://github.com/Flor125)
