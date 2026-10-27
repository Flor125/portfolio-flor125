(() => {
    const translations = {
        'Proyecto anterior': 'Previous project', 'Proyecto siguiente': 'Next project',
        'Ver toda la experiencia': 'View all experience', 'Ver menos': 'Show less',

        'Envío confirmado': 'Message sent',
        'Gracias por escribirme. Te responderé a tu correo.': 'Thanks for getting in touch. I will reply to your email.',
        'Cerrar': 'Close', 'Enviando…': 'Sending…',
        'Tu mensaje llegará directamente a mi correo.': 'Your message will reach my inbox directly.',
        'No pudimos confirmar el envío. Tu mensaje sigue en el formulario. Podés intentar de nuevo o escribirme a sombraflorencia097@gmail.com.': 'We could not confirm delivery. Your message is still in the form. Try again or email sombraflorencia097@gmail.com.',

        'EF SET Cert: ver certificado C1 Advanced (abre en otra pestaña)': 'EF SET Cert: view C1 Advanced certificate (opens in a new tab)',
        'Certificado EF SET C1 Advanced': 'EF SET C1 Advanced certificate',
        'IBM: ver certificado en Credly (abre en otra pestaña)': 'IBM: view certificate on Credly (opens in a new tab)',
        'Certificado Modernize Applications with IBM CICS': 'Modernize Applications with IBM CICS certificate',
        'IBM & Coursera: ver certificado en Coursera (abre en otra pestaña)': 'IBM & Coursera: view certificate on Coursera (opens in a new tab)',
        'Certificado IBM z/OS Mainframe Practitioner': 'IBM z/OS Mainframe Practitioner certificate',
        'IBM & LearnQuest: ver certificado en Coursera (abre en otra pestaña)': 'IBM & LearnQuest: view certificate on Coursera (opens in a new tab)',
        'Certificado IBM Mainframe Developer de IBM y LearnQuest': 'IBM Mainframe Developer certificate from IBM and LearnQuest',
        'Universidad Nacional de Villa Mercedes: consultar título en el registro de graduados (abre en otra pestaña)': 'Universidad Nacional de Villa Mercedes: verify degree in the graduate registry (opens in a new tab)',
        'Tarjeta anterior': 'Previous card', 'Tarjeta siguiente': 'Next card',
        'Educación': 'Education',
        '04 / Formación continua': '04 / Continuous learning',
        'Educación y certificados': 'Education & certifications',
        'Mi formación académica y los aprendizajes que acompañan mi desarrollo profesional.': 'My academic background and the learning experiences supporting my professional development.',
        'Programadora Universitaria de Sistemas': 'Associate Degree in System Programming',
        'Institución y período por completar.': 'Institution and dates to be added.',
        'Certificados': 'Certifications',
        'Aprendizaje continuo': 'Continuous learning',
        'Próximamente voy a compartir mis cursos y certificaciones, con sus credenciales.': 'I will soon share my courses and certifications, along with their credentials.',

        'Ir al contenido': 'Skip to content', 'Inicio': 'Home', 'Sobre mí': 'About me', 'Proyectos': 'Projects', 'Experiencia': 'Experience', 'Contacto': 'Contact',
        'Desarrolladora backend con experiencia en Java, Python y modernización de sistemas mainframe.': 'Backend developer with experience in Java, Python, and mainframe system modernization.',
        'Explorá mis proyectos': 'Explore my projects', '01 / Sobre mí': '01 / About me', 'Un poco de mí': 'A little about me',
        'Soy una persona curiosa, preserverante y con muchas ganas de aplicar mis conocimientos en empresas. Disfruto enfrentar desafíos, investigar cómo funcionan las cosas y encontrar soluciones. Me gusta trabajar en equipo, intercambiar ideas y aprender de otras perspectivas, pero también tengo la iniciativa para explorar y resolver problemas por mi cuenta. Creo en el aprendizaje constante, la creatividad y en mejorar un poquito con cada proyecto.': 'I am curious, persistent, and eager to apply my knowledge in a professional setting. I enjoy tackling challenges, exploring how things work, and finding solutions. I like working in teams, exchanging ideas, and learning from different perspectives, while also taking the initiative to explore and solve problems independently. I believe in continuous learning, creativity, and getting a little better with every project.',
        'Mi stack': 'My tech stack', 'Bases de datos': 'Databases', 'DevOps y herramientas': 'DevOps & tools',
        '02 / Proyectos': '02 / Projects', 'Mis proyectos': 'My projects',
        'Proyectos donde combino backend, modernización de sistemas y construcción de productos.': 'Projects combining backend development, system modernization, and product building.',
        'Padrón Electoral': 'Electoral Register',
        'Sistema de gestión de registros electorales desarrollado en Java, con interfaz gráfica y persistencia de datos en MySQL': 'Electoral record management system built in Java, with a graphical interface and MySQL data persistence.',
        'Sistema de gestión de inventario y ventas desplegado en IBM LinuxONE Community Cloud, que integra una aplicación web con procesamiento batch en COBOL.': 'Inventory and sales management system deployed on IBM LinuxONE Community Cloud, integrating a web application with COBOL batch processing.',
        'Aplicación móvil en desarrollo para crear CVs, adaptarlos a ofertas laborales y organizar postulaciones.': 'Mobile app in development for creating resumes, tailoring them to job openings, and tracking applications.',
        'En desarrollo': 'In development', 'Privado · En desarrollo': 'Private · In development', '03 / Mi recorrido': '03 / My journey',
        'Contenido de ejemplo · Próximamente, mi experiencia y mis proyectos reales.': 'My experience, collaborations, and professional journey.',
        '2026 – Actualidad': '2026 – Present', 'Puesto': 'Role', 'Ubicación': 'Location', 'Sector': 'Industry', 'Remoto': 'Remote',
        'Desarrollo de software / Open Source': 'Software development / Open Source',
        'Analicé problemas reportados en repositorios colaborativos e implementé correcciones y mejoras en aplicaciones existentes.': 'I analyzed issues reported in collaborative repositories and implemented fixes and improvements in existing applications.',
        'Contribuí al desarrollo de funcionalidades y endpoints de verificación del estado de servicios. Trabajé con Git, GitHub, pull requests y revisiones de código.': 'I contributed features and service health-check endpoints, working with Git, GitHub, pull requests, and code reviews.',
        '02 / Universidad Nacional de Villa Mercedes': '02 / National University of Villa Mercedes',
        'Práctica Profesional Supervisada': 'Supervised Professional Practice', 'Desarrollo de aplicación de gestión comercial': 'Business management application development',
        'Marzo 2025 – Marzo 2026': 'March 2025 – March 2026', 'Desarrolladora de Software': 'Software Developer',
        'Desarrollo de software / Gestión comercial': 'Software development / Business management',
        'Realicé el relevamiento de necesidades, diseñé e implementé funcionalidades para la administración de información comercial e inventario.': 'I gathered requirements and designed and implemented features for managing business information and inventory.',
        'Integré tecnologías como Python, Flask y bases de datos, realizando pruebas funcionales, validación de información y presentación de resultados ante una evaluación académica.': 'I integrated Python, Flask, and databases, performed functional testing and data validation, and presented the results for academic evaluation.',
        '03 / Becada': '03 / Scholarship recipient',
        'Programa de colaboración intergeneracional para desarrollar soluciones digitales accesibles a problemas reales.': 'An intergenerational collaboration program developing accessible digital solutions to real-world problems.',
        'Agosto – Septiembre 2026': 'August – September 2026', 'Colaboradora de Desarrollo y UX': 'Development & UX Collaborator', 'Remoto — Chile': 'Remote — Chile',
        'Desarrollo web / UX / Innovación': 'Web development / UX / Innovation',
        'Trabajé durante aproximadamente dos meses junto a una profesional senior en el diseño y desarrollo de un MVP para la gestión de turnos de licencias de conducir.': 'For approximately two months, I worked alongside a senior professional to design and develop an MVP for managing driving license appointments.',
        'Participé en la construcción de interfaces con Figma y Lovable, utilizando herramientas de inteligencia artificial para acelerar el prototipado y desarrollo. Colaboré en la organización de tareas, reuniones de seguimiento y validación de la propuesta con 27 participantes.': 'I helped build interfaces with Figma and Lovable, using AI tools to accelerate prototyping and development. I collaborated on task planning, progress meetings, and validating the proposal with 27 participants.',
        'Conectemos.': 'Let’s connect.', '¿Tenés una idea, un proyecto o una propuesta? Me gustaría conocerla y pensar qué podemos crear juntos.': 'Have an idea, a project, or a proposal? I would love to hear about it and explore what we can create together.',
        'Hablemos': 'Get in touch', 'Estoy buscando oportunidades como desarrolladora de software, especialmente en backend, y también participo en proyectos freelance.': 'I am looking for software development opportunities, especially in backend, and I also take on freelance projects.',
        'Correo electrónico': 'Email', 'Ver perfil': 'View profile', 'Pausar globo': 'Pause globe', 'Girar globo': 'Rotate globe',
        'Dejame un mensaje': 'Send me a message', 'Tu mensaje llegará a mi correo a través de FormSubmit.': 'Your message will reach my inbox through FormSubmit.',
        'Nombre completo': 'Full name', 'Tu nombre': 'Your name', 'nombre@ejemplo.com': 'name@example.com', 'Empresa': 'Company', '(opcional)': '(optional)', 'Tu empresa o equipo': 'Your company or team',
        'Mensaje': 'Message', 'Contame sobre tu idea…': 'Tell me about your idea…', 'Enviar': 'Send',
        'Ideas, procesos y proyectos.': 'Ideas, processes, and projects.', 'Explorá': 'Explore', 'Mi recorrido': 'My journey', 'Conectemos': 'Connect', 'Volver arriba ↑': 'Back to top ↑',
        'Ver mi CV': 'View my CV', 'Mi CV': 'My CV', 'Abrir PDF ↗': 'Open PDF ↗', 'Descargar ↓': 'Download ↓', 'Mi CV, próximamente': 'My CV, coming soon',
        'El documento todavía no está disponible. Pronto vas a poder consultarlo y descargarlo desde acá.': 'The document is not available yet. You will soon be able to view and download it here.',
        'Si el PDF no se muestra en tu navegador, usá “Abrir PDF” o “Descargar”.': 'If the PDF does not display in your browser, use “Open PDF” or “Download”.',
        'Navegación principal': 'Main navigation', 'Pie de página': 'Footer', 'Cerrar visor del CV': 'Close CV viewer',
        'Visor del curriculum vitae de Sombra': 'Sombra’s curriculum vitae viewer', 'Retrato de Florencia Sombra': 'Portrait of Florencia Sombra',
        'Mockup de la aplicación de inventario Kiosco Management System': 'Kiosco Management System inventory app mockup',
        'Mockup de la aplicación móvil Seeki para crear currículums': 'Seeki resume builder mobile app mockup',
        'Padrón Electoral: ver repositorio en GitHub (abre en otra pestaña)': 'Electoral Register: view GitHub repository (opens in a new tab)',
        'Kiosco Management System: ver repositorio en GitHub (abre en otra pestaña)': 'Kiosco Management System: view GitHub repository (opens in a new tab)',
        'Mi portfolio: un espacio para compartir ideas, proyectos y nuevas posibilidades.': 'My portfolio: a space to share ideas, projects, and new possibilities.',
    };
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const selector = document.querySelector('.language-selector');
    const trigger = selector.querySelector('.language-trigger');
    const menu = selector.querySelector('.language-options');
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return node.parentElement.closest('script, style, .language-selector') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
    });
    while (walker.nextNode()) {
        const node = walker.currentNode;
        const key = normalize(node.textContent);
        if (translations[key]) textNodes.push({ node, original: node.textContent, english: translations[key] });
    }
    const attributes = [];
    document.querySelectorAll('[aria-label], [placeholder], [alt], [title], meta[name="description"]').forEach((element) => {
        for (const name of ['aria-label', 'placeholder', 'alt', 'title', 'content']) {
            const value = element.getAttribute(name);
            if (value && translations[normalize(value)]) attributes.push({ element, name, original: value, english: translations[normalize(value)] });
        }
    });
    let language = 'es';
    function setLanguage(next) {
        language = next;
        document.documentElement.lang = next;
        textNodes.forEach(({ node, original, english }) => { node.textContent = next === 'en' ? english : original; });
        attributes.forEach(({ element, name, original, english }) => element.setAttribute(name, next === 'en' ? english : original));
        selector.querySelector('.language-current').textContent = next === 'en' ? 'English' : 'Spanish';
        selector.querySelector('.language-flag').textContent = next === 'en' ? '🇺🇸' : '🇪🇸';
        trigger.setAttribute('aria-label', next === 'en' ? 'Select language' : 'Seleccionar idioma');
        selector.querySelectorAll('[data-language]').forEach((button) => {
            const selected = button.dataset.language === next;
            button.setAttribute('aria-pressed', String(selected));
            button.querySelector('.language-check').textContent = selected ? '✓' : '';
        });
        try { localStorage.setItem('portfolio-language', next); } catch {}
        const dialog = document.querySelector('.cv-dialog');
        if (dialog) {
            const source = next === 'en' ? dialog.dataset.pdfEn : dialog.dataset.pdfEs;
            if (source) dialog.dataset.pdfSrc = source;
            dialog.querySelector('.cv-download').download = next === 'en' ? 'Resume-Florencia-Sombra.pdf' : 'CV-Florencia-Sombra.pdf';
        }
        const iframe = document.querySelector('.cv-frame');
        iframe?.contentWindow?.postMessage({ type: 'portfolio-language', language: next }, location.origin === 'null' ? '*' : location.origin);
        document.dispatchEvent(new CustomEvent('portfolio-language', { detail: next }));
    }
    function close(focus = false) { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); if (focus) trigger.focus(); }
    trigger.addEventListener('click', () => { menu.hidden = !menu.hidden; trigger.setAttribute('aria-expanded', String(!menu.hidden)); });
    trigger.addEventListener('keydown', (event) => { if (event.key === 'ArrowDown') { event.preventDefault(); menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); menu.querySelector('button').focus(); } });
    menu.addEventListener('keydown', (event) => {
        const buttons = [...menu.querySelectorAll('button')];
        const index = buttons.indexOf(document.activeElement);
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus(); }
    });
    let languageTimer;
    let languageAnimations = [];
    let pendingLanguage = null;
    const animatedText = [...new Set(textNodes.map(({ node }) => node.parentElement))];
    function changeLanguage(next) {
        close(true);
        clearTimeout(languageTimer);
        languageAnimations.forEach((animation) => animation.cancel());
        languageAnimations = [];
        pendingLanguage = null;
        if (next === language || matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setLanguage(next);
            return;
        }
        pendingLanguage = next;
        // Fade existing letters out before swapping their translations.
        const out = document.body.animate([
            { opacity: 1, filter: 'blur(0px)' },
            { opacity: .15, filter: 'blur(2px)' }
        ], { duration: 400, easing: 'ease-in', fill: 'forwards' });
        languageAnimations.push(out);
        languageTimer = setTimeout(() => {
            setLanguage(next);
            pendingLanguage = null;
            out.cancel();
            languageAnimations.push(document.body.animate([
                { opacity: .15 }, { opacity: 1 }
            ], { duration: 600, easing: 'ease-out' }));
            animatedText.forEach((element, index) => {
                const delay = (index % 5) * 25;
                languageAnimations.push(element.animate([
                    { opacity: 0, filter: 'blur(4px)' },
                    { opacity: 1, filter: 'blur(0px)' }
                ], { duration: 500, delay, easing: 'ease-out', fill: 'backwards' }));
            });
        }, 400);
    }
    selector.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => changeLanguage(button.dataset.language)));
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
        if (!event.matches) return;
        clearTimeout(languageTimer);
        languageAnimations.forEach((animation) => animation.cancel());
        if (pendingLanguage) setLanguage(pendingLanguage);
        pendingLanguage = null;
    });
    document.addEventListener('click', (event) => { if (!selector.contains(event.target)) close(); });
    selector.addEventListener('focusout', (event) => { if (!selector.contains(event.relatedTarget)) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !menu.hidden) { event.stopPropagation(); close(true); } });
    // Other scripts use this function for labels that change after interaction.
    window.portfolioTranslate = (spanish) => language === 'en' ? translations[normalize(spanish)] || spanish : spanish;
    let saved; try { saved = localStorage.getItem('portfolio-language'); } catch {}
    setLanguage(saved === 'en' ? 'en' : 'es');
})();
