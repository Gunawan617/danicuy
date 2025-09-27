# Komponen Frontend Klinik UKOM

Dokumentasi komponen-komponen frontend yang telah dibuat untuk platform Klinik UKOM.

## 📁 Daftar Komponen

### 1. **FAQ.tsx** - Komponen FAQ Interaktif
Komponen Frequently Asked Questions dengan fitur expand/collapse interaktif.

**Fitur:**
- ✅ Expandable FAQ items dengan animasi smooth
- ✅ FAQ pertama terbuka otomatis
- ✅ Support untuk keyboard navigation
- ✅ Contact CTA di bagian bawah
- ✅ Responsive design
- ✅ 12 pertanyaan umum UKOM

**Props:** Tidak ada (data statis)

**Contoh Penggunaan:**
```tsx
import FAQ from './components/FAQ'

export default function Page() {
  return <FAQ />
}
```

---

### 2. **Buku.tsx** - Komponen Koleksi Buku
Tampilan katalog buku UKOM dengan filter kategori.

**Fitur:**
- ✅ Filter berdasarkan kategori (Bidan, Perawat, dll)
- ✅ Card design dengan hover effects
- ✅ Best seller badge
- ✅ Diskon badge dan harga asli/coret
- ✅ Rating dan jumlah ulasan
- ✅ Informasi stok buku
- ✅ Newsletter signup
- ✅ Responsive grid layout

**Props:** Tidak ada (data statis dengan 6 buku contoh)

**Data Buku Termasuk:**
- Judul dan penulis
- Deskripsi dan spesifikasi
- Harga dengan diskon
- Rating dan ulasan
- Kategori dan stok

---

### 3. **Artikel.tsx** - Komponen Blog Artikel
Tampilan artikel/blog dengan fitur pencarian dan filter.

**Fitur:**
- ✅ Featured articles section
- ✅ Search functionality
- ✅ Category filtering
- ✅ Tag system
- ✅ Reading time estimation
- ✅ View counter
- ✅ Responsive card layout
- ✅ Newsletter subscription

**Props:** Tidak ada (data statis dengan 6 artikel)

**Kategori Artikel:**
- Tips & Strategi
- Update Kurikulum
- Panduan
- Teknik Belajar
- Jenis Soal
- Kesehatan Mental

---

### 4. **HomePage.tsx** - Landing Page Lengkap
Komponen utama yang menggabungkan semua section website.

**Fitur:**
- ✅ Fixed navigation header
- ✅ Smooth scroll navigation
- ✅ Active section tracking
- ✅ Scroll to top button
- ✅ Mobile responsive menu
- ✅ SEO optimized structure

**Sections yang Digabung:**
1. Banner/Hero
2. Features
3. Programs/Paket
4. Testimonials
5. Buku/Books
6. Artikel/Articles
7. FAQ
8. CTA/Contact
9. Footer

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-600: #2563eb
--blue-700: #1d4ed8
--blue-100: #dbeafe
--blue-800: #1e40af

/* Gray Scale */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-600: #4b5563
--gray-700: #374151
--gray-900: #111827

/* Accent Colors */
--green-500: #10b981
--green-600: #059669
--yellow-400: #fbbf24
--yellow-500: #f59e0b
--red-500: #ef4444
--red-600: #dc2626
```

### Typography
- **Font Family:** Inter (fallback: system fonts)
- **Headings:** 4xl-6xl untuk hero, xl-2xl untuk section headers
- **Body:** sm-base untuk konten, xs untuk metadata
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Container:** max-w-7xl dengan padding horizontal
- **Sections:** py-16 atau py-20
- **Cards:** p-6 dengan rounded-lg atau rounded-2xl
- **Grid:** gap-6 atau gap-8

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Responsive Classes Used:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `text-sm md:text-base lg:text-lg`
- `hidden md:flex`
- `flex-col sm:flex-row`

---

## 🔧 Setup & Dependencies

### Required Dependencies (sudah tersedia):
```json
{
  "next": "^14.x.x",
  "react": "^18.x.x",
  "tailwindcss": "^3.x.x",
  "lucide-react": "^0.x.x"
}
```

### Import Structure:
```tsx
// Komponen internal
import FAQ from './components/FAQ'
import Buku from './components/Buku'
import Artikel from './components/Artikel'
import HomePage from './components/HomePage'

// Icon dari Lucide React
import { Search, Star, Clock, Eye } from 'lucide-react'
```

---

## 🚀 Penggunaan

### 1. Menggunakan Komponen Individual
```tsx
// pages/faq.tsx
import FAQ from '../components/FAQ'

export default function FAQPage() {
  return <FAQ />
}
```

### 2. Menggunakan HomePage Lengkap
```tsx
// pages/index.tsx
import HomePage from '../components/HomePage'

export default function Home() {
  return <HomePage />
}
```

### 3. Custom Layout dengan Komponen
```tsx
// pages/buku.tsx
import Buku from '../components/Buku'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function BukuPage() {
  return (
    <>
      <Header />
      <Buku />
      <Footer />
    </>
  )
}
```

---

## 📊 Data Structure

### FAQ Data Structure:
```typescript
interface FAQItem {
  id: number
  question: string
  answer: string
}
```

### Buku Data Structure:
```typescript
interface Buku {
  id: number
  judul: string
  penulis: string
  deskripsi: string
  harga: number
  gambar: string
  kategori: string
  halaman: number
  rating: number
  jumlahUlasan: number
  stok: number
  isBestSeller?: boolean
  diskon?: number
}
```

### Artikel Data Structure:
```typescript
interface Artikel {
  id: number
  judul: string
  excerpt: string
  konten: string
  penulis: string
  tanggal: string
  gambar: string
  kategori: string
  waktuBaca: number
  tags: string[]
  featured?: boolean
  jumlahViews: number
}
```

---

## 🎯 Best Practices

### 1. **Performance**
- ✅ Lazy loading untuk gambar
- ✅ Code splitting otomatis Next.js
- ✅ Optimized bundle size

### 2. **Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support

### 3. **SEO**
- ✅ Meta tags optimization
- ✅ Structured data
- ✅ Fast loading times

### 4. **UX/UI**
- ✅ Consistent design system
- ✅ Smooth animations
- ✅ Mobile-first approach
- ✅ Intuitive navigation

---

## 🔄 Future Enhancements

### Potential Improvements:
1. **Dynamic Data**: Integrasi dengan CMS/API untuk konten dinamis
2. **Advanced Search**: Full-text search dengan Algolia
4. **E-commerce**: Shopping cart dan checkout
5. **Analytics**: Google Analytics integration
6. **PWA**: Progressive Web App features
7. **Multilingual**: Support untuk multiple languages
8. **Dark Mode**: Toggle untuk dark/light theme

---

## 📞 Support

Untuk pertanyaan atau dukungan teknis:
- **Email**: support@cbtukom.com
- **Documentation**: [Main README](../README.md)
- **Issues**: GitHub Issues

---

**Versi:** 1.0.0
**Terakhir Update:** Januari 2024
**Kompatibilitas:** Next.js 14+, React 18+

