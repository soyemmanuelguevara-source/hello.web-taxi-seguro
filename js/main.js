(() => {
  const body = document.body;
  const loader = document.getElementById("loader");
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mob-menu");
  const year = document.getElementById("year");
  const marquee = document.getElementById("marquee");
  const form = document.getElementById("wa-form");

  body.classList.add("loading");

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      loader?.classList.add("is-hidden");
      body.classList.remove("loading");
    }, 1350);
  });

  year.textContent = new Date().getFullYear();

  const marqueeItems = [
    "Seguridad primero",
    "Conductores profesionales",
    "Vehículos bien mantenidos",
    "Traslados confiables",
    "Comodidad en cada viaje",
    "Taxi Seguro"
  ];
  const marqueeText = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
    .map((item) => `<span>${item}</span>`)
    .join("");
  if (marquee) marquee.innerHTML = marqueeText;

  const setNav = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };
  setNav();
  window.addEventListener("scroll", setNav, { passive: true });

  hamburger?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const numbers = entry.target.querySelectorAll(".stat-num");
      numbers.forEach(animateCount);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.38 });

  const statsGrid = document.querySelector(".stats-grid");
  if (statsGrid) statObserver.observe(statsGrid);

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1300;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  const movingBgs = document.querySelectorAll(".hero-bg, .service-bg, .security-bg, .contact-bg");
  const parallax = () => {
    const scroll = window.scrollY;
    movingBgs.forEach((bg, index) => {
      const strength = index === 0 ? 0.06 : 0.035;
      bg.style.transform = `translate3d(0, ${scroll * strength}px, 0) scale(1.05)`;
    });
  };
  parallax();
  window.addEventListener("scroll", parallax, { passive: true });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("f-name").value.trim();
    const interest = document.getElementById("f-interest").value;
    const origin = document.getElementById("f-origin").value.trim();
    const destination = document.getElementById("f-destination").value.trim();
    const message = document.getElementById("f-msg").value.trim();

    if (!name || !message) {
      form.reportValidity();
      return;
    }

    const text = [
      "Hola, quiero solicitar un traslado con Taxi Seguro.",
      `Nombre: ${name}`,
      `Tipo de servicio: ${interest}`,
      origin ? `Origen: ${origin}` : "",
      destination ? `Destino: ${destination}` : "",
      `Detalles: ${message}`
    ].filter(Boolean).join("\n");

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  });

  initParticles();

  function initParticles() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.max(34, Math.floor(width / 24)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        r: Math.random() * 2.1 + .6,
        a: Math.random() * .5 + .18
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 0, ${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 118) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 118) * .12})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    });
  }
})();
