/* =============================================================================
   BUROQ TRANS — BUSINESS DATA & ASSET MANIFEST
   -----------------------------------------------------------------------------
   Everything editable lives here. Edit the values below and the page updates
   without touching index.html.

   SOURCE OF TRUTH = client brief for CV. EN BUROQ TRANSPORTASI (brand: BUROQ TRANS).
   The client has NOT supplied prices, fixed routes, confirmed fleet inventory,
   customer reviews or operating statistics — none of those are invented here.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   1. CONFIGURATION  (used by js/main.js)
   --------------------------------------------------------------------------- */
const CONFIG = {
  businessName: 'BUROQ TRANS',
  legalName: 'CV. EN BUROQ TRANSPORTASI',
  tagline: 'Solusi Transportasi',
  city: 'Karawang',

  address: 'Jl Babakan Bandung RT 03/20 Kel Adiarsa Barat Citarum, Kec. Karawang Barat, Kab. Karawang',
  mapsUrl: 'https://maps.app.goo.gl/osvpvwVTCMCmgKmLA',
  /* Embeddable Google Maps URL used by the Tentang Kami page. The client has
     supplied a share link (mapsUrl) but no embed URL yet, so the iframe stays
     hidden and the page shows the address plus a link to mapsUrl. Paste a URL
     from Google Maps ("Share > Embed a map") here to switch the embed on. */
  mapsEmbedUrl: '',
  hours: 'Senin\u2013Sabtu, 08.00\u201317.00 WIB',

  /* --- WhatsApp ----------------------------------------------------------
     Primary contact number in international format (E.164, no "+").
     Change this ONE value to switch the number every CTA points at.
     Default = 0813-2007-5918. The client may confirm a preferred number later.
     While empty, no wa.me link is ever opened and the form falls back to copy. */
  whatsapp: '6281320075918',
  whatsappLabel: 'Tanya via WhatsApp',

  phone: '0813-2007-5918',
  email: 'buroqtransport@yahoo.com',

  bookingNotice:
    'Pengiriman formulir ini adalah PERMINTAAN INFORMASI, bukan pemesanan yang ' +
    'sudah terkonfirmasi. Tim kami akan menghubungi Anda untuk membahas rincian ' +
    'kebutuhan, ketersediaan kendaraan, serta penawarannya.'
};

/* All four published contact numbers (shown in the footer contact area). */
const CONTACTS = [
  { label: '0813-2007-5918', wa: '6281320075918' },
  { label: '0812-9868-9495', wa: '6281298689495' },
  { label: '0822-9924-1505', wa: '6282299241505' },
  { label: '0895-1874-0781', wa: '6289518740781' }
];

/* ---------------------------------------------------------------------------
   2. ASSET MANIFEST  — single source of truth for every image path.
      main.js rewrites every [data-asset] <img> from this object on load, so an
      image can be swapped here without editing the HTML layout.
   --------------------------------------------------------------------------- */
const ASSETS = {
  brand: {
    logo: 'assets/brand/logoburoq.png'
  },

  vehicles: {
    heroTrio: 'assets/photos/herosection.webp',   // hero composition (three vehicles)
    heroWhite: 'assets/vehicles/suv-white.png',   // white SUV (hero / closing)
    heroBlack: 'assets/vehicles/suv-black.png',   // dark SUV (hero / banner)
    heroMpv: 'assets/vehicles/mpv-luxury.png',    // luxury MPV (hero / banner)
    whiteAlt: 'assets/vehicles/avanza.webp',      // Toyota Avanza (about section)
    blackAlt: 'assets/vehicles/innova.webp',      // Toyota Innova (about section)
    truck: 'assets/vehicles/canter.webp',         // box truck (service intro)
    van: 'assets/vehicles/van-white.png'          // people carrier (use case)
  },

  photos: {
    about: 'assets/photos/about.jpg',             // toll road corridor
    corp: 'assets/photos/corp.jpg'                // business district
  }
};

/* ---------------------------------------------------------------------------
   3. NAVIGATION
   --------------------------------------------------------------------------- */
/* `href` values are relative to the site root, so the shared header can build
   the right path from any page depth. On the homepage, links that point at
   index.html are converted back into in-page anchors by js/site-shell.js.
   The entry with `dropdown: 'services'` renders the seven-service menu.
   `header: false` keeps a link in the footer menu but out of the main navbar. */
const NAV_LINKS = [
  { key: 'home',     label: 'Beranda',      href: 'index.html' },
  { key: 'about',    label: 'Tentang Kami', href: 'tentang-kami/' },
  { key: 'services', label: 'Layanan',      href: 'layanan/', dropdown: 'services' },
  { key: 'contact',  label: 'Hubungi Kami', href: 'index.html#kontak',    header: false }
];

/* ---------------------------------------------------------------------------
   4. HERO  (one static headline block — no slider, one dominant vehicle)
       {gold:...} marks the phrase rendered in the accent colour.
   --------------------------------------------------------------------------- */
const HERO = {
  eyebrow: 'MITRA TRANSPORTASI UNTUK BISNIS & PERJALANAN',
  title: 'Solusi {gold:Transportasi Andal} untuk Setiap Kebutuhan',
  text: 'Dari rental kendaraan dan antar-jemput karyawan hingga kebutuhan transportasi perusahaan dan logistik proyek, Buroq Trans siap membantu perjalanan Anda dengan solusi yang dapat disesuaikan.',
  vehicle: {
    asset: 'heroTrio',
    alt: 'Tiga armada kendaraan BUROQ TRANS untuk transportasi perusahaan dan antar-jemput karyawan'
  }
};

/* ---------------------------------------------------------------------------
   5. TRUST STRIP  \u2014 factual service attributes, no invented figures
   --------------------------------------------------------------------------- */
const STATS = [
  { icon: 'i-layers', value: '7 Layanan',   label: 'Rental, karyawan, carter, pariwisata, perusahaan, logistik, dan projek' },
  { icon: 'i-users',  value: 'Personal & Korporat', label: 'Individu, keluarga, sekolah, komunitas, dan perusahaan' },
  { icon: 'i-pin',    value: 'Rute Fleksibel', label: 'Rute dan jadwal dibahas sesuai kebutuhan Anda' },
  { icon: 'i-clock',  value: 'Senin\u2013Sabtu', label: 'Jam layanan 08.00\u201317.00 WIB' }
];

/* ---------------------------------------------------------------------------
   6. THE SEVEN OFFICIAL SERVICES
      Descriptions follow the client brief \u2014 wording may be polished,
      meaning must not change.

      `photo` holds the unit photo for each service (cards, directory and
      detail hero all read it). Leaving it empty renders the 16:9 placeholder
      instead \u2014 the card layout does not change.
   --------------------------------------------------------------------------- */
const SERVICES = [
  {
    id: 'rental',
    icon: 'i-car',
    name: 'Rental Kendaraan',
    desc: 'Sewa kendaraan dengan masa penggunaan harian, mingguan, atau bulanan untuk kebutuhan pribadi maupun perusahaan.',
    heroText: 'Sewa kendaraan untuk masa penggunaan harian, mingguan, atau bulanan, baik untuk perjalanan pribadi maupun kegiatan perusahaan.',
    intro: [
      'Rental kendaraan ditujukan untuk Anda yang membutuhkan kendaraan dalam periode tertentu tanpa perlu mengurus kendaraan sendiri. Lama penggunaan dapat disesuaikan, mulai dari kebutuhan beberapa hari hingga bulanan.',
      'Jenis kendaraan, durasi pemakaian, dan area penggunaan dibahas terlebih dahulu agar kendaraan yang disiapkan sesuai dengan rencana perjalanan atau kegiatan Anda.'
    ],
    useCases: [
      'Perjalanan dinas atau kunjungan kerja yang memerlukan kendaraan sendiri',
      'Kebutuhan kendaraan sementara saat kendaraan utama tidak dapat digunakan',
      'Mobilitas harian untuk kegiatan operasional perusahaan',
      'Perjalanan keluarga dalam periode tertentu'
    ],
    benefits: [
      { icon: 'i-clock', title: 'Durasi Fleksibel', text: 'Penggunaan harian, mingguan, atau bulanan sesuai kebutuhan Anda.' },
      { icon: 'i-car', title: 'Pilihan Kendaraan', text: 'Jenis kendaraan dibahas bersama sebelum layanan disepakati.' },
      { icon: 'i-users', title: 'Pribadi dan Perusahaan', text: 'Dapat digunakan untuk perjalanan pribadi maupun keperluan operasional perusahaan.' }
    ],
    photo: 'assets/penumpang/all_new_innova.webp'
  },
  {
    id: 'antar-jemput',
    icon: 'i-users',
    name: 'Antar Jemput Karyawan',
    desc: 'Transportasi karyawan yang disusun mengikuti rute dan jam kerja perusahaan, dengan penekanan pada kenyamanan dan ketepatan waktu.',
    heroText: 'Transportasi karyawan yang disusun mengikuti rute dan jam kerja perusahaan, dengan penekanan pada kenyamanan dan ketepatan waktu.',
    intro: [
      'Layanan antar jemput karyawan membantu perusahaan mengatur perpindahan karyawan dari titik jemput ke lokasi kerja dan sebaliknya. Rute dan jadwal disusun berdasarkan jam kerja serta lokasi yang dilalui.',
      'Penyesuaian rute, titik jemput, dan jumlah penumpang dibahas bersama tim perusahaan agar kegiatan harian berjalan lebih tertib.'
    ],
    useCases: [
      'Perusahaan dengan karyawan yang berangkat dan pulang pada jam yang sama',
      'Lokasi kerja yang tidak terjangkau langsung oleh transportasi umum',
      'Kebutuhan penjemputan rutin setiap hari kerja',
      'Kegiatan perusahaan di luar jam kerja normal'
    ],
    benefits: [
      { icon: 'i-clock', title: 'Mengikuti Jam Kerja', text: 'Jadwal keberangkatan dan penjemputan disesuaikan dengan jam operasional perusahaan.' },
      { icon: 'i-pin', title: 'Rute yang Disepakati', text: 'Titik jemput dan jalur yang dilalui dibahas sebelum layanan dimulai.' },
      { icon: 'i-users', title: 'Mobilitas Harian', text: 'Membantu perpindahan karyawan setiap hari kerja secara lebih teratur.' }
    ],
    photo: 'assets/penumpang/elf.webp'
  },
  {
    id: 'carter',
    icon: 'i-pin',
    name: 'Carter Kendaraan',
    desc: 'Sewa kendaraan dengan rute dan durasi yang fleksibel untuk perjalanan dalam kota maupun luar kota.',
    heroText: 'Sewa kendaraan dengan rute dan durasi yang fleksibel untuk perjalanan dalam kota maupun luar kota.',
    intro: [
      'Carter kendaraan digunakan untuk perjalanan dengan rute dan kegiatan tertentu. Anda dapat menyampaikan tujuan, urutan perjalanan, serta durasi yang dibutuhkan.',
      'Rute, waktu penggunaan, dan titik antar dibahas agar kendaraan yang disiapkan sesuai dengan agenda perjalanan Anda.'
    ],
    useCases: [
      'Kegiatan yang memerlukan beberapa titik tujuan dalam satu perjalanan',
      'Acara keluarga atau komunitas dengan agenda tertentu',
      'Kunjungan kerja ke beberapa lokasi',
      'Perjalanan luar kota dengan waktu keberangkatan yang disepakati'
    ],
    benefits: [
      { icon: 'i-pin', title: 'Rute Sesuai Agenda', text: 'Tujuan dan urutan perjalanan disusun mengikuti kegiatan Anda.' },
      { icon: 'i-clock', title: 'Durasi Menyesuaikan', text: 'Waktu penggunaan kendaraan dibahas sesuai durasi kegiatan.' },
      { icon: 'i-map', title: 'Dalam dan Luar Kota', text: 'Dapat digunakan untuk perjalanan di dalam kota maupun luar kota.' }
    ],
    photo: 'assets/penumpang/hino.webp'
  },
  {
    id: 'pariwisata',
    icon: 'i-ticket',
    name: 'Transportasi Pariwisata',
    desc: 'Kendaraan nyaman untuk perjalanan wisata keluarga, sekolah, komunitas, maupun rombongan perusahaan.',
    heroText: 'Kendaraan untuk perjalanan wisata keluarga, sekolah, komunitas, maupun rombongan perusahaan.',
    intro: [
      'Perjalanan wisata biasanya melibatkan banyak peserta dan agenda yang sudah tersusun. Kami membantu menyiapkan kendaraan yang sesuai dengan jumlah penumpang dan rencana perjalanan rombongan.',
      'Titik jemput, tujuan, serta jadwal perjalanan dibahas lebih awal agar rombongan tidak perlu mengatur kendaraan secara terpisah.'
    ],
    useCases: [
      'Wisata keluarga besar atau komunitas',
      'Kegiatan sekolah dan kunjungan belajar',
      'Rombongan perusahaan untuk kegiatan bersama',
      'Perjalanan beberapa hari dengan agenda yang telah tersusun'
    ],
    benefits: [
      { icon: 'i-users', title: 'Untuk Rombongan', text: 'Keluarga, sekolah, komunitas, maupun rombongan perusahaan.' },
      { icon: 'i-calendar', title: 'Jadwal Terencana', text: 'Tanggal dan agenda perjalanan dibahas lebih awal.' },
      { icon: 'i-pin', title: 'Titik Jemput dan Antar', text: 'Titik jemput dan tujuan diatur sesuai rencana perjalanan.' }
    ],
    photo: 'assets/penumpang/elf.webp'
  },
  {
    id: 'perusahaan',
    icon: 'i-badge',
    name: 'Transportasi Perusahaan',
    desc: 'Mendukung operasional bisnis harian, termasuk perjalanan dinas, kunjungan kerja, rapat, dan mobilitas karyawan.',
    heroText: 'Mendukung operasional bisnis harian, termasuk perjalanan dinas, kunjungan kerja, rapat, dan mobilitas karyawan.',
    intro: [
      'Kebutuhan transportasi perusahaan mencakup banyak kegiatan, mulai dari antar jemput karyawan hingga perjalanan dinas. Semuanya memerlukan pengaturan rute dan jadwal yang jelas.',
      'Layanan dapat dibahas sesuai pola operasional perusahaan, termasuk kebutuhan kendaraan di luar kegiatan rutin.'
    ],
    useCases: [
      'Perjalanan dinas dan kunjungan kerja',
      'Rapat atau pertemuan di luar kantor',
      'Mobilitas karyawan antar lokasi kerja',
      'Kegiatan perusahaan yang memerlukan kendaraan tambahan'
    ],
    benefits: [
      { icon: 'i-badge', title: 'Perjalanan Dinas', text: 'Kendaraan untuk kunjungan kerja dan kegiatan resmi perusahaan.' },
      { icon: 'i-users', title: 'Mobilitas Karyawan', text: 'Mendukung perpindahan karyawan antar lokasi kerja.' },
      { icon: 'i-layers', title: 'Pengaturan Terpusat', text: 'Kebutuhan transportasi perusahaan dibahas dalam satu koordinasi.' }
    ],
    photo: 'assets/penumpang/vellfire.webp'
  },
  {
    id: 'logistik',
    icon: 'i-truck',
    name: 'Transportasi Logistik',
    desc: 'Kendaraan untuk pengiriman dan distribusi barang, dengan pilihan kendaraan yang disesuaikan dengan jenis muatan.',
    heroText: 'Kendaraan untuk pengiriman dan distribusi barang, dengan pilihan kendaraan yang disesuaikan dengan jenis muatan.',
    intro: [
      'Transportasi logistik berkaitan dengan pengiriman dan distribusi barang. Jenis kendaraan perlu disesuaikan dengan bentuk, volume, dan berat muatan.',
      'Rute pengiriman, jadwal, serta titik bongkar muat dibahas bersama agar barang sampai sesuai rencana.'
    ],
    useCases: [
      'Pengiriman barang antar gudang dan lokasi tujuan',
      'Distribusi barang untuk kebutuhan operasional harian',
      'Pengangkutan material dalam jumlah tertentu',
      'Pengiriman berkala dengan jadwal yang disepakati'
    ],
    benefits: [
      { icon: 'i-truck', title: 'Disesuaikan dengan Muatan', text: 'Jenis kendaraan dibahas mengikuti bentuk, volume, dan berat muatan.' },
      { icon: 'i-map', title: 'Rute Pengiriman', text: 'Rute serta titik bongkar muat disepakati sebelum pengiriman.' },
      { icon: 'i-calendar', title: 'Jadwal Berkala', text: 'Dapat digunakan untuk pengiriman rutin maupun berkala.' }
    ],
    photo: 'assets/logistik/granmax.webp'
  },
  {
    id: 'projek',
    icon: 'i-hardhat',
    name: 'Transportasi Projek',
    desc: 'Transportasi khusus untuk mendukung operasional projek: mobilitas karyawan, perpindahan tim kerja, dan pengangkutan kebutuhan di lokasi projek.',
    heroText: 'Transportasi khusus untuk mendukung operasional projek: mobilitas karyawan, perpindahan tim kerja, dan pengangkutan kebutuhan di lokasi projek.',
    intro: [
      'Operasional projek sering berlangsung di lokasi yang jauh dari pusat kota dan membutuhkan perpindahan orang maupun barang secara rutin.',
      'Kebutuhan transportasi projek dapat dibahas mengikuti jadwal kerja, lokasi, serta jenis barang yang perlu dipindahkan.'
    ],
    useCases: [
      'Perpindahan tim kerja ke dan dari lokasi projek',
      'Pengangkutan peralatan dan kebutuhan kerja',
      'Mobilitas karyawan di area projek',
      'Kebutuhan transportasi tambahan pada tahap pekerjaan tertentu'
    ],
    benefits: [
      { icon: 'i-hardhat', title: 'Mobilitas Tim Kerja', text: 'Perpindahan tim ke dan dari lokasi projek.' },
      { icon: 'i-truck', title: 'Pengangkutan Kebutuhan', text: 'Peralatan dan kebutuhan kerja di lokasi projek.' },
      { icon: 'i-clock', title: 'Jadwal Mengikuti Progres', text: 'Pengaturan jadwal disesuaikan dengan tahapan pekerjaan.' }
    ],
    photo: 'assets/logistik/isuzu_elf_bak.webp'
  }
];

/* ---------------------------------------------------------------------------
   7. WHY BUROQ TRANS  \u2014 four factual benefits, no unverified guarantees
   --------------------------------------------------------------------------- */
const BENEFITS = [
  {
    icon: 'i-layers',
    title: 'Pilihan Layanan Beragam',
    text: 'Tujuh jenis layanan transportasi \u2014 mulai dari rental kendaraan sampai transportasi projek \u2014 dapat dipilih sesuai kebutuhan Anda.'
  },
  {
    icon: 'i-users',
    title: 'Kebutuhan Personal dan Perusahaan',
    text: 'Layanan dapat digunakan oleh individu, keluarga, sekolah, komunitas, maupun perusahaan.'
  },
  {
    icon: 'i-pin',
    title: 'Pengaturan Rute dan Jadwal',
    text: 'Rute, jadwal, dan durasi penggunaan kendaraan dapat dikonsultasikan sebelum layanan disepakati.'
  },
  {
    icon: 'i-hardhat',
    title: 'Solusi untuk Operasional dan Proyek',
    text: 'Mendukung mobilitas karyawan, pengiriman barang, serta kebutuhan transportasi di lokasi projek.'
  }
];

/* ---------------------------------------------------------------------------
   8. CORPORATE TRANSPORTATION FEATURE LIST
   --------------------------------------------------------------------------- */
const CORP_FEATURES = [
  { icon: 'i-users',    title: 'Antar Jemput Karyawan',      text: 'Mengikuti rute dan jam kerja perusahaan.' },
  { icon: 'i-badge',    title: 'Perjalanan Dinas',           text: 'Mendukung kegiatan operasional harian perusahaan.' },
  { icon: 'i-calendar', title: 'Kunjungan Kerja dan Rapat',  text: 'Kendaraan untuk kebutuhan resmi di luar kantor.' },
  { icon: 'i-car',      title: 'Mobilitas Karyawan',         text: 'Perpindahan antar lokasi kerja dan kegiatan tim.' }
];

/* ---------------------------------------------------------------------------
   9. HOW TO START  \u2014 a booking is only confirmed once both parties agree
   --------------------------------------------------------------------------- */
const START_STEPS = [
  { no: 1, title: 'Hubungi BUROQ TRANS', text: 'Hubungi kami melalui WhatsApp atau telepon untuk memulai diskusi kebutuhan transportasi Anda.' },
  { no: 2, title: 'Sampaikan Kebutuhan', text: 'Ceritakan jenis layanan, jumlah penumpang atau muatan, rute, serta jadwal yang dibutuhkan.' },
  { no: 3, title: 'Diskusikan Rinciannya', text: 'Jenis kendaraan, rute, jadwal, dan penawaran akan dibahas bersama sebelum layanan disepakati.' },
  { no: 4, title: 'Lakukan Konfirmasi', text: 'Layanan dianggap terkonfirmasi setelah kedua pihak menyepakati rincian yang telah dibahas.' }
];

/* ---------------------------------------------------------------------------
   10. FOOTER LINK GROUPS & SOCIAL
   --------------------------------------------------------------------------- */
/* Instagram and TikTok URLs are formed directly from the handles supplied by
   the client. Facebook: only a display name was supplied and no profile URL
   could be verified, so it is deliberately NOT linked. */
const SOCIAL_LINKS = [
  { icon: 'i-instagram', label: 'Instagram', handle: '@brqtrans_official', url: 'https://www.instagram.com/brqtrans_official/' },
  { icon: 'i-tiktok',    label: 'TikTok',    handle: '@brqtrans_official', url: 'https://www.tiktok.com/@brqtrans_official' },
  { icon: 'i-facebook',  label: 'Facebook',  handle: 'Amadsatari',          url: '' }
];
