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
- 4 Feature Cards dalam single white frame container:
  - 📅 Jadwal Imsakiyah
  - 📿 Doa Harian
  - ✅ Todo List
  - 💰 Zakat Calculator
- Design responsif dengan 4-column grid layout
- Design responsif untuk desktop dan mobile

### 2. **Jadwal Imsakiyah (pages/jadwal.html)**
- Pemilih kota dengan dropdown interaktif
- Jadwal lengkap 1 bulan Ramadhan
- Informasi waktu subuh, dzuhur, ashar, maghrib, dan isya
- Tips praktis penggunaan jadwal
- Keterangan warna untuk setiap waktu sholat

### 3. **Doa Harian (pages/doa.html)**
- 6 doa harian pilihan dengan arti dan makna
- Tombol copy untuk memudahkan penyalinan doa
- Desain card yang indah dan mudah dibaca
- Notifikasi toast saat doa berhasil disalin

### 4. **Todo List (pages/todo.html)**
- Daftar amalan harian yang dapat ditrack
- Input tambah todo baru
- Checkbox untuk menandai amalan selesai
- Local storage untuk menyimpan progres

### 5. **Zakat Calculator (pages/zakat.html)**
- Kalkulator zakat fitrah dan harta
- Informasi lengkap tentang zakat Ramadhan
- Hasil kalkulasi yang jelas dan terstruktur

### 6. **Zikir Pilihan (pages/zikir.html)**
- Koleksi zikir sepanjang Ramadhan
- Penjelasan dan manfaat setiap zikir
- Audio guide (jika tersedia)

### 7. **Artikel Inspiratif (pages/artikel.html)**
- Artikel-artikel pilihan tentang Ramadhan
- Dengan ilustrasi icon interaktif
- Konten inspiratif dan motivasi

### 8. **Navigasi Responsif**
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
│   ├── jadwal.html              # Halaman Jadwal Imsakiyah (dengan city selector)
│   ├── doa.html                 # Halaman Doa Harian
│   ├── todo.html                # Halaman Todo List
│   ├── zakat.html               # Halaman Zakat Calculator
│   ├── zikir.html               # Halaman Zikir Pilihan
│   └── artikel.html             # Halaman Artikel Inspiratif
├── README.md                    # File dokumentasi ini
└── [Other files]
```

## 🎨 Tema Desain

### Palet Warna Ramadhan
- **Hijau Utama**: #1b5e20 (Warna spiritual dan ketakwaan)
- **Hijau Sekunder**: #2e7d32 (Aksen dan highlight)
- **Emas**: #ffd700 (Kemewahan dan cahaya Ramadhan)
- **Cream**: #fef5e7 (Warna lembut dan hangat)

### Tipografi
- Font Utama: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Font Sekunder: Poppins (Google Fonts)

### Layout & Spacing
- Flexbox dan CSS Grid untuk layout responsif
- Mobile-first approach
- Breakpoints: 768px (tablet), 576px (mobile)
- Feature cards: 4-column fixed grid dengan white container frame

### Design Components
- Feature Cards: Single white frame dengan 4 equal-width cards
- Navigation: Sticky navbar dengan active state detection
- Cards: Cream background dengan gold border on hover
- Icons: FontAwesome 6.4.0 untuk semua icons

## ✨ Fitur Teknis

### HTML Semantik
- Header, Nav, Main, Section, Footer
- Struktur semantic yang baik untuk SEO
- Accessibility-friendly markup

### CSS Modern
- CSS Variables untuk tema yang konsisten (:root dengan --primary-green, --primary-gold, dll)
- Flexbox dan Grid layouts (4-column fixed grid untuk feature cards)
- Responsive design dengan media queries
- Smooth hover effects dan transitions
- Custom scrollbar styling
- Gradient overlays untuk hero section

### JavaScript Interaktivitas
- Mobile menu toggle dengan hamburger icon
- Active link detection berdasarkan halaman
- Close menu saat klik di luar atau click link
- Smooth scrolling untuk anchor links
- Copy to clipboard functionality
- City selector untuk jadwal imsakiyah
- Todo list management dengan localStorage

### FontAwesome Icons
- Integration dengan FontAwesome 6.4.0 CDN
- Icons untuk semua fitur utama
- Icon animations pada hover

## 🚀 Cara Menggunakan

### Membuka Website
1. Buka file `index.html` di browser
2. Navigasi menggunakan menu di navbar
3. Klik card fitur untuk mengakses halaman detail

### Fitur Jadwal Imsakiyah
- Pilih kota dari dropdown selector
- Jadwal lengkap sebulan akan ditampilkan
- Setiap baris menunjukkan waktu-waktu penting untuk hari tersebut

### Fitur Todo List
- Tambahkan amalan baru dengan input form
- Klik checkbox untuk menandai selesai
- Data disimpan di local storage (tetap ada meski browser ditutup)

### Fitur Copy Doa
- Klik tombol "Salin Doa" pada halaman doa
- Doa akan tersalin ke clipboard
- Notifikasi toast akan muncul sebagai konfirmasi

### Responsive Design
- Website responsive di semua ukuran layar
- Hamburger menu muncul di layar mobile (<576px)
- Layout dan spacing menyesuaikan otomatis

## 📱 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Panduan Navigasi

### Dari Landing Page (index.html)
- 4 Feature Cards utama: Jadwal, Doa, Todo, Zakat
- Klik card untuk langsung ke halaman fitur
- Scroll untuk melihat artikel inspiratif
- Logo untuk kembali ke home dari halaman lain

### Navigation Menu
Landing Page / Home
├── 📅 Jadwal Imsakiyah
├── 📿 Doa Harian
├── ✅ Todo List
├── 💰 Zakat
├── 🌙 Zikir
└── 📚 Artikel

### Antar Halaman
- Gunakan navbar di setiap halaman untuk navigasi
- Logo di navbar mengembali ke home
- Menu mobile (hamburger) tersedia untuk navigasi di mobile
- Semua halaman memiliki navbar konsisten

## 💡 Tips Penggunaan

1. **Maksimalkan Jadwal**: Pilih kota Anda dan simpan halaman di bookmark
2. **Tracking Amalan**: Gunakan Todo List untuk track amalan harian
3. **Zakat Calculator**: Hitung zakat Anda dengan akurat di halaman Zakat
4. **Doa Harian**: Gunakan fitur copy untuk mudah berbagi dengan keluarga
5. **Zikir Pilihan**: Baca zikir-zikir pilihan sesuai waktu Ramadhan
6. **Artikel**: Baca artikel inspiratif untuk motivasi ibadah
7. **Mobile Experience**: Website fully responsive, cocok digunakan di mobile
8. **PWA Ready**: Bisa ditambahkan ke home screen device

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

## 📝 Status Proyek

### ✅ Selesai
- Landing page dengan 4 feature cards
- Jadwal Imsakiyah dengan city selector (1 bulan lengkap)
- Halaman Doa Harian dengan copy functionality
- Todo List dengan localStorage persistence
- Zakat Calculator
- Zikir Pilihan
- Artikel Inspiratif
- Responsive navbar dengan active state
- Mobile-friendly design
- FontAwesome icon integration

### 🎨 Design Updates
- Feature cards unified dalam single white frame container
- 4-column fixed grid layout di desktop
- Responsive design untuk tablet dan mobile
- Smooth animations dan hover effects
- Consistent color scheme dan typography

## 📝 © 2026 Ramadhan Portal

Dibuat dengan ❤️ untuk membantu umat Muslim dalam menjalankan ibadah Ramadhan dengan lebih bermakna.

**Semoga ibadah dan puasa kita diterima oleh Allah SWT.**

*Ramadhan 1447 H - Selamat Menunaikan Ibadah Puasa*
