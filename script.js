/* ==========================================================
   KOWSHIN V — VLSI PORTFOLIO  |  script.js
   ========================================================== */

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- LOADER ---------- */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) setTimeout(() => loader.classList.add('hide'), 1600);
    });

    /* ---------- MOBILE MENU ---------- */
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    function setMenu(open) {
        if (!menuBtn || !navMenu) return;
        navMenu.classList.toggle('mobile-open', open);
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('ri-close-line', open);
            icon.classList.toggle('ri-menu-4-line', !open);
        }
    }
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => setMenu(!navMenu.classList.contains('mobile-open')));
        navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    }

    /* ---------- ACTIVE NAV LINK + SCROLL-TO-TOP ---------- */
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('main section[id]');
    const scrollBtn = document.getElementById('scrollTop');

    function onScroll() {
        const y = window.scrollY;
        let current = '';
        sections.forEach(s => { if (y >= s.offsetTop - 140) current = s.id; });

        // sub-sections share a nav item
        const map = { 'vlsi-projects': 'projects', 'embedded-projects': 'projects', achievements: 'certificates', content: 'contact' };
        current = map[current] || current;

        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
        if (scrollBtn) scrollBtn.classList.toggle('show', y > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- SCROLL REVEAL ---------- */
    const revealTargets = document.querySelectorAll(
        '.section-header, .about-card, .info-card, .stat-card, .skill-category, .timeline-item, ' +
        '.featured-container, .asic-flow, .project-card, .achievement-card, .certificate-card, ' +
        '.certificate-category, .content-left, .content-card-link, .contact-left, .contact-right'
    );

    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(el => { el.classList.add('reveal'); io.observe(el); });
    }

    /* ---------- STAT COUNTERS ---------- */
    const counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window && !reduceMotion) {
        const co = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const end = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                const t0 = performance.now();
                (function tick(t) {
                    const p = Math.min((t - t0) / 1400, 1);
                    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                })(t0);
                co.unobserve(el);
            });
        }, { threshold: 0.6 });
        counters.forEach(c => co.observe(c));
    }

    /* ---------- HERO ROLE TYPEWRITER ---------- */
    const roleEl = document.getElementById('heroRole');
    if (roleEl && !reduceMotion) {
        const roles = (roleEl.dataset.roles || '').split('|').filter(Boolean);
        const textEl = roleEl.querySelector('.role-text');
        let r = 0, i = 0, deleting = false;

        (function type() {
            const word = roles[r];
            i += deleting ? -1 : 1;
            textEl.textContent = word.slice(0, i);

            let delay = deleting ? 35 : 75;
            if (!deleting && i === word.length) { deleting = true; delay = 1800; }
            else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
            setTimeout(type, delay);
        })();
    }

    /* ---------- CHIP SCANNER HUD ---------- */
    const scanLine = document.getElementById('scanLine');
    const scanPct = document.getElementById('scanPct');
    const scanBar = document.getElementById('scanBar');
    const scanStatus = document.getElementById('scanStatus');

    if (scanLine && scanPct && scanBar && scanStatus && !reduceMotion) {
        let lastPct = -1, lastY = 0;

        (function loop() {
            const h = scanLine.parentElement.clientHeight || 1;
            const y = scanLine.offsetTop;
            const pct = Math.max(0, Math.min(100, Math.round((y / h) * 100)));

            if (pct !== lastPct) {
                const down = y >= lastY;
                let msg;
                if (pct >= 99) msg = 'Die verified';
                else if (!down) msg = 'Resetting';
                else if (pct < 20) msg = 'Reading RTL';
                else if (pct < 45) msg = 'Checking timing';
                else if (pct < 70) msg = 'Verifying DRC / LVS';
                else msg = 'Extracting layout';

                scanPct.textContent = pct;
                scanBar.style.width = pct + '%';
                scanStatus.textContent = msg;
                lastPct = pct;
            }
            lastY = y;
            requestAnimationFrame(loop);
        })();
    } else if (scanPct && scanStatus) {
        scanPct.textContent = '100';
        scanStatus.textContent = 'Die verified';
        if (scanBar) scanBar.style.width = '100%';
    }

    /* ---------- IMAGE POPUP (ASIC flow, certificates, results) ---------- */
    const modal = document.getElementById('flowModal');
    const modalImg = document.getElementById('flowModalImage');
    const modalClose = document.getElementById('flowModalClose');

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modalImg.src = '';
    }
    if (modal && modalImg) {
        document.querySelectorAll('[data-image]').forEach(el => {
            el.addEventListener('click', () => {
                modalImg.src = el.getAttribute('data-image');
                modal.classList.add('active');
            });
        });
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    /* ---------- CIRCUIT PARTICLE BACKGROUND ---------- */
    const holder = document.getElementById('particles');
    if (holder && !reduceMotion) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        holder.appendChild(canvas);

        let w, h, nodes = [], raf;
        const LINK = 150;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.min(70, Math.floor((w * h) / 22000));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                a.x += a.vx; a.y += a.vy;
                if (a.x < 0 || a.x > w) a.vx *= -1;
                if (a.y < 0 || a.y > h) a.vy *= -1;

                ctx.fillStyle = 'rgba(0,229,255,.55)';
                ctx.fillRect(a.x - 1.5, a.y - 1.5, 3, 3);

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < LINK) {
                        ctx.strokeStyle = 'rgba(0,229,255,' + (0.14 * (1 - d / LINK)) + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, a.y);      // right-angle "PCB trace" routing
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(raf); else draw();
        });
    }
})();
