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
    logo: 'assets/brand/logo.svg'
  },

  vehicles: {
    heroWhite: 'assets/vehicles/suv-white.png',   // white SUV (hero / closing)
    heroBlack: 'assets/vehicles/suv-black.png',   // dark SUV (hero / banner)
    heroMpv: 'assets/vehicles/mpv-luxury.png',    // luxury MPV (hero / banner)
    whiteAlt: 'assets/vehicles/suv-white-2.png',  // white SUV (hero slide 2)
    blackAlt: 'assets/vehicles/suv-black-2.png',  // dark SUV (service intro)
    van: 'assets/vehicles/van-white.png'          // people carrier (use case)
  },

  photos: {
    about: 'assets/photos/about.jpg',             // toll road corridor
    corp: 'assets/photos/corp.jpg',               // business district
    infoCompany: 'assets/photos/info-company.jpg',
    infoGroup: 'assets/photos/info-group.jpg',
    infoLogistik: 'assets/photos/info-logistik.jpg'
  }
};

/* ---------------------------------------------------------------------------
   3. NAVIGATION
   --------------------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Informasi', href: '#informasi' },
  { label: 'Hubungi Kami', href: '#kontak' }
];

/* ---------------------------------------------------------------------------
   4. HERO SLIDES  (manual slide — no autoplay)
   --------------------------------------------------------------------------- */
const HERO_SLIDES = [
  {
    eyebrow: 'CV. EN BUROQ TRANSPORTASI',
    title: 'Solusi Transportasi untuk {gold:Kebutuhan} Anda',
    text: 'Rental kendaraan, antar jemput karyawan, carter, pariwisata, transportasi perusahaan, logistik, hingga transportasi projek \u2014 semuanya dapat dikonsultasikan sesuai kebutuhan Anda.',
    cars: [
      { asset: 'heroMpv', alt: 'Kendaraan penumpang untuk layanan transportasi BUROQ TRANS', cls: 'hc-back' },
      { asset: 'heroWhite', alt: 'SUV putih untuk kebutuhan perjalanan keluarga dan rombongan', cls: 'hc-white' },
      { asset: 'heroBlack', alt: 'SUV gelap untuk kebutuhan perjalanan dinas perusahaan', cls: 'hc-black' }
    ]
  },
  {
    eyebrow: 'BUROQ TRANS \u2014 SOLUSI TRANSPORTASI',
    title: 'Mendukung Mobilitas {gold:Personal} dan Bisnis',
    text: 'Dari perjalanan pribadi dan rombongan, mobilitas karyawan harian, sampai pengiriman barang dan operasional projek di lapangan.',
    cars: [
      { asset: 'whiteAlt', alt: 'SUV putih untuk antar jemput karyawan', cls: 'hc-back' },
      { asset: 'heroMpv', alt: 'Kendaraan penumpang untuk perjalanan dinas', cls: 'hc-white' },
      { asset: 'blackAlt', alt: 'SUV gelap untuk kebutuhan operasional perusahaan', cls: 'hc-black' }
    ]
  }
];

/* Factual service attributes \u2014 not marketing superlatives. */
const HERO_BADGES = [
  { icon: 'i-clock', label: 'SENIN\u2013SABTU<br>08.00\u201317.00' },
  { icon: 'i-users', label: 'PERSONAL &<br>PERUSAHAAN' },
  { icon: 'i-pin',   label: 'RUTE & JADWAL<br>DAPAT DIBAHAS' },
  { icon: 'i-layers',label: '7 JENIS<br>LAYANAN' }
];

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
   --------------------------------------------------------------------------- */
const SERVICES = [
  {
    id: 'rental',
    icon: 'i-car',
    name: 'Rental Kendaraan',
    desc: 'Sewa kendaraan dengan masa penggunaan harian, mingguan, atau bulanan untuk kebutuhan pribadi maupun perusahaan.',
    use: 'Untuk penggunaan pribadi dan korporat'
  },
  {
    id: 'antar-jemput',
    icon: 'i-users',
    name: 'Antar Jemput Karyawan',
    desc: 'Transportasi karyawan yang disusun mengikuti rute dan jam kerja perusahaan, dengan penekanan pada kenyamanan dan ketepatan waktu.',
    use: 'Untuk mobilitas karyawan perusahaan'
  },
  {
    id: 'carter',
    icon: 'i-pin',
    name: 'Carter Kendaraan',
    desc: 'Sewa kendaraan dengan rute dan durasi yang fleksibel untuk perjalanan dalam kota maupun luar kota.',
    use: 'Untuk perjalanan luar kota dan rombongan'
  },
  {
    id: 'pariwisata',
    icon: 'i-ticket',
    name: 'Transportasi Pariwisata',
    desc: 'Kendaraan nyaman untuk perjalanan wisata keluarga, sekolah, komunitas, maupun rombongan perusahaan.',
    use: 'Untuk wisata keluarga dan rombongan'
  },
  {
    id: 'perusahaan',
    icon: 'i-badge',
    name: 'Transportasi Perusahaan',
    desc: 'Mendukung operasional bisnis harian, termasuk perjalanan dinas, kunjungan kerja, rapat, dan mobilitas karyawan.',
    use: 'Untuk kebutuhan operasional bisnis'
  },
  {
    id: 'logistik',
    icon: 'i-truck',
    name: 'Transportasi Logistik',
    desc: 'Kendaraan untuk pengiriman dan distribusi barang, dengan pilihan kendaraan yang disesuaikan dengan jenis muatan.',
    use: 'Untuk pengiriman dan distribusi barang'
  },
  {
    id: 'projek',
    icon: 'i-hardhat',
    name: 'Transportasi Projek',
    desc: 'Transportasi khusus untuk mendukung operasional projek: mobilitas karyawan, perpindahan tim kerja, dan pengangkutan kebutuhan di lokasi projek.',
    use: 'Untuk operasional projek dan tim lapangan'
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
   9. SERVICE USE CASES
      No invented prices, durations, itineraries or fixed routes.
   --------------------------------------------------------------------------- */
const USE_CASES = [
  {
    id: 'rombongan',
    category: 'Untuk Keluarga & Rombongan',
    title: 'Perjalanan Keluarga dan Rombongan',
    text: 'Perjalanan bersama keluarga, sekolah, komunitas, maupun rombongan perusahaan memerlukan kendaraan dan jadwal yang terkoordinasi. Kami membantu menyesuaikan jenis kendaraan serta titik jemput dan antar sesuai kebutuhan rombongan Anda.',
    vehicle: 'van',
    alt: 'Kendaraan penumpang untuk perjalanan keluarga dan rombongan',
    cta: 'Tanya Layanan Pariwisata',
    service: 'Transportasi Pariwisata'
  },
  {
    id: 'dinas',
    category: 'Untuk Kebutuhan Perusahaan',
    title: 'Kunjungan Kerja dan Perjalanan Dinas',
    text: 'Kegiatan resmi perusahaan seperti kunjungan kerja, rapat, dan work visit memerlukan transportasi yang praktis. Rute, jadwal, serta jenis kendaraannya dapat diatur bersama sebelum keberangkatan.',
    vehicle: 'heroMpv',
    alt: 'Kendaraan penumpang untuk kunjungan kerja dan perjalanan dinas',
    cta: 'Diskusikan Kebutuhan Perusahaan',
    service: 'Transportasi Perusahaan'
  }
];

/* ---------------------------------------------------------------------------
   10. TRANSPORT NEEDS  \u2014 why planning matters (replaces testimonials:
       the client has not supplied verified reviews, so none are invented)
   --------------------------------------------------------------------------- */
const NEED_BLOCKS = [
  {
    icon: 'i-users',
    title: 'Transportasi Personal dan Rombongan',
    text: 'Perjalanan keluarga, wisata, dan kegiatan bersama rombongan memerlukan kendaraan yang sesuai dengan jumlah penumpang serta jadwal yang jelas sejak awal.'
  },
  {
    icon: 'i-badge',
    title: 'Kebutuhan Operasional Perusahaan',
    text: 'Antar jemput karyawan, perjalanan dinas, kunjungan kerja, dan mobilitas harian perusahaan perlu diatur mengikuti rute serta jam kerja yang berlaku.'
  },
  {
    icon: 'i-hardhat',
    title: 'Mobilitas Tim dan Logistik Projek',
    text: 'Operasional projek sering membutuhkan perpindahan tim dan pengangkutan barang ke lokasi kerja, sehingga armada serta jadwalnya perlu disesuaikan.'
  }
];

/* ---------------------------------------------------------------------------
   11. HOW TO START  \u2014 a booking is only confirmed once both parties agree
   --------------------------------------------------------------------------- */
const START_STEPS = [
  { no: 1, title: 'Hubungi BUROQ TRANS', text: 'Hubungi kami melalui WhatsApp atau telepon untuk memulai diskusi kebutuhan transportasi Anda.' },
  { no: 2, title: 'Sampaikan Kebutuhan', text: 'Ceritakan jenis layanan, jumlah penumpang atau muatan, rute, serta jadwal yang dibutuhkan.' },
  { no: 3, title: 'Diskusikan Rinciannya', text: 'Jenis kendaraan, rute, jadwal, dan penawaran akan dibahas bersama sebelum layanan disepakati.' },
  { no: 4, title: 'Lakukan Konfirmasi', text: 'Layanan dianggap terkonfirmasi setelah kedua pihak menyepakati rincian yang telah dibahas.' }
];

/* ---------------------------------------------------------------------------
   12. INFORMATIONAL CONTENT  \u2014 service education, not published articles.
       Deliberately has NO author, NO publication date and NO article URL.
   --------------------------------------------------------------------------- */
const INFO_CARDS = [
  {
    id: 'info-perusahaan',
    category: 'Panduan',
    title: 'Memilih Layanan Transportasi untuk Kebutuhan Perusahaan',
    excerpt: 'Setiap perusahaan memiliki pola mobilitas yang berbeda. Hal yang perlu diperhatikan saat memilih layanan transportasi untuk karyawan dan operasional harian.',
    body:
      'Kebutuhan transportasi perusahaan biasanya tidak berdiri sendiri. Ada antar jemput karyawan yang mengikuti jam kerja, perjalanan dinas yang mendadak, sampai kunjungan kerja ke beberapa lokasi dalam satu hari.\n\n' +
      'Karena itu, sebelum menentukan layanan, ada baiknya mengumpulkan informasi dasar: jumlah karyawan, rute yang dilalui, jam berangkat dan pulang, serta kebutuhan kendaraan di luar jam operasional. Informasi tersebut memudahkan penyesuaian rute dan jadwal.\n\n' +
      'Setiap kebutuhan perusahaan berbeda. Diskusikan kebutuhan Anda dengan tim kami agar layanan yang ditawarkan benar-benar sesuai dengan aktivitas perusahaan Anda.',
    image: 'infoCompany',
    alt: 'Pemandangan kawasan perkantoran dengan jalur transportasi di sekitarnya'
  },
  {
    id: 'info-rombongan',
    category: 'Panduan',
    title: 'Merencanakan Transportasi untuk Perjalanan Rombongan',
    excerpt: 'Perjalanan rombongan memerlukan perencanaan yang matang, mulai dari jumlah penumpang, jenis kendaraan, hingga titik jemput dan antar.',
    body:
      'Perjalanan bersama rombongan \u2014 baik keluarga, sekolah, komunitas, maupun kegiatan perusahaan \u2014 cenderung lebih rumit daripada perjalanan perorangan. Jumlah penumpang yang banyak membuat pemilihan kendaraan menjadi hal utama.\n\n' +
      'Selain itu, perhatikan juga titik jemput dan titik antar, karena menentukan rute sekaligus lama perjalanan. Rombongan biasanya juga membutuhkan waktu berkumpul sebelum berangkat, sehingga jadwal perlu disusun lebih awal.\n\n' +
      'Sampaikan rencana perjalanan rombongan Anda kepada kami. Jenis kendaraan dan jadwalnya dapat dikonsultasikan terlebih dahulu sebelum hari keberangkatan.',
    image: 'infoGroup',
    alt: 'Kendaraan bus pariwisata untuk perjalanan rombongan'
  },
  {
    id: 'info-logistik',
    category: 'Panduan',
    title: 'Menyesuaikan Kendaraan dengan Kebutuhan Logistik dan Proyek',
    excerpt: 'Jenis muatan dan kondisi lokasi menentukan pilihan kendaraan. Hal-hal yang perlu disesuaikan untuk kebutuhan logistik dan operasional projek.',
    body:
      'Transportasi logistik dan kebutuhan projek tidak bisa disamakan dengan transportasi penumpang. Jenis muatan, volume, serta kondisi lokasi menentukan kendaraan mana yang tepat digunakan.\n\n' +
      'Untuk operasional projek, kebutuhannya bisa bertambah. Selain pengangkutan barang, sering kali diperlukan perpindahan tim kerja antar lokasi dan mobilitas karyawan di lapangan. Jadwalnya pun mengikuti perkembangan progres projek.\n\n' +
      'Ceritakan jenis muatan dan kondisi lokasi projek Anda. Penyesuaian kendaraan dan jadwalnya akan kami diskusikan bersama sebelum layanan dimulai.',
    image: 'infoLogistik',
    alt: 'Kendaraan truk untuk kebutuhan transportasi logistik dan projek'
  }
];

/* ---------------------------------------------------------------------------
   13. FOOTER LINK GROUPS & SOCIAL
   --------------------------------------------------------------------------- */
const FOOTER_SERVICES = SERVICES.map((s) => s.name);

/* Instagram and TikTok URLs are formed directly from the handles supplied by
   the client. Facebook: only a display name was supplied and no profile URL
   could be verified, so it is deliberately NOT linked. */
const SOCIAL_LINKS = [
  { icon: 'i-instagram', label: 'Instagram', handle: '@brqtrans_official', url: 'https://www.instagram.com/brqtrans_official/' },
  { icon: 'i-tiktok',    label: 'TikTok',    handle: '@brqtrans_official', url: 'https://www.tiktok.com/@brqtrans_official' },
  { icon: 'i-facebook',  label: 'Facebook',  handle: 'Amadsatari',          url: '' }
];
