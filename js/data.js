// ==========================================
// DATOS MOCKEADOS - CAFÉ AROMA
// Imágenes reales con fallback automático
// ==========================================

// Fallback SVG que se mostrará si una imagen falla
const FALLBACK_IMG = (emoji = "☕", w = 400, h = 300) => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='fb' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#6F4E37'/>
      <stop offset='100%' stop-color='#3E2723'/>
    </linearGradient>
  </defs>
  <rect width='${w}' height='${h}' fill='url(#fb)'/>
  <text x='50%' y='55%' text-anchor='middle' font-size='${Math.floor(Math.min(w,h)*0.45)}' style='dominant-baseline: middle;'>${emoji}</text>
</svg>`)}`;

// Helper para inyectar onerror fallback en cada <img>
const imgTag = (src, alt, w = 400, h = 300, fallbackEmoji = "☕") =>
  `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG(fallbackEmoji, w, h)}';">`;

// ==========================================
// PRODUCTOS (12 items) — URLs reales de Unsplash
// ==========================================
const PRODUCTOS = [
  { id: 1,  nombre: "Espresso Clásico",            descripcion: "Café espresso intenso con notas de chocolate y nuez",          precio: 2.50, categoria: "cafe",      imagen: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80" },
  { id: 2,  nombre: "Cappuccino Italiano",         descripcion: "Espresso con leche vaporizada y espuma cremosa",             precio: 3.75, categoria: "cafe",      imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" },
  { id: 3,  nombre: "Latte Vainilla",              descripcion: "Café suave con leche y un toque de vainilla natural",         precio: 4.00, categoria: "cafe",      imagen: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&q=80" },
  { id: 4,  nombre: "Americano",                   descripcion: "Espresso diluido en agua caliente, sabor puro",               precio: 2.75, categoria: "cafe",      imagen: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80" },
  { id: 5,  nombre: "Croissant de Almendra",       descripcion: "Hojaldre crujiente relleno de crema de almendras",           precio: 3.25, categoria: "desayunos", imagen: "https://images.unsplash.com/photo-1455853828816-0c301a011711?w=400&q=80" },
  { id: 6,  nombre: "Tostada con Aguacate",        descripcion: "Pan integral con aguacate, huevo y semillas",                 precio: 6.50, categoria: "desayunos", imagen: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
  { id: 7,  nombre: "Sandwich Club",               descripcion: "Pollo, tocino, lechuga, tomate y mayonesa casera",            precio: 8.75, categoria: "almuerzos", imagen: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=400&q=80" },
  { id: 8,  nombre: "Ensalada César",              descripcion: "Lechuga romana, pollo grillado, crutones y parmesano",        precio: 9.50, categoria: "almuerzos", imagen: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80" },
  { id: 9,  nombre: "Tarta de Chocolate",          descripcion: "Tarta húmeda de chocolate belga con fresas",                 precio: 5.25, categoria: "postres",   imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
  { id: 10, nombre: "Cheesecake de Frutos Rojos",  descripcion: "Cremoso cheesecake con coulis de frutos del bosque",          precio: 5.75, categoria: "postres",   imagen: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=80" },
  { id: 11, nombre: "Frappé de Caramelo",          descripcion: "Café frío batido con leche, hielo y caramelo",               precio: 4.50, categoria: "frias",     imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
  { id: 12, nombre: "Limonada de Menta",           descripcion: "Limón natural, menta fresca y un toque de jengibre",          precio: 3.50, categoria: "frias",     imagen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80" }
];

// Atributos onerror para los <img> data-uri
PRODUCTOS.forEach(p => {
  p.fallback = FALLBACK_IMG("🍽️", 400, 300);
});

// ==========================================
// EQUIPO (4 baristas)
// ==========================================
const EQUIPO = [
  { id: 1, nombre: "Carlos Mendoza",   rol: "Barista Principal & Fundador",  descripcion: "Más de 15 años de experiencia en café de especialidad. Certificación por la SCA.", imagen: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { id: 2, nombre: "María Rodríguez",  rol: "Jefa de Pastelería",            descripcion: "Chef pastelera especializada en repostería artesanal francesa.",                  imagen: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { id: 3, nombre: "Andrés Castillo",  rol: "Maestro Tostador",              descripcion: "Experto en perfiles de tostado y origen de café de Latinoamérica.",                imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id: 4, nombre: "Laura Sánchez",    rol: "Atención al Cliente",           descripcion: "Encargada de que cada visita sea una experiencia memorable.",                       imagen: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" }
];
EQUIPO.forEach(m => { m.fallback = FALLBACK_IMG("👤", 400, 500); });

// ==========================================
// SERVICIOS (6 cards)
// ==========================================
const SERVICIOS = [
  { id: 1, titulo: "Catering para Eventos", descripcion: "Llevamos la experiencia de Café Aroma a tu evento corporativo o celebración privada.", icono: "calendar",   destacado: true  },
  { id: 2, titulo: "Clases de Barismo",     descripcion: "Aprende las técnicas profesionales de preparación de café con nuestros expertos.",     icono: "graduation", destacado: false },
  { id: 3, titulo: "Reserva de Espacios",   descripcion: "Salas privadas para reuniones, trabajo o celebraciones íntimas.",                       icono: "users",      destacado: false },
  { id: 4, titulo: "Suscripción Mensual",   descripcion: "Recibe café tostado fresco en tu hogar cada mes, con granos de diferentes orígenes.",   icono: "package",    destacado: true  },
  { id: 5, titulo: "Servicio a Domicilio",  descripcion: "Disfruta nuestros productos en la comodidad de tu hogar u oficina.",                    icono: "truck",      destacado: false },
  { id: 6, titulo: "Eventos Privados",      descripcion: "Organizamos degustaciones, catas de café y experiencias gastronómicas únicas.",         icono: "star",       destacado: false }
];

// ==========================================
// GALERÍA (12 imágenes)
// ==========================================
const GALERIA = [
  { id: 1,  url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",  categoria: "interior", titulo: "Ambiente acogedor",     fallback: FALLBACK_IMG("🏠", 600, 600) },
  { id: 2,  url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",  categoria: "bebidas",  titulo: "Cappuccino artístico", fallback: FALLBACK_IMG("☕", 600, 600) },
  { id: 3,  url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",  categoria: "comida",   titulo: "Desayuno completo",    fallback: FALLBACK_IMG("🍳", 600, 600) },
  { id: 4,  url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80", categoria: "interior", titulo: "Sala principal",       fallback: FALLBACK_IMG("📚", 600, 600) },
  { id: 5,  url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80", categoria: "comida",   titulo: "Tostadas gourmet",     fallback: FALLBACK_IMG("🥑", 600, 600) },
  { id: 6,  url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",  categoria: "bebidas",  titulo: "Cold Brew",            fallback: FALLBACK_IMG("🧊", 600, 600) },
  { id: 7,  url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80", categoria: "eventos",  titulo: "Cata de café",         fallback: FALLBACK_IMG("🎉", 600, 600) },
  { id: 8,  url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80", categoria: "interior", titulo: "Rincón de lectura",    fallback: FALLBACK_IMG("🪴", 600, 600) },
  { id: 9,  url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80", categoria: "postres",  titulo: "Postres artesanales",  fallback: FALLBACK_IMG("🍰", 600, 600) },
  { id: 10, url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",  categoria: "eventos",  titulo: "Celebraciones",        fallback: FALLBACK_IMG("🥂", 600, 600) },
  { id: 11, url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80", categoria: "bebidas",  titulo: "Latte especial",       fallback: FALLBACK_IMG("🍵", 600, 600) },
  { id: 12, url: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=800&q=80",  categoria: "comida",   titulo: "Brunch dominical",     fallback: FALLBACK_IMG("🥞", 600, 600) }
];

// ==========================================
// TESTIMONIOS (4 reseñas)
// ==========================================
const TESTIMONIOS = [
  { id: 1, nombre: "Patricia Gómez",     comentario: "El mejor café que he probado en la ciudad. El ambiente es acogedor y el personal siempre amable. ¡Mi lugar favorito para trabajar!", estrellas: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", cargo: "Diseñadora UX", fallback: FALLBACK_IMG("P", 100, 100) },
  { id: 2, nombre: "Roberto Fernández",  comentario: "Sus pasteles son una obra de arte. El croissant de almendras es simplemente espectacular. Vengo todas las mañanas.",                       estrellas: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", cargo: "Empresario",    fallback: FALLBACK_IMG("R", 100, 100) },
  { id: 3, nombre: "Sofía Martín",       comentario: "Las clases de barismo son increíbles. Aprendí muchísimo y ahora puedo preparar café profesional en casa. ¡100% recomendado!",          estrellas: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", cargo: "Estudiante",    fallback: FALLBACK_IMG("S", 100, 100) },
  { id: 4, nombre: "Diego Ramírez",      comentario: "Contraté el catering para mi boda y fue un éxito total. Todos los invitados elogiaron el café y la atención.",                       estrellas: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", cargo: "Ingeniero",     fallback: FALLBACK_IMG("D", 100, 100) }
];

// ==========================================
// HITOS
// ==========================================
const HITOS = [
  { año: "2015", titulo: "El inicio",      descripcion: "Abrimos nuestras puertas con un sueño: compartir café de calidad." },
  { año: "2018", titulo: "Expansión",      descripcion: "Triplicamos nuestro menú y abrimos zona de pastelería artesanal." },
  { año: "2021", titulo: "Reconocimiento", descripcion: "Premio a Mejor Cafetería de Especialidad de la región." },
  { año: "2024", titulo: "Hoy",            descripcion: "Más de 15,000 clientes satisfechos y 8 orígenes de café diferentes." }
];

// ==========================================
// ESTADÍSTICAS
// ==========================================
const ESTADISTICAS = [
  { numero: "9",   texto: "Años de experiencia"   },
  { numero: "15K+", texto: "Clientes felices"      },
  { numero: "8",   texto: "Orígenes de café"      },
  { numero: "30+", texto: "Variedades en menú"     }
];

// ==========================================
// Imágenes estáticas en HTML (con fallback)
// ==========================================
const HERO_HOME_IMG     = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80";
const HERO_HOME_FALLBACK = FALLBACK_IMG("☕", 1920, 1080);

const IMG_SOBRE_NOSOTROS   = "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80";
const IMG_SOBRE_FALLBACK   = FALLBACK_IMG("☕", 800, 500);

const IMG_EQUIPO_TRABAJANDO = "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=900&q=80";
const IMG_EQUIPO_FALLBACK   = FALLBACK_IMG("👥", 900, 400);
