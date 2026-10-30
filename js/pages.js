/* =============================================================================
   BUROQ TRANS — multi-page renderers
   -----------------------------------------------------------------------------
   One renderer per page type, all driven by js/data.js:
     [data-page="layanan"]  → service directory grid
     [data-page="service"]  → service detail template (7 URLs, one template)
     [data-page="tentang"]  → services, contact, social and map blocks

   Load order: js/data.js → js/site-shell.js → js/main.js → js/pages.js
   ============================================================================= */
(function () {
  'use strict';

  const root = document.documentElement;
  const BASE = root.dataset.base || './';
  const PAGE = root.dataset.page || '';

  const url = (path) => BASE + path;

  const esc = (str) =>
    String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const icon = (name, cls) =>
    '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#' + name + '"></use></svg>';

  const waLink = (number, text) =>
    number ? 'https://wa.me/' + number + '?text=' + encodeURIComponent(text) : '';

  const consultMessage = (serviceName) =>
    'Halo ' + CONFIG.businessName + ', saya ingin konsultasi mengenai layanan ' + serviceName + '.';

  const serviceUrl = (service) => url('layanan/' + service.id + '/');
  const homeUrl = url('index.html');
  const servicesUrl = url('layanan/');

  /* ----------------------------------------------------------- shared pieces */
  const photoSlot = (service, variant) => {
    const photo = service.photo ? url(service.photo) : '';
    const label = 'Foto layanan ' + service.name;

    if (photo) {
      return '<img src="' + esc(photo) + '" alt="' + esc(label) + '" loading="lazy">';
    }
    return '<span class="svc-photo-empty">' + icon('i-image') +
      '<span class="svc-photo-label">' + esc(label) + '</span>' +
      '<span class="svc-photo-note">' + esc(variant === 'detail'
        ? 'Ruang foto 16:9 — dokumentasi layanan akan ditambahkan'
        : 'Foto belum tersedia') + '</span>' +
    '</span>';
  };

  const serviceCard = (service) =>
    '<a class="svc-card" href="' + esc(serviceUrl(service)) + '">' +
      '<div class="svc-photo' + (service.photo ? '' : ' is-empty') + '">' +
        photoSlot(service, 'card') +
      '</div>' +
      '<div class="svc-body">' +
        '<h3 class="svc-title">' +
          '<span class="svc-ico" aria-hidden="true">' + icon(service.icon) + '</span>' +
          esc(service.name) +
        '</h3>' +
        '<p class="svc-desc">' + esc(service.desc) + '</p>' +
        '<span class="svc-link">Lihat detail' + icon('i-arrow-right') + '</span>' +
      '</div>' +
    '</a>';

  const waButton = (label, message, extra) =>
    '<a class="btn btn-gold ' + (extra || '') + '" href="' + esc(waLink(CONFIG.whatsapp, message)) +
      '" target="_blank" rel="noopener">' + icon('i-whatsapp') + '<span>' + esc(label) + '</span></a>';

  /* -------------------------------------------------------- /layanan index */
  const renderServiceDirectory = () => {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    grid.innerHTML = (typeof SERVICES !== 'undefined' ? SERVICES : []).map(serviceCard).join('');
  };

  /* ------------------------------------------------- /layanan/[slug] page */
  const renderServicePage = (slug) => {
    const mount = document.getElementById('serviceMain');
    if (!mount) return;

    const list = typeof SERVICES !== 'undefined' ? SERVICES : [];
    const service = list.find((s) => s.id === slug);

    if (!service) {
      mount.innerHTML =
        '<section class="page-hero">' +
          '<div class="container-main">' +
            '<p class="eyebrow">LAYANAN BUROQ TRANS</p>' +
            '<h1 class="page-title">Layanan tidak ditemukan</h1>' +
            '<p class="page-lead">Halaman layanan yang Anda buka tidak tersedia. Silakan pilih layanan lain dari daftar kami.</p>' +
            '<div class="page-actions"><a class="btn btn-gold" href="' + esc(servicesUrl) + '">Lihat semua layanan</a></div>' +
          '</div>' +
        '</section>';
      return;
    }

    const message = consultMessage(service.name);
    const index = list.indexOf(service);
    const related = [1, 2, 3].map((n) => list[(index + n) % list.length]);

    const hero =
      '<section class="page-hero">' +
        '<div class="container-main">' +
          '<nav class="breadcrumb" aria-label="Breadcrumb">' +
            '<ol>' +
              '<li><a href="' + esc(homeUrl) + '">Beranda</a></li>' +
              '<li><a href="' + esc(servicesUrl) + '">Layanan</a></li>' +
              '<li aria-current="page">' + esc(service.name) + '</li>' +
            '</ol>' +
          '</nav>' +
          '<p class="eyebrow">LAYANAN BUROQ TRANS</p>' +
          '<h1 class="page-title">' + esc(service.name) + '</h1>' +
          '<p class="page-lead">' + esc(service.heroText || service.desc) + '</p>' +
          '<div class="page-actions">' +
            waButton('Konsultasi via WhatsApp', message) +
            '<a class="btn btn-ghost" href="' + esc(servicesUrl) + '">Semua Layanan</a>' +
          '</div>' +
          '<ul class="hero-chips">' +
            '<li>' + icon('i-clock') + 'Konsultasi rute dan jadwal</li>' +
            '<li>' + icon('i-users') + 'Personal dan perusahaan</li>' +
            '<li>' + icon('i-pin') + esc(CONFIG.hours) + '</li>' +
          '</ul>' +
        '</div>' +
      '</section>';

    const intro = service.intro || [];
    const introBody = intro.map((p) => '<p class="body-text">' + esc(p) + '</p>').join('');

    const useCases = (service.useCases || [])
      .map((item) => '<li>' + icon('i-check') + '<span>' + esc(item) + '</span></li>')
      .join('');

    const asideLinks = list
      .filter((s) => s.id !== service.id)
      .map((s) =>
        '<li><a href="' + esc(serviceUrl(s)) + '"><span>' + esc(s.name) + '</span>' +
        icon('i-arrow-right') + '</a></li>'
      )
      .join('');

    const detail =
      '<section class="page-section">' +
        '<div class="container-main detail-layout">' +
          '<div class="detail-main">' +
            '<figure class="service-figure" id="foto-layanan">' +
              '<div class="service-photo' + (service.photo ? '' : ' is-empty') + '">' +
                photoSlot(service, 'detail') +
              '</div>' +
              '<figcaption>' + esc('Dokumentasi layanan ' + service.name) + '</figcaption>' +
            '</figure>' +

            '<div class="prose">' +
              '<p class="eyebrow">GAMBARAN LAYANAN</p>' +
              '<h2 class="h2">Tentang layanan ini</h2>' +
              introBody +
            '</div>' +

            '<div class="use-case-block">' +
              '<h3 class="h3">Cocok digunakan untuk</h3>' +
              '<ul class="check-list">' + useCases + '</ul>' +
            '</div>' +
          '</div>' +

          '<aside class="detail-aside">' +
            '<div class="aside-card aside-card--navy">' +
              '<h2 class="aside-title">Konsultasikan kebutuhan Anda</h2>' +
              '<p class="aside-text">Sampaikan rencana penggunaan layanan. Rute, jadwal, dan jenis kendaraan ' +
                'akan dibahas bersama sebelum layanan disepakati.</p>' +
              '<a class="btn btn-gold" href="' + esc(waLink(CONFIG.whatsapp, message)) +
                '" target="_blank" rel="noopener">' + icon('i-whatsapp') +
                '<span>Tanya ' + esc(service.name) + '</span></a>' +
              '<ul class="aside-list">' +
                '<li>' + icon('i-clock') + '<span>' + esc(CONFIG.hours) + '</span></li>' +
                '<li>' + icon('i-phone') + '<span>' + esc(CONFIG.phone) + '</span></li>' +
                '<li>' + icon('i-pin') + '<span>' + esc(CONFIG.city) + '</span></li>' +
              '</ul>' +
            '</div>' +
            '<div class="aside-card">' +
              '<h3 class="aside-title aside-title--dark">Layanan lainnya</h3>' +
              '<ul class="aside-links">' + asideLinks + '</ul>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</section>';

    const benefits = (service.benefits || [])
      .map((b) =>
        '<article class="b-card">' +
          '<span class="b-ico">' + icon(b.icon) + '</span>' +
          '<h3 class="b-title">' + esc(b.title) + '</h3>' +
          '<p class="b-text">' + esc(b.text) + '</p>' +
        '</article>'
      )
      .join('');

    const benefitSection =
      '<section class="page-section page-section--surface">' +
        '<div class="container-main">' +
          '<div class="page-head">' +
            '<p class="eyebrow">MANFAAT LAYANAN</p>' +
            '<h2 class="h2">Hal yang perlu Anda ketahui</h2>' +
            '<p class="body-text">Poin-poin berikut menjelaskan bagaimana layanan ' +
              esc(service.name).toLowerCase() + ' disiapkan untuk kebutuhan Anda.</p>' +
          '</div>' +
          '<div class="benefit-grid cols-3">' + benefits + '</div>' +
        '</div>' +
      '</section>';

    const relatedSection =
      '<section class="page-section">' +
        '<div class="container-main">' +
          '<div class="page-head">' +
            '<p class="eyebrow">LAYANAN TERKAIT</p>' +
            '<h2 class="h2">Layanan lain yang dapat dipilih</h2>' +
          '</div>' +
          '<div class="svc-grid svc-grid--related">' + related.map(serviceCard).join('') + '</div>' +
        '</div>' +
      '</section>';

    const cta =
      '<section class="cta-band">' +
        '<div class="container-main">' +
          '<h2>Butuh ' + esc(service.name.toLowerCase()) + ' untuk kebutuhan Anda?</h2>' +
          '<p>Ceritakan rute, jadwal, serta jumlah penumpang atau muatan agar layanan dapat disesuaikan ' +
            'dengan rencana Anda.</p>' +
          '<div class="page-actions">' +
            waButton('Konsultasi ' + service.name, message) +
            '<a class="btn btn-ghost" href="' + esc(homeUrl) + '#kontak">Lihat Kontak</a>' +
          '</div>' +
        '</div>' +
      '</section>';

    mount.innerHTML = hero + detail + benefitSection + relatedSection + cta;
  };

  /* ------------------------------------------------------ /tentang-kami */
  const renderAbout = () => {
    const grid = document.getElementById('aboutServices');
    if (grid) {
      grid.innerHTML = (typeof SERVICES !== 'undefined' ? SERVICES : []).map(serviceCard).join('');
    }

    const contact = document.getElementById('aboutContact');
    if (contact) {
      const genericMsg = 'Halo BUROQ TRANS, saya ingin bertanya mengenai layanan transportasi yang tersedia.';
      const rows = (typeof CONTACTS !== 'undefined' ? CONTACTS : []).map((c) =>
        '<li>' +
          '<span class="c-ico">' + icon('i-whatsapp') + '</span>' +
          '<span>' +
            '<span class="c-label">WhatsApp</span>' +
            '<a class="c-value" href="' + esc(waLink(c.wa, genericMsg)) + '" target="_blank" rel="noopener">' +
              esc(c.label) + '</a>' +
          '</span>' +
        '</li>'
      );

      rows.push(
        '<li>' +
          '<span class="c-ico">' + icon('i-mail') + '</span>' +
          '<span>' +
            '<span class="c-label">Email</span>' +
            '<a class="c-value" href="mailto:' + esc(CONFIG.email) + '">' + esc(CONFIG.email) + '</a>' +
          '</span>' +
        '</li>' +
        '<li>' +
          '<span class="c-ico">' + icon('i-clock') + '</span>' +
          '<span>' +
            '<span class="c-label">Jam layanan</span>' +
            '<span class="c-value">' + esc(CONFIG.hours) + '</span>' +
          '</span>' +
        '</li>' +
        '<li>' +
          '<span class="c-ico">' + icon('i-pin') + '</span>' +
          '<span>' +
            '<span class="c-label">Alamat</span>' +
            '<span class="c-value">' + esc(CONFIG.address) + '</span>' +
          '</span>' +
        '</li>'
      );

      contact.innerHTML = rows.join('');
    }

    /* only accounts with a verified profile URL are rendered as links */
    const social = document.getElementById('aboutSocial');
    if (social) {
      const links = (typeof SOCIAL_LINKS !== 'undefined' ? SOCIAL_LINKS : []).filter((s) => s.url);
      social.innerHTML = links.length
        ? links.map((s) =>
            '<a class="social-link" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
              icon(s.icon) + '<span>' + esc(s.handle) + '</span>' +
            '</a>'
          ).join('')
        : '<p class="social-empty">Sosial media belum tersedia.</p>';
    }

    /* the embed only exists once a real maps embed URL is configured */
    const map = document.getElementById('aboutMap');
    if (map) {
      if (CONFIG.mapsEmbedUrl) {
        map.innerHTML =
          '<iframe src="' + esc(CONFIG.mapsEmbedUrl) + '" title="' +
          esc('Lokasi ' + CONFIG.businessName + ' di ' + CONFIG.city) + '" loading="lazy" ' +
          'allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>';
      } else {
        map.innerHTML =
          '<div class="map-slot">' +
            '<span class="map-slot-ico">' + icon('i-map') + '</span>' +
            '<h3 class="h3">Lokasi ' + esc(CONFIG.businessName) + '</h3>' +
            '<p class="body-text">' + esc(CONFIG.address) + '</p>' +
            (CONFIG.mapsUrl
              ? '<a class="btn btn-outline-dark" href="' + esc(CONFIG.mapsUrl) +
                '" target="_blank" rel="noopener">' + icon('i-arrow-ur') + '<span>Buka di Google Maps</span></a>'
              : '') +
            '<p class="map-slot-note">Peta interaktif akan ditampilkan di sini setelah tautan lokasi tersedia.</p>' +
          '</div>';
      }
    }
  };

  /* -------------------------------------------------------------------- init */
  if (PAGE === 'layanan') renderServiceDirectory();
  if (PAGE === 'service') renderServicePage(document.body.dataset.service || '');
  if (PAGE === 'tentang') renderAbout();
})();
