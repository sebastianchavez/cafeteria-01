# Café Aroma — Landing Page

Landing page moderna y responsiva para una cafetería ficticia llamada **Café Aroma**. Diseñada para transmitir calidez, artesanía y la experiencia de disfrutar un buen café.

## 🖼️ Vista previa

El sitio cuenta con un diseño elegante basado en tonos cálidos (cafés, crema), tipografías serif para títulos (`Playfair Display`) y sans-serif para el cuerpo del texto (`Poppins`), junto con animaciones suaves al hacer scroll.

## ✨ Características

- **Diseño 100% responsivo** (mobile, tablet y desktop).
- **Navegación fija** con menú hamburguesa en dispositivos móviles.
- **Menú móvil off-canvas** con overlay.
- **Animaciones al hacer scroll** mediante `IntersectionObserver`.
- **Galería con lightbox** y filtros por categoría.
- **Menú de precios** filtrable por pestañas (Café, Postres, Desayunos).
- **Formulario de contacto** con validación y mensajes de estado.
- **Sección de blog/noticias** y testimonios.
- **Políticas de privacidad** y **términos y condiciones** incluidas.
- **SEO básico**: meta tags, `lang`, `description` y estructura semántica.

## 🧰 Tecnologías utilizadas

- **HTML5** semántico.
- **CSS3** (animaciones, gradientes, grid y flexbox).
- **Tailwind CSS** (vía CDN).
- **JavaScript** vanilla (sin frameworks).
- **Google Fonts**: Playfair Display + Poppins.

## 📂 Estructura del proyecto

```
cafeteria-01/
├── index.html              # Página principal
├── sobre-nosotros.html     # Historia de la cafetería
├── servicios.html          # Servicios ofrecidos
├── galeria.html            # Galería de imágenes
├── precios.html            # Carta / menú
├── contacto.html           # Formulario de contacto
├── privacidad.html         # Política de privacidad
├── terminos.html           # Términos y condiciones
├── css/
│   └── styles.css          # Estilos personalizados
└── js/
    ├── main.js             # Lógica general (nav, animaciones, formulario, etc.)
    └── data.js             # Datos dinámicos (galería, menú, equipo, etc.)
```

## 🚀 Cómo usar

1. **Clona o descarga** este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador **o** sirve la carpeta con un servidor local:

   ```bash
   # Opción 1: Python
   python -m http.server 5500

   # Opción 2: Node.js (con npx)
   npx serve .
   ```

3. Visita `http://localhost:5500` (o el puerto que indique la consola) en tu navegador.

> 💡 Algunos navegadores bloquean recursos al abrir HTML directamente con `file://`. Se recomienda usar un servidor local para evitar problemas con el JS o las fuentes.

## 🎨 Personalización

- **Colores y tipografías**: editables en el bloque `<script>` de Tailwind dentro de cada HTML o en `css/styles.css`.
- **Contenido**: modifica los textos directamente en los archivos HTML.
- **Imágenes**: reemplaza las URLs de Unsplash/placeholders por tus propias imágenes (recomendado: misma proporción para mantener la maquetación).
- **Datos dinámicos** (menú, galería, equipo): centralizados en `js/data.js`.

## 🌐 Páginas

| Página | Descripción |
|---|---|
| `index.html` | Hero, destacados, menú preview, testimonios, blog. |
| `sobre-nosotros.html` | Historia, misión, visión y equipo. |
| `servicios.html` | Catering, talleres, eventos privados, suscripciones. |
| `galeria.html` | Galería filtrable con lightbox. |
| `precios.html` | Carta completa con filtros por categoría. |
| `contacto.html` | Información de contacto y formulario. |
| `privacidad.html` | Política de privacidad. |
| `terminos.html` | Términos y condiciones. |

## 📄 Licencia

Este template se distribuye con fines demostrativos. Puedes adaptarlo libremente a tus proyectos personales o comerciales.

---

Hecho con ☕ y ❤️.