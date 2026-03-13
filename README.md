# 🌙 Ramadhan Portal - Pusat Panduan Ibadah Ramadhan

Selamat datang di **Ramadhan Portal**, sebuah website multi-page yang dirancang sebagai pusat navigasi utama untuk mengintegrasikan semua fitur dan panduan lengkap ibadah Ramadhan.

## 📋 Gambaran Umum

Ramadhan Portal adalah platform web yang menyediakan informasi lengkap dan praktis tentang:
- 📅 Jadwal Imsakiyah dan Berbuka Puasa
- 📿 Doa-doa Harian sepanjang Ramadhan
- 🌙 Doa Khusus Sahur dan Buka Puasa
- 📚 Artikel-artikel Inspiratif Ramadhan

## 🎨 Fitur Utama

### 1. **Landing Page (index.html)**
- Hero section yang menarik dengan judul dan deskripsi
- Grid fitur dengan card-card interaktif
- Artikel rekomendasi
- Informasi mengapa menggunakan Ramadhan Portal
- Design responsif untuk desktop dan mobile

### 2. **Jadwal Imsakiyah (pages/jadwal.html)**
- Tabel jadwal imsak dan berbuka untuk 5 hari pertama Ramadhan
- Informasi waktu subuh, dzuhur, ashar, maghrib, dan isya
- Tips praktis penggunaan jadwal
- Keterangan warna untuk setiap waktu sholat

### 3. **Doa Harian (pages/doa.html)**
- 6 doa harian pilihan dengan arti dan makna
- Tombol copy untuk memudahkan penyalinan doa
- Desain card yang indah dan mudah dibaca
- Notifikasi toast saat doa berhasil disalin

### 4. **Doa Sahur & Buka Puasa (pages/doa-sahur-buka.html)**
- Doa khusus saat sahur (3 doa)
- Doa khusus saat berbuka puasa (3 doa)
- Tips praktis amalan sahur dan buka
- Penjelasan lengkap untuk setiap doa

### 5. **Navigasi Responsif**
- Navbar sticky dengan logo dan menu
- Hamburger menu untuk mobile
- Active state indicator
- Smooth scrolling

## 📁 Struktur Folder

```
Fronted Ramadhan Challenge 2026/
├── index.html                    # Landing page utama
├── css/
│   └── style.css                # CSS kompleks dengan tema Ramadhan
├── js/
│   └── script.js                # JavaScript untuk navbar dan interaktivitas
├── pages/
│   ├── jadwal.html              # Halaman Jadwal Imsakiyah
│   ├── doa.html                 # Halaman Doa Harian
│   ├── doa-sahur-buka.html      # Halaman Doa Sahur & Buka Puasa
│   ├── todo.html                # (Existing)
│   ├── zakat.html               # (Existing)
│   ├── zikir.html               # (Existing)
│   └── imsakiyah.html           # (Existing)
├── README.md                    # File dokumentasi ini
└── [Other files]
```

## 🎨 Tema Desain

### Palet Warna Ramadhan
- **Hijau Utama**: #1b5e20 (Warna spiritual dan ketakwaan)
- **Emas**: #ffd700 (Kemewahan dan cahaya Ramadhan)
- **Cream**: #fef5e7 (Warna lembut dan hangat)
- **Aksen Hijau**: #2e7d32, #81c784, #388e3c

### Tipografi
- Font Utama: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Font Sekunder: Poppins (Google Fonts)

### Layout & Spacing
- Flexbox dan CSS Grid untuk layout responsif
- Mobile-first approach
- Breakpoints: 768px (tablet), 576px (mobile)

## ✨ Fitur Teknis

### HTML Semantik
- Header, Nav, Main, Section, Footer
- Struktur semantic yang baik untuk SEO
- Accessibility-friendly markup

### CSS Modern
- CSS Variables untuk tema yang konsisten
- Flexbox dan Grid layouts
- Responsive design dengan media queries
- Hover effects dan transitions smooth
- Custom scrollbar styling

### JavaScript Interaktivitas
- Mobile menu toggle dengan hamburger icon
- Active link detection berdasarkan halaman
- Close menu saat klik di luar atau click link
- Smooth scrolling untuk anchor links
- Copy to clipboard functionality

## 🚀 Cara Menggunakan

### Membuka Website
1. Buka file `index.html` di browser
2. Navigasi menggunakan menu di navbar
3. Klik tombol untuk mengakses halaman lain

### Fitur Copy Doa
- Klik tombol "Salin Doa" pada halaman doa
- Doa akan tersalin ke clipboard
- Notifikasi toast akan muncul sebagai konfirmasi

### Responsive Design
- Website responsive di semua ukuran layar
- Hamburger menu muncul di layar mobile (<576px)
- Layout menyesuaikan otomatis

## 📱 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Panduan Navigasi

### Dari Landing Page
- Klik "Jelajahi Fitur Kami" untuk scroll ke fitur
- Klik card fitur untuk pergi ke halaman detail
- Klik "Artikel Ramadhan" untuk scroll ke artikel

### Antar Halaman
- Gunakan navbar untuk navigasi antar halaman
- Logo di navbar mengembali ke home
- Menu mobile (hamburger) untuk navigasi di mobile

## 💡 Tips Penggunaan

1. **Untuk Memaksimalkan Jadwal**: Simpan halaman jadwal di bookmark atau home screen
2. **Untuk Doa**: Gunakan fitur copy untuk mudah berbagi dengan keluarga
3. **Mobile Experience**: Install sebagai web app di home screen (PWA ready)

## 🔧 Customization

Untuk menyesuaikan warna, edit file `css/style.css` di bagian `:root`:

```css
:root {
    --primary-green: #1b5e20;
    --primary-gold: #ffd700;
    --primary-cream: #fef5e7;
    /* ... */
}
```

## 📝 © 2026 Ramadhan Portal

Dibuat dengan ❤️ untuk membantu umat Muslim dalam menjalankan ibadah Ramadhan dengan lebih bermakna.

**Semoga ibadah dan puasa kita diterima oleh Allah SWT.**

*Ramadhan 1447 H - Selamat Menunaikan Ibadah Puasa*

---

**Kontak**: info@ramadhanportal.com | +62 812 3456 7890
