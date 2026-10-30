/* =============================================================================
   BUROQ TRANS — shared page shell
   -----------------------------------------------------------------------------
   Renders the icon sprite, the site header (including the Layanan dropdown) and
   the footer on every page, so navigation and contact details live in one place.

   Load order on every page: js/data.js → js/site-shell.js → js/main.js
   The shell reads <html data-base="…"> and <html data-page="…"> so the same
   markup can serve the homepage, /tentang-kami, /layanan and /layanan/[id].
   ============================================================================= */
(function () {
  'use strict';

  const root = document.documentElement;
  const BASE = root.dataset.base || './';
  const PAGE = root.dataset.page || 'home';
  const isHome = PAGE === 'home';

  /* every URL built by the shell is relative to the page that hosts it */
  const url = (path) => BASE + path;

  const esc = (str) =>
    String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const icon = (name, cls) =>
    '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#' + name + '"></use></svg>';

  const waLink = (number, text) =>
    number ? 'https://wa.me/' + number + '?text=' + encodeURIComponent(text) : '';

  const GENERAL_WA = 'Halo BUROQ TRANS, saya ingin konsultasi mengenai kebutuhan transportasi saya.';
  const logo = url((typeof ASSETS !== 'undefined' && ASSETS.brand && ASSETS.brand.logo) || 'assets/brand/logo.svg');

  /* On the homepage, links that point at index.html stay in-page anchors so the
     existing smooth scrolling keeps working. Elsewhere they become real URLs. */
  const href = (target) => {
    if (isHome && target.indexOf('index.html') === 0) {
      const rest = target.slice('index.html'.length);
      return rest || '#home';
    }
    return url(target);
  };

  const serviceUrl = (service) => url('layanan/' + service.id + '/');

  /* ------------------------------------------------------------- icon sprite */
  const SPRITE =
    '<svg class="icon-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
    '<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>' +
    '<symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>' +
    '<symbol id="i-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-arrow-ur" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></symbol>' +
    '<symbol id="i-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></symbol>' +
    '<symbol id="i-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>' +
    '<symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></symbol>' +
    '<symbol id="i-badge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 11l2 2 4-4"/><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></symbol>' +
    '<symbol id="i-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><path d="M7 7.01V7"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></symbol>' +
    '<symbol id="i-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></symbol>' +
    '<symbol id="i-car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v-4.4a2 2 0 0 1 .5-1.3l2.3-2.7a2 2 0 0 1 1.5-.7h7.4a2 2 0 0 1 1.5.7l2.3 2.7a2 2 0 0 1 .5 1.3V17"/><path d="M4 17h16"/><circle cx="7.6" cy="17.4" r="1.6"/><circle cx="16.4" cy="17.4" r="1.6"/><path d="M7 12.4h2M15 12.4h2"/></symbol>' +
    '<symbol id="i-headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15.5a2 2 0 0 1-2 2H18v-6h1a2 2 0 0 1 2 2z"/><path d="M3 15.5a2 2 0 0 0 2 2H6v-6H5a2 2 0 0 0-2 2z"/></symbol>' +
    '<symbol id="i-ticket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 11v2M13 17v2"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></symbol>' +
    '<symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></symbol>' +
    '<symbol id="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.5A10 10 0 1 0 12 2m0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3c.4 2.3 1.9 3.9 4.2 4.2v3c-1.6 0-3.1-.5-4.2-1.4v6.4a5.8 5.8 0 1 1-5-5.7v3.1a2.8 2.8 0 1 0 2 2.6V3z"/></symbol>' +
    '<symbol id="i-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></symbol>' +
    '<symbol id="i-truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h11v10H2z"/><path d="M13 9h4l4 3.5V16h-8z"/><circle cx="6.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></symbol>' +
    '<symbol id="i-hardhat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 18h19"/><path d="M5 18v-2.4a7 7 0 0 1 14 0V18"/><path d="M9.7 12.2V5.6h4.6v6.6"/><path d="M5 15.6h14"/></symbol>' +
    '<symbol id="i-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3z"/><path d="M9 3v15M15 6v15"/></symbol>' +
    '<symbol id="i-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15.5-5-5L5 21"/></symbol>' +
    '</svg>';

  /* ------------------------------------------------------------------ header */
  const isActive = (item) => {
    if (item.key === 'home') return PAGE === 'home';
    if (item.key === 'about') return PAGE === 'tentang';
    if (item.key === 'services') return PAGE === 'layanan' || PAGE === 'service';
    return false;
  };

  const navItem = (item) => {
    const active = isActive(item);
    const link =
      '<a href="' + esc(href(item.href)) + '"' +
      (active ? ' class="is-active" aria-current="page"' : '') + '>' + esc(item.label) + '</a>';

    if (!item.dropdown) return '<li class="nav-item">' + link + '</li>';

    const children = (typeof SERVICES !== 'undefined' ? SERVICES : [])
      .map((s) => '<li><a href="' + esc(serviceUrl(s)) + '">' + esc(s.name) + '</a></li>')
      .join('');

    return '<li class="nav-item nav-item--drop">' + link +
      '<button type="button" class="nav-drop-toggle" aria-expanded="false" aria-controls="navDropMenu" aria-label="Buka daftar layanan">' +
        icon('i-chevron-down') +
      '</button>' +
      '<ul class="nav-dropdown" id="navDropMenu" aria-label="Daftar layanan">' +
        '<li><a class="is-all" href="' + esc(url('layanan/')) + '">Semua Layanan</a></li>' +
        children +
      '</ul>' +
    '</li>';
  };

  const renderHeader = (mount) => {
    const items = (typeof NAV_LINKS !== 'undefined' ? NAV_LINKS : [])
      .filter((i) => i.header !== false)
      .map(navItem)
      .join('');

    mount.innerHTML =
      '<header class="site-header" id="siteHeader">' +
        '<div class="container-main header-inner">' +
          '<a class="brand" href="' + esc(isHome ? '#home' : url('index.html')) + '" aria-label="BUROQ TRANS — beranda">' +
            '<img class="brand-logo" src="' + esc(logo) + '" alt="Logo BUROQ TRANS" width="60" height="60">' +
            '<span class="brand-word"><strong>BUROQ</strong><span>TRANS</span></span>' +
          '</a>' +
          '<nav class="nav" id="mainNav" aria-label="Navigasi utama">' +
            '<button type="button" class="nav-close" id="navClose" aria-label="Tutup menu navigasi">' +
              icon('i-close') +
            '</button>' +
            '<ul class="nav-list" id="navList">' + items + '</ul>' +
          '</nav>' +
          '<div class="header-actions">' +
            '<a class="btn btn-gold btn-book-now" target="_blank" rel="noopener" href="' +
              esc(waLink(CONFIG.whatsapp, GENERAL_WA)) + '" data-wa-message="' + esc(GENERAL_WA) + '">' +
              icon('i-whatsapp') + '<span>Hubungi Kami</span>' +
            '</a>' +
            '<button type="button" class="nav-toggle" id="navToggle" aria-expanded="false" ' +
              'aria-controls="mainNav" aria-label="Buka menu navigasi">' +
              icon('i-menu', 'ico-open') + icon('i-close', 'ico-close') +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="nav-backdrop" id="navBackdrop"></div>';
  };

  /* ------------------------------------------------------------------ footer */
  const renderFooter = (mount) => {
    mount.innerHTML =
      '<footer class="site-footer" id="kontak">' +
        '<div class="container-main footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="' + esc(isHome ? '#home' : url('index.html')) + '">' +
              '<img class="brand-logo" src="' + esc(logo) + '" alt="Logo BUROQ TRANS" width="70" height="70">' +
            '</a>' +
            '<p class="footer-brand-name">' + esc(CONFIG.businessName) + '</p>' +
            '<p class="footer-legal">' + esc(CONFIG.legalName) + '<br>' + esc(CONFIG.tagline) + '</p>' +
            '<p class="footer-social-label">Ikuti Sosial Media Kami</p>' +
            '<ul class="footer-social" id="footerSocial"></ul>' +
            '<p class="footer-social-note" id="socialNote"></p>' +
          '</div>' +
          '<nav class="footer-col" aria-label="Menu footer">' +
            '<h3>MENU</h3><ul id="footerMenu"></ul>' +
          '</nav>' +
          '<div class="footer-col">' +
            '<h3>LAYANAN</h3><ul id="footerServices"></ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h3>KONTAK</h3><ul class="footer-contact" id="footerContact"></ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bar">' +
          '<div class="container-main"><p>COPYRIGHT &copy;2026 ' + esc(CONFIG.legalName) +
            '. ALL RIGHTS RESERVED.</p></div>' +
        '</div>' +
      '</footer>';

    const menu = mount.querySelector('#footerMenu');
    if (menu) {
      menu.innerHTML = (typeof NAV_LINKS !== 'undefined' ? NAV_LINKS : [])
        .map((i) => '<li><a href="' + esc(href(i.href)) + '">' + esc(i.label) + '</a></li>')
        .join('');
    }

    const services = mount.querySelector('#footerServices');
    if (services) {
      services.innerHTML = (typeof SERVICES !== 'undefined' ? SERVICES : [])
        .map((s) => '<li><a href="' + esc(serviceUrl(s)) + '">' + esc(s.name) + '</a></li>')
        .join('');
    }

    const social = mount.querySelector('#footerSocial');
    if (social) {
      const links = (typeof SOCIAL_LINKS !== 'undefined' ? SOCIAL_LINKS : []);
      social.innerHTML = links
        .map((s) => {
          const label = s.label + ' ' + s.handle;
          return s.url
            ? '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(label) + '">' +
                icon(s.icon) + '</a></li>'
            : '<li><span class="is-unlinked" role="img" aria-label="' + esc(label) + '">' +
                icon(s.icon) + '</span></li>';
        })
        .join('');
      const note = mount.querySelector('#socialNote');
      if (note) note.textContent = links.map((s) => s.label + ' ' + s.handle).join('  ·  ');
    }

    const contact = mount.querySelector('#footerContact');
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

  /* --------------------------------------------------------------- dropdown */
  let closeDropdown = () => {};

  const initDropdown = () => {
    const drop = document.querySelector('.nav-item--drop');
    if (!drop) return;

    const toggle = drop.querySelector('.nav-drop-toggle');
    const menu = drop.querySelector('.nav-dropdown');
    if (!toggle || !menu) return;
    const links = Array.from(menu.querySelectorAll('a'));

    /* hover only where a real pointer can hover; touch relies on the button */
    const canHover = () =>
      window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;

    const setOpen = (open, focusFirst) => {
      drop.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup daftar layanan' : 'Buka daftar layanan');
      if (open && focusFirst && links[0]) links[0].focus();
    };

    closeDropdown = () => setOpen(false);

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!drop.classList.contains('is-open'));
    });

    drop.addEventListener('mouseenter', () => { if (canHover()) setOpen(true); });
    drop.addEventListener('mouseleave', () => { if (canHover()) setOpen(false); });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true, true);
      }
    });

    menu.addEventListener('keydown', (e) => {
      const index = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        links[(index + 1) % links.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        links[(index - 1 + links.length) % links.length].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        toggle.focus();
      } else if (e.key === 'Tab' && index === links.length - 1 && !e.shiftKey) {
        setOpen(false);
      }
    });

    /* close when focus leaves the menu, or when a click lands elsewhere */
    drop.addEventListener('focusout', (e) => {
      if (!drop.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener('click', (e) => {
      if (!drop.contains(e.target)) setOpen(false);
    });
  };

  /* ------------------------------------------------------------ mobile menu */
  const initDrawer = () => {
    const mainNav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const backdrop = document.getElementById('navBackdrop');
    const navClose = document.getElementById('navClose');
    if (!mainNav || !navToggle) return;

    const setDrawer = (open) => {
      mainNav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      if (backdrop) backdrop.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (!open) closeDropdown();
    };

    navToggle.addEventListener('click', () => setDrawer(!mainNav.classList.contains('is-open')));

    if (backdrop) backdrop.addEventListener('click', () => setDrawer(false));

    if (navClose) {
      navClose.addEventListener('click', () => {
        setDrawer(false);
        navToggle.focus();
      });
    }

    /* any link inside the drawer closes it before navigating */
    mainNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setDrawer(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeDropdown();
      if (mainNav.classList.contains('is-open')) {
        setDrawer(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mainNav.classList.contains('is-open')) setDrawer(false);
    });
  };

  const initHeaderScroll = () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 90);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* -------------------------------------------------------------------- init */
  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');

  if (headerMount || footerMount) {
    document.body.insertAdjacentHTML('afterbegin', SPRITE);
  }
  if (headerMount) renderHeader(headerMount);
  if (footerMount) renderFooter(footerMount);

  initDropdown();
  initDrawer();
  initHeaderScroll();
})();
