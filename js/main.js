/* =============================================================================
   BUROQ TRANS — interactions
   Depends on js/data.js (CONFIG, ASSETS and the content collections).
   ============================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const esc = (str) =>
    String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const icon = (name, cls) =>
    '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#' + name + '"></use></svg>';

  const asset = (path) => {
    const parts = String(path).split('.');
    let node = typeof ASSETS !== 'undefined' ? ASSETS : null;
    for (const p of parts) { node = node ? node[p] : undefined; }
    return typeof node === 'string' ? node : path;
  };

  /* rewrite every data-asset image from the ASSETS manifest so images can be
     swapped in one place without touching the HTML markup */
  const resolveAssets = () => {
    $$('[data-asset]').forEach((img) => { img.src = asset(img.dataset.asset); });
  };

  /* every CONFIG key can be bound straight into the markup */
  const bindData = () => {
    $$('[data-bind]').forEach((el) => {
      const key = el.dataset.bind;
      if (typeof CONFIG !== 'undefined' && CONFIG[key] != null) el.textContent = CONFIG[key];
    });
  };

  /* ---------------------------------------------------------------- toast */
  const toastEl = $('#toast');
  let toastTimer;

  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 4200);
  };

  /* ------------------------------------------------------------ whatsapp */
  const waLink = (number, text) =>
    number ? 'https://wa.me/' + number + '?text=' + encodeURIComponent(text) : '';

  /* every element carrying data-wa-message gets its href built from the one
     CONFIG.whatsapp number, so the contact number lives in a single place */
  const applyWaLinks = () => {
    $$('[data-wa-message]').forEach((el) => {
      const href = waLink(CONFIG.whatsapp, el.dataset.waMessage || '');
      if (href) {
        el.setAttribute('href', href);
      } else {
        /* no verified number: fall back to the inquiry form instead of a dead link */
        el.removeAttribute('href');
        el.setAttribute('data-open-booking', '');
      }
    });
  };

  /* ------------------------------------------------------- scroll spy */
  /* The header, its drawer and the footer are rendered by js/site-shell.js.
     Here we only highlight the in-page anchors of the homepage while scrolling. */
  const siteHeader = $('#siteHeader');
  const onScroll = () => {
    const probe = window.scrollY + (siteHeader ? siteHeader.offsetHeight : 80) + 30;
    let current = null;
    $$('main section[id], footer[id]').forEach((sec) => {
      if (sec.offsetTop <= probe) current = sec.id;
    });
    $$('#navList a').forEach((a) => {
      const target = a.getAttribute('href') || '';
      /* cross-page links keep the active state assigned by the shell */
      if (target.charAt(0) === '#') {
        a.classList.toggle('is-active', target === '#' + current);
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* smooth in-page anchors + explicit scroll-to triggers */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const target = $(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }
      return;
    }
    const trigger = e.target.closest('[data-scroll-to]');
    if (trigger) {
      const target = $(trigger.dataset.scrollTo);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }
    }
  });

  /* ------------------------------------------------------------ modals */
  let activeModal = null;
  let lastTrigger = null;

  const openModal = (modal, trigger) => {
    if (!modal) return;
    if (activeModal && activeModal !== modal) activeModal.hidden = true;
    modal.hidden = false;
    document.body.classList.add('is-locked');
    activeModal = modal;
    lastTrigger = trigger || null;
    const focusable = modal.querySelector('input, select, textarea, button');
    if (focusable) setTimeout(() => focusable.focus(), 40);
  };

  const closeModal = () => {
    if (!activeModal) return;
    activeModal.hidden = true;
    activeModal = null;
    document.body.classList.remove('is-locked');
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    lastTrigger = null;
  };

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-booking], [data-book-service]');
    if (opener) {
      e.preventDefault();
      preselectService(opener.dataset.service || '');
      openModal($('#bookingModal'), opener);
      return;
    }
    if (e.target.closest('[data-close-modal]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeModal();
  });

  /* ================================ HERO ================================ */
  const heroEyebrow = $('#heroEyebrow');
  const heroTitle = $('#heroTitle');
  const heroText = $('#heroText');
  const heroCars = $('#heroCars');

  const formatTitle = (str) =>
    esc(str).replace(/\{gold:([^}]+)\}/g, '<em class="gold">$1</em>');

  /* one static headline block + one dominant vehicle (no slider) */
  const renderHero = () => {
    const hero = typeof HERO !== 'undefined' ? HERO : null;
    if (!hero || !heroCars) return;

    if (heroEyebrow) heroEyebrow.textContent = hero.eyebrow || '';
    if (heroTitle) heroTitle.innerHTML = formatTitle(hero.title || '');
    if (heroText) heroText.textContent = hero.text || '';

    const v = hero.vehicle || {};
    if (!v.asset) return;
    heroCars.innerHTML =
      '<img class="hc-main" data-asset="vehicles.' + esc(v.asset) + '" ' +
      'src="' + esc(asset('vehicles.' + v.asset)) + '" alt="' + esc(v.alt || '') + '" ' +
      'fetchpriority="high" decoding="async">';
  };

  /* ============================== STATS ================================= */
  const renderStats = () => {
    const el = $('#statsList');
    if (!el) return;
    el.innerHTML = (typeof STATS !== 'undefined' ? STATS : [])
      .map((s) =>
        '<li class="stat">' +
        '<span class="stat-ico">' + icon(s.icon) + '</span>' +
        '<span class="stat-body">' +
        '<strong class="stat-value">' + esc(s.value) + '</strong>' +
        '<span class="stat-label">' + esc(s.label) + '</span>' +
        '</span>' +
        '</li>'
      )
      .join('');
  };

  /* ============================ SERVICES ================================ */
  const renderServices = () => {
    const el = $('#serviceGrid');
    if (!el) return;
    el.innerHTML = (typeof SERVICES !== 'undefined' ? SERVICES : [])
      .map((s) => {
        /* a real photo is rendered only once SERVICES[].photo is filled in; the
           placeholder keeps the exact 16:9 box the photo will occupy */
        const photo = s.photo ? asset(s.photo) : '';
        /* vehicle photos ship with their own light backdrop — mix-blend-multiply
           lets it disappear into the white card, and brightness lifts the few
           files whose "white" is actually ~rgb(247) up to pure white */
        const media = photo
          ? '<img class="relative z-10 h-full w-full object-contain brightness-[1.05] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]" src="' + esc(photo) + '" alt="' + esc('Layanan ' + s.name) + '" loading="lazy">'
          : '<span class="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 text-slate-400">' + icon('i-image') +
            '<span class="font-display text-[10px] font-semibold uppercase tracking-[0.13em]" aria-hidden="true">Foto layanan</span></span>';

        return '<article class="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/50 hover:shadow-xl focus-within:border-yellow-500/50">' +
          '<div class="px-3 pt-3 sm:px-4 sm:pt-4">' +
          '<div class="relative aspect-[16/9] overflow-hidden rounded-xl bg-white p-2 sm:p-3' + (photo ? '' : ' border border-dashed border-slate-300') + '"' +
          (photo ? '' : ' role="img" aria-label="' + esc('Foto layanan ' + s.name + ' belum tersedia') + '"') + '>' +
          media +
          '</div>' +
          '</div>' +
          '<div class="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">' +
          '<h3 class="flex items-center gap-2.5 font-display text-[15px] font-bold leading-snug text-navy">' +
          '<span class="grid h-8 w-8 flex-none place-items-center rounded-lg bg-navy text-gold-light ring-1 ring-yellow-500/30" aria-hidden="true">' + icon(s.icon) + '</span>' +
          esc(s.name) +
          '</h3>' +
          '<span class="mt-3 block h-[2px] w-9 rounded-full bg-yellow-500" aria-hidden="true"></span>' +
          '<p class="mt-3 mb-4 text-[13px] leading-relaxed text-muted">' + esc(s.desc) + '</p>' +
          '<button type="button" class="mt-auto inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-display text-[12.5px] font-semibold text-navy transition-all duration-300 hover:border-yellow-500/40 hover:bg-white hover:text-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus-visible:ring-offset-2" data-open-booking data-service="' + esc(s.name) + '">' +
          'Tanya layanan' + icon('i-arrow-right') +
          '</button>' +
          '</div>' +
          '</article>';
      })
      .join('');
  };

  /* ============================= BENEFITS =============================== */
  const renderBenefits = () => {
    const el = $('#benefitGrid');
    if (!el) return;
    el.innerHTML = (typeof BENEFITS !== 'undefined' ? BENEFITS : [])
      .map((b) =>
        '<article class="b-card">' +
        '<span class="b-ico">' + icon(b.icon) + '</span>' +
        '<h3 class="b-title">' + esc(b.title) + '</h3>' +
        '<p class="b-text">' + esc(b.text) + '</p>' +
        '</article>'
      )
      .join('');
  };

  /* ======================= CORPORATE FEATURE LIST ======================== */
  const renderCorpFeatures = () => {
    const el = $('#corpFeatures');
    if (!el) return;
    el.innerHTML = (typeof CORP_FEATURES !== 'undefined' ? CORP_FEATURES : [])
      .map((f) =>
        '<li>' +
        '<span class="f-ico">' + icon(f.icon) + '</span>' +
        '<span>' +
        '<span class="f-title">' + esc(f.title) + '</span>' +
        '<span class="f-text">' + esc(f.text) + '</span>' +
        '</span>' +
        '</li>'
      )
      .join('');
  };

  /* =============================== STEPS ================================ */
  const renderSteps = () => {
    const el = $('#stepsCards');
    if (!el) return;
    el.innerHTML = (typeof START_STEPS !== 'undefined' ? START_STEPS : [])
      .map((s) =>
        '<article class="s-card">' +
        '<span class="s-no">' + esc(s.no) + '</span>' +
        '<h3 class="s-title">' + esc(s.title) + '</h3>' +
        '<p class="s-text">' + esc(s.text) + '</p>' +
        '</article>'
      )
      .join('');
  };

  /* ============================ BOOKING FORM ============================ */
  const bookingModal = $('#bookingModal');
  const bookingForm = $('#bookingForm');
  const bookingNotice = $('#bookingNotice');
  const formAlert = $('#formAlert');
  const formSuccess = $('#formSuccess');
  const formSuccessText = $('#formSuccessText');
  const copyInquiry = $('#copyInquiry');
  const serviceSelect = $('#bkService');

  if (bookingNotice) bookingNotice.textContent = CONFIG.bookingNotice || '';

  if (serviceSelect) {
    const opts = (typeof SERVICES !== 'undefined' ? SERVICES : []).map((s) => s.name);
    opts.push('Kebutuhan lainnya');
    serviceSelect.innerHTML =
      '<option value="">Pilih layanan</option>' +
      opts.map((o) => '<option value="' + esc(o) + '">' + esc(o) + '</option>').join('');
  }

  function preselectService(name) {
    if (!serviceSelect || !name) return;
    const match = Array.from(serviceSelect.options).find((o) => o.value === name);
    if (match) serviceSelect.value = name;
  }

  const showError = (id, msg) => {
    const input = $('#' + id);
    const box = $('[data-error-for="' + id + '"]');
    if (input) input.classList.toggle('is-invalid', Boolean(msg));
    if (box) box.textContent = msg || '';
  };

  const clearErrors = () => {
    ['bkName', 'bkPhone', 'bkService', 'bkMsg'].forEach((id) => showError(id, ''));
    if (formAlert) { formAlert.hidden = true; formAlert.textContent = ''; }
    if (formSuccess) formSuccess.hidden = true;
  };

  const buildMessage = (data) =>
    'Halo ' + (CONFIG.businessName || '') + ', saya ingin bertanya mengenai layanan ' + data.service + '.' +
    '\n\n' +
    'Nama: ' + data.name + '\n' +
    'No. WhatsApp: ' + data.phone + '\n' +
    'Jenis layanan: ' + data.service + '\n' +
    'Rincian kebutuhan: ' + data.message + '\n\n' +
    'Mohon informasi mengenai rute, jadwal, kendaraan, dan penawarannya. Terima kasih.';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const data = {
        name: ($('#bkName').value || '').trim(),
        phone: ($('#bkPhone').value || '').trim(),
        service: serviceSelect ? serviceSelect.value : '',
        message: ($('#bkMsg').value || '').trim()
      };

      const errors = [];
      if (data.name.length < 2) errors.push(['bkName', 'Mohon isi nama Anda.']);
      if (!/^0\d{8,13}$/.test(data.phone.replace(/[\s-]/g, ''))) {
        errors.push(['bkPhone', 'Masukkan nomor WhatsApp aktif, diawali angka 0.']);
      }
      if (!data.service) errors.push(['bkService', 'Pilih salah satu jenis layanan.']);
      if (data.message.length < 10) {
        errors.push(['bkMsg', 'Ceritakan sedikit rincian kebutuhan Anda (min. 10 karakter).']);
      }

      if (errors.length) {
        errors.forEach((pair) => showError(pair[0], pair[1]));
        if (formAlert) {
          formAlert.textContent = 'Mohon lengkapi data yang ditandai sebelum mengirim inquiry.';
          formAlert.hidden = false;
        }
        const first = $('#' + errors[0][0]);
        if (first) first.focus();
        return;
      }

      const text = buildMessage(data);

      if (!CONFIG.whatsapp) {
        copyText(text);
        if (formSuccessText) {
          formSuccessText.textContent =
            'Nomor WhatsApp utama belum dikonfigurasi, sehingga pesan telah disalin ke clipboard Anda. ' +
            'Silakan kirimkan secara manual ke nomor BUROQ TRANS. Layanan belum dianggap terkonfirmasi.';
        }
        if (formSuccess) formSuccess.hidden = false;
        return;
      }

      window.open(waLink(CONFIG.whatsapp, text), '_blank', 'noopener');
      if (formSuccessText) {
        formSuccessText.textContent =
          'WhatsApp telah dibuka di tab baru dengan pesan inquiry Anda. Tekan kirim di sana untuk ' +
          'menyampaikannya kepada kami. Layanan belum dianggap terkonfirmasi sebelum rinciannya ' +
          'disepakati bersama.';
      }
      if (formSuccess) formSuccess.hidden = false;
    });
  }

  /* copy the same message without submitting */
  if (copyInquiry) {
    copyInquiry.addEventListener('click', () => {
      const data = {
        name: ($('#bkName').value || '').trim() || '(nama)',
        phone: ($('#bkPhone').value || '').trim() || '(no. WhatsApp)',
        service: serviceSelect && serviceSelect.value ? serviceSelect.value : '(jenis layanan)',
        message: ($('#bkMsg').value || '').trim() || '(rincian kebutuhan)'
      };
      copyText(buildMessage(data));
    });
  }

  function copyText(text) {
    const done = () => toast('Pesan inquiry sudah disalin ke clipboard Anda.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallbackCopy.bind(null, text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); }
    catch (err) { toast('Gagal menyalin otomatis. Silakan salin pesan secara manual.'); }
    document.body.removeChild(ta);
  }

  /* =========================== WHATSAPP FAB ============================= */
  const waFab = $('#waFab');
  if (waFab) {
    waFab.addEventListener('click', () => {
      if (!CONFIG.whatsapp) {
        preselectService('');
        openModal(bookingModal, waFab);
        toast('Nomor WhatsApp utama belum dikonfigurasi. Silakan isi formulir inquiry terlebih dahulu.');
        return;
      }
      const msg = 'Halo ' + (CONFIG.businessName || '') +
        ', saya ingin bertanya mengenai layanan transportasi yang tersedia.';
      window.open(waLink(CONFIG.whatsapp, msg), '_blank', 'noopener');
    });
  }

  /* keep the floating button away from the hero: it stays hidden while the
     hero (contact strip + primary CTA) is on screen and appears afterwards */
  const heroSection = $('#home');
  if (waFab && heroSection && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      waFab.classList.toggle('is-suppressed', entries[0].isIntersecting);
    }, { threshold: 0.12 }).observe(heroSection);
  }

  /* on widths where the button would sit on top of the service card column it
     steps aside for as long as that section is on screen (see body.in-services) */
  const catalogSection = $('#layanan');
  if (catalogSection && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      document.body.classList.toggle('in-services', entries[0].isIntersecting);
    }, { threshold: 0 }).observe(catalogSection);
  }

  /* ================================ INIT =============================== */
  resolveAssets();
  bindData();
  applyWaLinks();
  renderHero();
  renderStats();
  renderServices();
  renderBenefits();
  renderCorpFeatures();
  renderSteps();
  onScroll();

  window.addEventListener('load', () => {
    resolveAssets();
    bindData();
    onScroll();
  });
})();
