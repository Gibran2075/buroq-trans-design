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

  /* ------------------------------------------------------------- navigation */
  const navList = $('#navList');
  const mainNav = $('#mainNav');
  const navToggle = $('#navToggle');

  if (navList) {
    navList.innerHTML = (typeof NAV_LINKS !== 'undefined' ? NAV_LINKS : [])
      .map((item) => '<li><a href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>')
      .join('');
  }

  const closeNav = () => {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Buka menu navigasi');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  };

  const navBackdrop = $('#navBackdrop');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = !mainNav.classList.contains('is-open');
      mainNav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      if (navBackdrop) navBackdrop.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
    });
    if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
  }

  /* ------------------------------------------------------- header + spy */
  const siteHeader = $('#siteHeader');
  const onScroll = () => {
    if (siteHeader) siteHeader.classList.toggle('is-stuck', window.scrollY > 90);

    const probe = window.scrollY + (siteHeader ? siteHeader.offsetHeight : 80) + 30;
    let current = null;
    $$('main section[id], footer[id]').forEach((sec) => {
      if (sec.offsetTop <= probe) current = sec.id;
    });
    $$('#navList a').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
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
        closeNav();
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
    if (e.key === 'Escape') closeModal();
  });

  /* ============================ HERO SLIDER ============================== */
  const heroEyebrow = $('#heroEyebrow');
  const heroTitle = $('#heroTitle');
  const heroText = $('#heroText');
  const heroCars = $('#heroCars');
  const heroPrev = $('#heroPrev');
  const heroNext = $('#heroNext');

  let heroIndex = 0;

  const formatTitle = (str) =>
    esc(str).replace(/\{gold:([^}]+)\}/g, '<em class="gold">$1</em>');

  const renderHero = () => {
    const slides = typeof HERO_SLIDES !== 'undefined' ? HERO_SLIDES : [];
    const slide = slides[heroIndex];
    if (!slide) return;

    if (heroEyebrow) heroEyebrow.textContent = slide.eyebrow;
    if (heroTitle) heroTitle.innerHTML = formatTitle(slide.title);
    if (heroText) heroText.textContent = slide.text;

    if (heroCars) {
      heroCars.innerHTML = (slide.cars || [])
        .map((car) =>
          '<img class="' + esc(car.cls) + '" data-asset="vehicles.' + esc(car.asset) + '" ' +
          'src="' + esc(asset('vehicles.' + car.asset)) + '" alt="' + esc(car.alt) + '" loading="lazy">'
        )
        .join('');
    }
  };

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      const slides = HERO_SLIDES || [];
      heroIndex = (heroIndex - 1 + slides.length) % slides.length;
      renderHero();
    });
  }
  if (heroNext) {
    heroNext.addEventListener('click', () => {
      const slides = HERO_SLIDES || [];
      heroIndex = (heroIndex + 1) % slides.length;
      renderHero();
    });
  }

  /* hero badges — factual service attributes shown once, above the hero cars */
  const renderBadges = () => {
    const badges = typeof HERO_BADGES !== 'undefined' ? HERO_BADGES : [];
    const hero = $('#heroBadges');
    if (!hero) return;
    hero.innerHTML = badges
      .map((b) =>
        '<li class="hb-item">' +
        '<span class="hb-ico">' + icon(b.icon) + '</span>' +
        '<span class="hb-label">' + b.label + '</span>' +
        '</li>'
      )
      .join('');
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
      .map((s) =>
        '<article class="svc-card">' +
        '<div class="svc-media">' + icon(s.icon) + '</div>' +
        '<div class="svc-body">' +
        '<h3 class="svc-title">' + esc(s.name) + '</h3>' +
        '<p class="svc-desc">' + esc(s.desc) + '</p>' +
        '<p class="svc-use">' + esc(s.use) + '</p>' +
        '<button type="button" class="btn btn-red" data-open-booking data-service="' + esc(s.name) + '">' +
        'Tanya Layanan</button>' +
        '</div>' +
        '</article>'
      )
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

  /* ============================ USE CASES =============================== */
  const renderUseCases = () => {
    const el = $('#useCaseGrid');
    if (!el) return;
    el.innerHTML = (typeof USE_CASES !== 'undefined' ? USE_CASES : [])
      .map((u) =>
        '<article class="uc-card">' +
        '<div class="uc-media">' +
        '<img data-asset="vehicles.' + esc(u.vehicle) + '" src="' + esc(asset('vehicles.' + u.vehicle)) +
        '" alt="' + esc(u.alt) + '" loading="lazy">' +
        '</div>' +
        '<div class="uc-body">' +
        '<p class="uc-cat">' + esc(u.category) + '</p>' +
        '<h3 class="uc-title">' + esc(u.title) + '</h3>' +
        '<p class="uc-text">' + esc(u.text) + '</p>' +
        '<button type="button" class="btn btn-red" data-open-booking data-service="' + esc(u.service) + '">' +
        esc(u.cta) + '</button>' +
        '</div>' +
        '</article>'
      )
      .join('');
  };

  /* ============================== NEEDS ================================= */
  const renderNeeds = () => {
    const el = $('#needGrid');
    if (!el) return;
    el.innerHTML = (typeof NEED_BLOCKS !== 'undefined' ? NEED_BLOCKS : [])
      .map((n) =>
        '<article class="need-card">' +
        '<span class="need-ico">' + icon(n.icon) + '</span>' +
        '<h3 class="need-title">' + esc(n.title) + '</h3>' +
        '<p class="need-text">' + esc(n.text) + '</p>' +
        '</article>'
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

  /* ========================= INFORMATIONAL CARDS ========================= */
  const renderInfo = () => {
    const el = $('#infoGrid');
    if (!el) return;
    el.innerHTML = (typeof INFO_CARDS !== 'undefined' ? INFO_CARDS : [])
      .map((c) =>
        '<article class="ic-card">' +
        '<div class="ic-media">' +
        '<img data-asset="photos.' + esc(c.image) + '" src="' + esc(asset('photos.' + c.image)) +
        '" alt="' + esc(c.alt) + '" loading="lazy">' +
        '<span class="ic-tag">' + esc(c.category) + '</span>' +
        '</div>' +
        '<div class="ic-body">' +
        '<h3 class="ic-title">' + esc(c.title) + '</h3>' +
        '<p class="ic-excerpt">' + esc(c.excerpt) + '</p>' +
        '<button type="button" class="ic-more" data-info="' + esc(c.id) + '">' +
        'Baca Selengkapnya' + icon('i-arrow-ur') +
        '</button>' +
        '</div>' +
        '</article>'
      )
      .join('');
  };

  const infoModal = $('#infoModal');
  const infoKicker = $('#infoKicker');
  const infoTitle = $('#infoTitle');
  const infoImg = $('#infoImg');
  const infoBody = $('#infoBody');

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-info]');
    if (!trigger) return;
    const card = (INFO_CARDS || []).find((c) => c.id === trigger.dataset.info);
    if (!card) return;

    if (infoKicker) infoKicker.textContent = card.category;
    if (infoTitle) infoTitle.textContent = card.title;
    if (infoBody) {
      infoBody.innerHTML = String(card.body || '')
        .split(/\n\s*\n/)
        .map((p) => '<p>' + esc(p.trim()) + '</p>')
        .join('');
    }
    if (infoImg) {
      infoImg.src = asset('photos.' + card.image);
      infoImg.alt = card.alt;
      infoImg.hidden = false;
    }
    openModal(infoModal, trigger);
  });

  /* =============================== FOOTER =============================== */
  const renderFooter = () => {
    const menu = $('#footerMenu');
    if (menu) {
      menu.innerHTML = (typeof NAV_LINKS !== 'undefined' ? NAV_LINKS : [])
        .map((i) => '<li><a href="' + esc(i.href) + '">' + esc(i.label) + '</a></li>')
        .join('');
    }

    const services = $('#footerServices');
    if (services) {
      services.innerHTML = (typeof FOOTER_SERVICES !== 'undefined' ? FOOTER_SERVICES : [])
        .map((name) => '<li><a href="#layanan">' + esc(name) + '</a></li>')
        .join('');
    }

    const social = $('#footerSocial');
    if (social) {
      social.innerHTML = (typeof SOCIAL_LINKS !== 'undefined' ? SOCIAL_LINKS : [])
        .map((s) => {
          const aria = s.label + ' ' + s.handle;
          return s.url
            ? '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(aria) + '">' +
              icon(s.icon) + '</a></li>'
            : '<li><span class="is-unlinked" role="img" aria-label="' + esc(aria) + '">' +
              icon(s.icon) + '</span></li>';
        })
        .join('');
      const note = $('#socialNote');
      if (note) {
        note.textContent = (typeof SOCIAL_LINKS !== 'undefined' ? SOCIAL_LINKS : [])
          .map((s) => s.label + ' ' + s.handle)
          .join('  ·  ');
      }
    }

    const contact = $('#footerContact');
    if (contact) {
      const genericMsg = 'Halo BUROQ TRANS, saya ingin bertanya mengenai layanan transportasi yang tersedia.';
      const rows = (typeof CONTACTS !== 'undefined' ? CONTACTS : [])
        .map((c) =>
          '<li>' + icon('i-phone') +
          '<a href="' + esc(waLink(c.wa, genericMsg)) + '" target="_blank" rel="noopener">' +
          esc(c.label) + '</a></li>'
        );
      rows.push('<li>' + icon('i-mail') + '<a href="mailto:' + esc(CONFIG.email) + '">' + esc(CONFIG.email) + '</a></li>');
      rows.push('<li>' + icon('i-clock') + '<span>' + esc(CONFIG.hours) + '</span></li>');
      if (CONFIG.mapsUrl) {
        rows.push('<li>' + icon('i-pin') + '<a href="' + esc(CONFIG.mapsUrl) +
          '" target="_blank" rel="noopener">' + esc(CONFIG.address) + '</a></li>');
      } else {
        rows.push('<li>' + icon('i-pin') + '<span>' + esc(CONFIG.address) + '</span></li>');
      }
      contact.innerHTML = rows.join('');
    }
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

  /* ================================ INIT =============================== */
  resolveAssets();
  bindData();
  renderBadges();
  renderHero();
  renderStats();
  renderServices();
  renderBenefits();
  renderCorpFeatures();
  renderUseCases();
  renderNeeds();
  renderSteps();
  renderInfo();
  renderFooter();
  onScroll();

  window.addEventListener('load', () => {
    resolveAssets();
    bindData();
    onScroll();
  });
})();
