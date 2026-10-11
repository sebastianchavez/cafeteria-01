// ============================================
// CAFÉ AROMA - LÓGICA PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // OBSERVER GLOBAL (declarado UNA VEZ)
  // ============================================
  let revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
  }

  // Función para revelar elementos (estáticos o dinámicos)
  const observeReveal = (root = document) => {
    if (!revealObserver) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    root.querySelectorAll('.reveal').forEach(el => {
      // Si ya está visible, no lo observamos de nuevo
      if (!el.classList.contains('visible')) {
        revealObserver.observe(el);
      }
    });
  };

  // Fallback: si después de 2s un elemento .reveal sigue sin ser visible,
  // forzarlo a visible (por si el observer no se dispara)
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        el.classList.add('visible');
      }
    });
  }, 1500);

  // ---------- 1) NAVBAR scroll ----------
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---------- 2) Menú móvil ----------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const closeMenu = document.querySelector('.close-menu');

  const openMenu = () => {
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenuFn = () => {
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMenu);
  closeMenu?.addEventListener('click', closeMenuFn);
  mobileOverlay?.addEventListener('click', closeMenuFn);

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenuFn);
  });

  // ---------- 3) Reveal inicial (elementos HTML estáticos) ----------
  observeReveal();

  // ---------- 4) Página activa en navbar ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- 5) PRODUCTOS DESTACADOS (solo en index) ----------
  const productosDestacados = document.querySelector('#productos-destacados');
  if (productosDestacados && typeof PRODUCTOS !== 'undefined') {
    const destacados = PRODUCTOS.slice(0, 4);
    productosDestacados.innerHTML = destacados.map((p, i) => `
      <div class="product-card bg-white rounded-2xl overflow-hidden shadow-md reveal reveal-delay-${(i % 4) + 1}">
        <div class="overflow-hidden h-56">
          <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover" loading="lazy"
               onerror="this.onerror=null;this.src='${p.fallback}';">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2 gap-3">
            <h3 class="text-xl font-bold text-gray-900">${p.nombre}</h3>
            <span class="text-coffee font-bold text-lg whitespace-nowrap">$${p.precio.toFixed(2)}</span>
          </div>
          <p class="text-gray-600 text-sm">${p.descripcion}</p>
        </div>
      </div>
    `).join('');
    observeReveal(productosDestacados);
  }

  // ---------- 6) TESTIMONIOS (4 cards en grid en desktop/tablet, carousel en móvil) ----------
  const testimoniosContainer = document.querySelector('#testimonios-container');
  if (testimoniosContainer && typeof TESTIMONIOS !== 'undefined') {
    let currentSlide = 0;
    let isMobile = window.innerWidth < 768;

    const renderTestimonios = () => {
      isMobile = window.innerWidth < 768;

      // MODO MÓVIL: carousel (1 a la vez)
      if (isMobile) {
        const slideWidthPercent = 100;
        const totalWidthPercent = TESTIMONIOS.length * slideWidthPercent;
        const translateX = currentSlide * slideWidthPercent;

        testimoniosContainer.innerHTML = `
          <div class="overflow-hidden relative">
            <div class="flex transition-transform duration-500 ease-out" style="transform: translateX(-${translateX}%); width: ${totalWidthPercent}%;">
              ${TESTIMONIOS.map(t => `
                <div class="px-2 shrink-0" style="width: ${slideWidthPercent}%; flex: 0 0 ${slideWidthPercent}%;">
                  <div class="bg-white p-6 rounded-2xl shadow-md h-full">
                    <div class="flex text-yellow-400 mb-3">${'★'.repeat(t.estrellas)}</div>
                    <p class="text-gray-700 italic mb-5 leading-relaxed text-sm">"${t.comentario}"</p>
                    <div class="flex items-center gap-3">
                      <img src="${t.avatar}" alt="${t.nombre}" class="w-12 h-12 rounded-full object-cover"
                           onerror="this.onerror=null;this.src='${t.fallback}';">
                      <div>
                        <h4 class="font-bold text-gray-900 text-sm">${t.nombre}</h4>
                        <p class="text-xs text-gray-500">${t.cargo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="flex justify-center gap-2 mt-6">
            ${TESTIMONIOS.map((_, i) => `
              <button class="dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-yellow-300 w-7' : 'bg-white/40'}" data-index="${i}" aria-label="Testimonio ${i + 1}"></button>
            `).join('')}
          </div>
        `;
      }
      // MODO DESKTOP/TABLET: grid estático de 4 cards (2x2 en tablet, 4x1 en desktop)
      else {
        const cardClass = window.innerWidth >= 1024
          ? 'w-full'  // desktop: 4 columnas (grid lo divide)
          : 'w-full'; // tablet: 2 columnas (grid lo divide)
        testimoniosContainer.innerHTML = `
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            ${TESTIMONIOS.map(t => `
              <div class="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col">
                <div class="flex text-yellow-400 mb-3 text-lg">${'★'.repeat(t.estrellas)}</div>
                <p class="text-gray-700 italic mb-5 leading-relaxed text-sm flex-grow">"${t.comentario}"</p>
                <div class="flex items-center gap-3">
                  <img src="${t.avatar}" alt="${t.nombre}" class="w-12 h-12 rounded-full object-cover"
                       onerror="this.onerror=null;this.src='${t.fallback}';">
                  <div>
                    <h4 class="font-bold text-gray-900 text-sm">${t.nombre}</h4>
                    <p class="text-xs text-gray-500">${t.cargo}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      // Vincular dots solo en móvil
      testimoniosContainer.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          currentSlide = parseInt(e.target.dataset.index);
          renderTestimonios();
        });
      });
    };

    renderTestimonios();

    // Re-render en resize si cambia entre móvil/desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = isMobile;
        const nowMobile = window.innerWidth < 768;
        if (wasMobile !== nowMobile) {
          currentSlide = 0;
          renderTestimonios();
        }
      }, 150);
    });

    // Autoplay SOLO en móvil
    setInterval(() => {
      if (window.innerWidth < 768) {
        currentSlide = (currentSlide + 1) % TESTIMONIOS.length;
        renderTestimonios();
      }
    }, 5000);
  }

  // ---------- 7) EQUIPO ----------
  const equipoContainer = document.querySelector('#equipo-container');
  if (equipoContainer && typeof EQUIPO !== 'undefined') {
    equipoContainer.innerHTML = EQUIPO.map((m, i) => `
      <div class="reveal reveal-delay-${(i % 4) + 1} bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div class="overflow-hidden h-72">
          <img src="${m.imagen}" alt="${m.nombre}" class="w-full h-full object-cover" loading="lazy"
               onerror="this.onerror=null;this.src='${m.fallback}';">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900">${m.nombre}</h3>
          <p class="text-coffee font-medium text-sm mb-3">${m.rol}</p>
          <p class="text-gray-600 text-sm">${m.descripcion || m.descripción}</p>
        </div>
      </div>
    `).join('');
    observeReveal(equipoContainer);
  }

  // ---------- 8) HITOS / TIMELINE ----------
  const hitosContainer = document.querySelector('#hitos-container');
  if (hitosContainer && typeof HITOS !== 'undefined') {
    hitosContainer.innerHTML = HITOS.map((h, i) => `
      <div class="timeline-item reveal reveal-delay-${(i % 4) + 1}">
        <span class="text-coffee font-bold text-2xl">${h.año}</span>
        <h4 class="text-xl font-bold mt-1 mb-2">${h.titulo}</h4>
        <p class="text-gray-600">${h.descripcion}</p>
      </div>
    `).join('');
    observeReveal(hitosContainer);
  }

  // ---------- 9) ESTADÍSTICAS ----------
  const statsContainer = document.querySelector('#stats-container');
  if (statsContainer && typeof ESTADISTICAS !== 'undefined') {
    statsContainer.innerHTML = ESTADISTICAS.map((s, i) => `
      <div class="text-center reveal reveal-delay-${(i % 4) + 1}">
        <div class="text-5xl md:text-6xl font-bold text-coffee mb-2" style="font-family: 'Playfair Display', serif;">${s.numero}</div>
        <div class="text-gray-600 uppercase tracking-wider text-sm">${s.texto}</div>
      </div>
    `).join('');
    observeReveal(statsContainer);
  }

  // ---------- 10) SERVICIOS ----------
  const serviciosContainer = document.querySelector('#servicios-container');
  if (serviciosContainer && typeof SERVICIOS !== 'undefined') {
    const iconos = {
      calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
      graduation: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
      users: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      package: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
      truck: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
      star: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
    };

    serviciosContainer.innerHTML = SERVICIOS.map((s, i) => `
      <div class="service-card reveal reveal-delay-${(i % 4) + 1} bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
        <div class="service-icon">${iconos[s.icono] || iconos.star}</div>
        <h3 class="text-2xl font-bold mb-3">${s.titulo}</h3>
        <p class="text-gray-600 leading-relaxed mb-3">${s.descripcion}</p>
        ${s.destacado ? '<span class="inline-block text-xs font-bold uppercase tracking-wider text-coffee bg-cream px-3 py-1 rounded-full">Destacado</span>' : ''}
      </div>
    `).join('');
    observeReveal(serviciosContainer);
  }

  // ---------- 11) GALERÍA ----------
  const galeriaContainer = document.querySelector('#galeria-container');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (galeriaContainer && typeof GALERIA !== 'undefined') {
    const renderGaleria = (categoria = 'todos') => {
      const items = categoria === 'todos' ? GALERIA : GALERIA.filter(g => g.categoria === categoria);
      galeriaContainer.innerHTML = items.map((g, i) => `
        <div class="gallery-item reveal reveal-delay-${(i % 4) + 1}" data-imagen="${g.url}" data-titulo="${g.titulo}" data-fallback="${g.fallback}">
          <img src="${g.url}" alt="${g.titulo}" loading="lazy"
               onerror="this.onerror=null;this.src='${g.fallback}';this.parentElement.dataset.imagen=this.src;">
          <div class="gallery-overlay">
            <div>
              <p class="font-bold">${g.titulo}</p>
              <p class="text-sm opacity-80 capitalize">${g.categoria}</p>
            </div>
          </div>
        </div>
      `).join('');

      observeReveal(galeriaContainer);
      bindLightbox();
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderGaleria(e.currentTarget.dataset.filter);
      });
    });

    renderGaleria();
  }

  // ---------- 12) LIGHTBOX ----------
  const lightbox = document.querySelector('#lightbox');
  const lightboxImg = document.querySelector('#lightbox-img');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  const bindLightbox = () => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.dataset.imagen;
        const titulo = item.dataset.titulo;
        if (lightbox && lightboxImg) {
          lightboxImg.src = img;
          if (lightboxCaption) lightboxCaption.textContent = titulo;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  };

  lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ---------- 13) MENÚ / PRECIOS con TABS ----------
  const tabsContainer = document.querySelector('#tabs-precios');
  const tabsContent = document.querySelector('#tabs-content');

  if (tabsContainer && tabsContent && typeof PRODUCTOS !== 'undefined') {
    const categorias = [
      { id: 'cafe', nombre: 'Café' },
      { id: 'desayunos', nombre: 'Desayunos' },
      { id: 'almuerzos', nombre: 'Almuerzos' },
      { id: 'postres', nombre: 'Postres' },
      { id: 'frias', nombre: 'Bebidas Frías' }
    ];

    tabsContainer.innerHTML = categorias.map((cat, i) => `
      <button class="tab-btn ${i === 0 ? 'active' : ''}" data-cat="${cat.id}">${cat.nombre}</button>
    `).join('');

    const renderProductos = (categoria) => {
      const items = PRODUCTOS.filter(p => p.categoria === categoria);
      return `
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items.map((p, i) => `
            <div class="product-card reveal reveal-delay-${(i % 4) + 1} bg-white rounded-2xl overflow-hidden shadow-md">
              <div class="overflow-hidden h-56">
                <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover" loading="lazy"
                     onerror="this.onerror=null;this.src='${p.fallback}';">
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-2 gap-3">
                  <h3 class="text-xl font-bold text-gray-900">${p.nombre}</h3>
                  <span class="text-coffee font-bold text-lg whitespace-nowrap">$${p.precio.toFixed(2)}</span>
                </div>
                <p class="text-gray-600 text-sm">${p.descripcion}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    };

    tabsContent.innerHTML = categorias.map((cat, i) => `
      <div class="tab-content ${i === 0 ? 'active' : ''}" data-content="${cat.id}">
        ${renderProductos(cat.id)}
      </div>
    `).join('');

    // Observar todos los reveals del contenido
    observeReveal(tabsContent);

    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.cat;
        tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabsContent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const target = tabsContent.querySelector(`[data-content="${cat}"]`);
        target?.classList.add('active');
        // Re-observar nuevos elementos visibles
        if (target) observeReveal(target);
      });
    });
  }

  // ---------- 14) FORMULARIO DE CONTACTO ----------
  const form = document.querySelector('#contact-form');
  const showToast = (mensaje) => {
    const toast = document.querySelector('#toast');
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = mensaje;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Limpiar errores previos
      form.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
      form.querySelectorAll('[data-error]').forEach(span => span.textContent = '');

      // Validar nombre
      const nombre = form.querySelector('#nombre');
      if (!nombre.value.trim() || nombre.value.trim().length < 3) {
        nombre.classList.add('error');
        const errSpan = form.querySelector('[data-error="nombre"]');
        if (errSpan) errSpan.textContent = 'Por favor, ingresa tu nombre completo';
        valid = false;
      }

      // Validar email
      const email = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        const errSpan = form.querySelector('[data-error="email"]');
        if (errSpan) errSpan.textContent = 'Por favor, ingresa un email válido';
        valid = false;
      }

      // Validar mensaje
      const mensaje = form.querySelector('#mensaje');
      if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        mensaje.classList.add('error');
        const errSpan = form.querySelector('[data-error="mensaje"]');
        if (errSpan) errSpan.textContent = 'El mensaje debe tener al menos 10 caracteres';
        valid = false;
      }

      if (valid) {
        showToast('¡Mensaje enviado correctamente! Te responderemos pronto.');
        form.reset();
      }
    });
  }

  // ---------- 15) Año dinámico en footer ----------
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
