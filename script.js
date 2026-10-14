(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const navlinks = document.getElementById('navlinks');
  if (hamburger && navlinks) {
    hamburger.addEventListener('click', () => {
      const open = navlinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navlinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Portfolio filters
  const filters = document.querySelectorAll('.filter');
  const works = document.querySelectorAll('.work');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const f = btn.dataset.filter;
      works.forEach(w => {
        const show = f === 'all' || w.dataset.cat === f;
        w.classList.toggle('hidden', !show);
      });
    });
  });

  // Case study links should not trigger lightbox
  document.querySelectorAll('.case-link').forEach(l => {
    l.addEventListener('click', (e) => e.stopPropagation());
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbimg = document.getElementById('lbimg');
    const lbcap = document.getElementById('lbcap');
    const lbsub = document.getElementById('lbsub');
    const lbclose = document.getElementById('lbclose');
    const openLb = (w) => {
      lbimg.src = w.dataset.full;
      lbimg.alt = w.querySelector('img').alt || '';
      lbcap.textContent = w.dataset.title || '';
      lbsub.textContent = w.dataset.sub || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbclose.focus();
    };
    const closeLb = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };
    works.forEach(w => {
      w.addEventListener('click', (e) => {
        if (e.target.closest('.case-link')) return;
        openLb(w);
      });
      w.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(w); }
      });
    });
    lbclose && lbclose.addEventListener('click', closeLb);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  // Reveal on scroll (respects reduced motion)
  if (!reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // Year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    function validate() {
      let ok = true;
      form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const msg = form.querySelector('#msg');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name.value.trim()) { name.closest('.field').classList.add('error'); ok = false; }
      if (!emailRe.test(email.value.trim())) { email.closest('.field').classList.add('error'); ok = false; }
      if (!msg.value.trim()) { msg.closest('.field').classList.add('error'); ok = false; }
      return ok;
    }
    form.addEventListener('submit', (e) => {
      if (!validate()) {
        e.preventDefault();
        if (status) { status.textContent = 'Please fix the highlighted fields.'; status.className = 'form-status err'; }
        return;
      }
      // Build a mailto fallback with subject/body to make submission real even if client doesn't handle form
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const type = form.querySelector('#projectType').value;
      const budget = form.querySelector('#budget').value;
      const message = form.querySelector('#msg').value.trim();
      const subject = encodeURIComponent(`Project inquiry — ${type || 'General'} — ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nMessage:\n${message}`);
      // Let native mailto submission proceed; also set href-based navigation as backup
      const mailto = `mailto:abidahmadullah@gmail.com?subject=${subject}&body=${body}`;
      const a = document.createElement('a');
      a.href = mailto;
      // Only use JS navigation if native form action didn't open a client
      setTimeout(() => {
        if (status) { status.textContent = 'Opening your email client to send the message…'; status.className = 'form-status ok'; }
      }, 50);
      // Prevent duplicate blank submit navigation issues by updating action
      form.action = mailto;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    });
  }

  // Back to top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    const toggle = () => {
      if (window.scrollY > 400) backTop.classList.add('show');
      else backTop.classList.remove('show');
    };
    window.addEventListener('scroll', toggle, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  // Ensure work cards are keyboard focusable
  works.forEach(w => { w.setAttribute('tabindex', '0'); w.setAttribute('role', 'button'); });
})();
