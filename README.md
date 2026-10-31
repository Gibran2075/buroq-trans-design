# BUROQ TRANS — Website Prototype

Prototipe situs statis untuk **BUROQ TRANS**, public brand dari **CV. EN BUROQ TRANSPORTASI** —
solusi transportasi di Karawang: rental kendaraan, antar jemput karyawan, carter, pariwisata,
transportasi perusahaan, logistik, dan transportasi projek.

Desain mengacu pada file referensi `inspirasi/buroq1_inspiration.webp` — layout editorial asimetris,
dekorasi bersudut diagonal, palet navy `#071B3D` + emas `#D9B52B` + putih.

Situs terdiri dari satu beranda (dipertahankan apa adanya), halaman profil perusahaan,
direktori layanan, dan tujuh halaman detail layanan:

| URL | Isi |
| --- | --- |
| `/` | Beranda (12 section + modal booking & informasi) |
| `/tentang-kami` | Profil perusahaan, layanan, kontak, sosial media, lokasi |
| `/layanan` | Direktori tujuh layanan |
| `/layanan/rental` · `antar-jemput` · `carter` · `pariwisata` · `perusahaan` · `logistik` · `projek` | Template detail layanan yang sama, diisi data per layanan |

> Seluruh copy (hero → footer) sudah ditulis ulang mengikuti brief klien resmi. Nama lama
> ("RA Putra Mandiri Transport", "RA Trans Group") dan fokus Surabaya / sewa mobil sudah
> dihapus seluruhnya.

---

## 1. Teknologi

| Bagian | Teknologi |
| --- | --- |
| Struktur | HTML5 semantik |
| Styling | CSS3 kustom (`css/style.css` + `css/pages.css`) + **Tailwind CSS Play CDN** untuk utility (beranda) |
| Interaksi | Vanilla JavaScript (`js/data.js`, `js/site-shell.js`, `js/main.js`, `js/pages.js`) |
| Font | Google Fonts — Poppins (display) & Inter (body) |

Tidak ada framework, tidak ada build step, tidak ada dependencies. Buka `index.html` langsung atau
sajikan lewat web server statis apa pun.

> **Catatan Tailwind:** halaman ini memakai Tailwind Play CDN (`https://cdn.tailwindcss.com`)
> yang hanya ditujukan untuk **development / demo**. Sebelum produksi, ganti dengan build Tailwind
> lokal (`tailwindcss -i ./css/style.css -o ./css/tailwind.build.css --minify`) atau hapus utility
> yang dipakai dan pindahkan semuanya ke `css/style.css`.

---

## 2. Cara Menjalankan

### Opsi A — buka langsung

```
buroq-transport/index.html
```

Cukup buka file tersebut di browser. Semua gambar memakai path relatif.

### Opsi B — web server lokal (disarankan)

```bash
cd buroq-transport
python -m http.server 8080
# lalu buka http://localhost:8080
```

atau

```bash
npx serve .
```

---

## 3. Struktur Proyek

```
buroq-transport/
├── index.html              # beranda: 12 section + modal booking & informasi
├── tentang-kami/
│   └── index.html          # /tentang-kami — profil, layanan, kontak, sosial, peta
├── layanan/
│   ├── index.html          # /layanan — direktori tujuh layanan
│   └── <slug>/index.html   # /layanan/<slug> — tujuh halaman detail (shell tipis)
├── css/
│   ├── style.css           # token warna, shape/clip-path, tipografi, responsive
│   └── pages.css           # dropdown Layanan, hero halaman dalam, template layanan, about
├── js/
│   ├── data.js             # ★ SEMUA KONTEN BISNIS, KONTEN LAYANAN & PATH GAMBAR
│   ├── site-shell.js       # header + dropdown Layanan + drawer + footer (semua halaman)
│   ├── main.js             # beranda: hero, katalog, modal, form, WhatsApp
│   └── pages.js            # render /layanan, /layanan/<slug>, /tentang-kami
├── assets/
│   ├── brand/              # logoburoq.png (logo resmi klien), favicon.svg, logo.svg (placeholder lama)
│   ├── vehicles/           # cutout kendaraan (PNG transparan)
│   └── photos/             # foto jalur tol, kawasan perkantoran, konten informasi
└── README.md
```

**Prinsip pemeliharaan:** setiap konten yang bisa berubah (nama bisnis, nomor kontak, layanan,
kebutuhan, artikel, path gambar) ada di `js/data.js`. Anda cukup mengedit satu file itu —
`index.html` tidak perlu disentuh. Path gambar terpusat di objek `ASSETS`; ubah satu nilai di sana
dan seluruh `<img>` yang memakai `data-asset="…"` ikut berganti.

---

## 4. Halaman & section

### Beranda (`index.html`) — urutan 14 bagian

1. Hero navy — headline komprehensif, slider manual 2 slide, strip kontak (WA / alamat / jam layanan)
2. Pengantar **CV. EN BUROQ TRANSPORTASI** di bawah brand BUROQ TRANS + 4 atribut layanan faktual
3. Banner brand "BUROQ TRANS — SOLUSI TRANSPORTASI" dengan dekorasi emas diagonal
4. Pengantar solusi transportasi — "diatur sesuai kebutuhan Anda" + SUV besar menimpa kartu teks
5. Katalog **7 layanan resmi** (4 + 3, baris kedua terpusat)
6. "Mengapa Memilih Kami?" — 4 benefit
7. Solusi Transportasi untuk Kebutuhan Perusahaan + 4 fitur + foto kawasan perkantoran
8. Transportasi Pariwisata (keluarga, sekolah, komunitas, perusahaan)
9. "Pilihan Layanan" — 2 kartu skenario pemakaian (rombongan & perjalanan dinas)
10. "Solusi Transportasi untuk Berbagai Kebutuhan" — 3 blok navy (menggantikan testimoni)
11. "Mulai dari Diskusi, Bukan Tebakan" — 4 langkah memulai layanan
12. CTA penutup navy "Sedang Mencari Solusi Transportasi?" + armada menumpuk
13. "Solusi Transportasi untuk Berbagai Kebutuhan" — 3 kartu konten informatif + modal
14. Footer navy (brand + nama hukum, menu, 7 layanan, kontak)

### Halaman lain

- `/tentang-kami` — hero + breadcrumb, sekilas perusahaan + kartu informasi (dari `CONFIG`),
  tujuh layanan, kontak (empat nomor WhatsApp, email, jam layanan, alamat), sosial media yang
  URL-nya terverifikasi, dan blok lokasi (iframe Google Maps hanya jika `CONFIG.mapsEmbedUrl` diisi).
- `/layanan` — direktori tujuh layanan berisi kartu tautan ke halaman detail.
- `/layanan/<slug>` — **satu template data-driven** (`js/pages.js`) untuk tujuh URL, diisi dari
  `SERVICES[]`: breadcrumb + hero, deskripsi, daftar penggunaan, tiga manfaat, placeholder foto
  16:9, layanan terkait, dan CTA WhatsApp dengan pesan berisi nama layanan.

> Nested route memakai pola folder `index.html` (`layanan/rental/index.html`), sehingga
> `/layanan/rental/` tetap terbuka saat di-refresh maupun diakses langsung pada static host.
> Jika host memakai URL tanpa trailing slash, aktifkan redirect/rewrite ke `.../index.html`.

---

## 5. Interaksi yang sudah berjalan

- Dropdown **Layanan** berisi "Semua Layanan" + tujuh layanan: hover di desktop, klik/tap tombol
  chevron, `ArrowDown`/`ArrowUp` untuk berpindah item, `Esc` menutup dan mengembalikan fokus,
  serta accordion di drawer mobile
- Header + drawer + footer dirender sekali oleh `js/site-shell.js` untuk semua halaman
- Menu mobile (slide-in + backdrop), scroll-spy navigasi aktif, smooth scroll antar section
- Slider hero manual (panah kiri/kanan, tanpa autoplay)
- Tombol **Konsultasikan Kebutuhan Anda / Tanya Layanan / Diskusikan Kebutuhan Perusahaan /
  Tanya Layanan Pariwisata / Hubungi BUROQ TRANS** membuka formulir inquiry dengan
  **jenis layanan sudah terpilih** sesuai konteks tombolnya
- Formulir inquiry tervalidasi (nama, nomor WhatsApp, jenis layanan, rincian kebutuhan)
  dengan pesan error per-field dan umpan balik sukses
- Tombol **Salin Pesan Inquiry** menyalin pesan berformat ke clipboard
- Modal konten informatif (Baca Selengkapnya), tombol tutup, klik backdrop, dan tombol `Esc`
- Tombol WhatsApp mengambang membuka wa.me dengan pesan pembuka umum
- Ikon sosial media yang URL-nya belum terverifikasi dirender sebagai ikon non-klik
  (bukan tautan mati) dan namanya ditampilkan sebagai teks di bawahnya

### Penting soal WhatsApp

Nomor utama ada di **satu variabel**: `CONFIG.whatsapp` di `js/data.js`, saat ini
`'6281320075918'` (0813-2007-5918). Ubah satu nilai ini untuk memindahkan seluruh CTA.

Empat nomor resmi ditampilkan lengkap di footer, masing-masing sebagai tautan WhatsApp dengan
pesan pembuka yang sudah di-`encodeURIComponent`.

Jika `CONFIG.whatsapp` dikosongkan:

- **tidak ada** `wa.me` yang dibuka (tidak ada kontak palsu yang dikarang)
- submit formulir menyalin pesan inquiry ke clipboard dan menampilkan instruksi
- tombol WhatsApp mengambang membuka formulir inquiry + toast

> Pengiriman formulir = **permintaan informasi (inquiry)**, bukan pemesanan terkonfirmasi.
> Pernyataan ini tampil di dalam modal, di pesan inquiry, dan di umpan balik sukses.

---

## 6. Sumber gambar & lisensi

| Kelompok | Sumber | Catatan lisensi |
| --- | --- | --- |
| Cutout kendaraan (`assets/vehicles/*.png`) | [pngimg.com](https://pngimg.com/images/transport/car) | Halaman lisensi PNG milik pngimg.com — gratis untuk penggunaan pribadi/komersial dengan atribusi. **Ganti dengan foto armada asli klien sebelum live.** |
| `assets/photos/about.jpg` — Jalan Tol Jakarta–Cikampek | Wikimedia Commons, `File:Tol Jakarta-Cikampek.jpg` | CC BY-SA 2.0 |
| `assets/photos/corp.jpg` — kawasan SCBD Jakarta | Wikimedia Commons, `File:SCBD at night.jpg` | Domain publik |
| `assets/photos/info-company.jpg` — panorama kota | Wikimedia Commons, `File:Jakarta Panorama.jpg` | Lisensi bebas |
| `assets/photos/info-group.jpg` — bus pariwisata | Wikimedia Commons, `File:Bus pariwisata tentrem.jpg` | CC BY-SA 4.0 |
| `assets/photos/info-logistik.jpg` — truk logistik | Wikimedia Commons, `File:Hacaca Logistics Hino 500 Ranger (B 9498 FEH).jpg` | CC BY-SA 4.0 |
| Logo resmi klien (`assets/brand/logoburoq.png`) | Disediakan klien | Logo hijau asli dipakai apa adanya; ditampilkan di atas *plate* putih bercincin emas agar tidak bertabrakan dengan palet navy–gold. |
| Favicon (`assets/brand/favicon.svg`) | Turunan dari logo resmi klien | Ikon hijau di dalam kotak navy bercincin emas. `logo.svg` hanya placeholder lama, tidak lagi dipakai. |

Rincian per-file juga tersimpan di `assets/photos/credits.json`. Semua berkas gambar yang dirujuk
markup sudah ada di repo — tidak ada placeholder atau broken image. Foto dipakai sebagai
**materi ilustratif**, bukan klaim area layanan.

---

## 7. Hal yang PERLU dikonfirmasi klien

Nama bisnis, alamat, empat nomor telepon, email, jam operasional, link Google Maps, dan handle
sosial media sudah sesuai brief resmi. Yang masih perlu konfirmasi:

| # | Item | Status saat ini | Lokasi |
| --- | --- | --- | --- |
| 1 | Nomor WhatsApp utama | `6281320075918` (default sementara) | `CONFIG.whatsapp` |
| 2 | Nomor Facebook | hanya nama `Amadsatari` — URL profil belum bisa diverifikasi, jadi **tidak ditautkan** | `SOCIAL_LINKS` |
| 3 | Domain / URL situs | belum disediakan — tidak diklaim di mana pun | — |
| 4 | Foto armada asli | masih memakai cutout stok | `ASSETS.vehicles` |
| 5 | Harga, rute tetap, itinerary | **tidak ditampilkan sama sekali** — sengaja, karena belum ada data resmi | — |
| 6 | Testimoni pelanggan | **tidak ditampilkan** — section 10 dipakai untuk konten kebutuhan transportasi | — |
| 7 | Statistik operasional (jumlah unit, tahun berdiri, dsb.) | **tidak ditampilkan** — strip statistik diisi atribut layanan faktual | `STATS` |
| 8 | Tahun copyright | `2026` | `index.html` footer bar |
| 9 | Ketersediaan armada per layanan | hanya deskripsi umum, belum ada daftar unit | `SERVICES` |
| 10 | URL embed Google Maps | belum ada — iframe disembunyikan, diganti alamat + tautan `mapsUrl` | `CONFIG.mapsEmbedUrl` |
| 11 | Foto tiap layanan | placeholder 16:9 (`.service-photo` / `.svc-photo`) | `SERVICES[].photo` |

Catatan tambahan:

- Klaim yang tidak bisa diverifikasi ("nomor satu", "termurah", "terbaik", "pasti tepat waktu",
  klaim ketersediaan 24 jam) sengaja **tidak dipakai**. Jam layanan ditulis apa adanya:
  **Senin–Sabtu, 08.00–17.00 WIB**.
- Gambar kendaraan adalah **stok cutout**, bukan armada asli. Ganti dengan foto unit milik klien
  (sudut depan, latar transparan) agar tidak menyesatkan calon pelanggan.

---

## 8. Dukungan browser & responsive

Diuji pada lebar **360 / 390 / 768 / 1023 / 1024 / 1280 / 1440 px** pada seluruh halaman
(beranda, tentang kami, direktori layanan, tujuh halaman layanan). Breakpoint utama: `1180`, `1023`, `767`, `479`.

- ≥ 1024 px — hero dua kolom, katalog layanan 4 kolom (baris kedua 3 kartu terpusat), footer 4 kolom
- < 1024 px — menu jadi drawer slide-in, hero menumpuk vertikal, grid jadi 2 kolom
- < 768 px — katalog & benefit 1 kolom, kartu layanan selebar layar, target tap nyaman
- Tidak ada overflow horizontal di 360 & 390 px; menghormati `prefers-reduced-motion`

---

## 9. Aksesibilitas

- Landmark semantik (`header`/`main`/`section`/`footer`), `aria-label` pada kontrol ikon
- `aria-expanded` pada tombol menu, `role="dialog"` + `aria-modal` pada modal
- Fokus keyboard dipulihkan setelah modal ditutup, `Esc` menutup modal, dropdown & menu
- Dropdown memakai `aria-expanded` + `aria-controls`; panah bawah membuka submenu dan memindahkan fokus
- Semua `<img>` memakai `alt` deskriptif
- Kontras teks putih di atas navy dan teks gelap di atas putih memenuhi ambang WCAG AA
# buroq-trans-design
