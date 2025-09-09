# 🛠️ Admin Panel - Klinik UKOM

Panduan lengkap untuk mengakses dan menggunakan Admin Panel Klinik UKOM.

## 🚀 **Cara Mengakses Admin Panel**

### 1. **Persiapan Database**
Pastikan Anda telah menjalankan script setup admin user:

```bash
# Jalankan script setup admin
mysql -u [username] -p < database/setup-admin.sql
```

Atau jalankan query manual:
```sql
USE cbt_ukom;
INSERT INTO users (nama, email, password_hash, profesi, jenjang) VALUES
('Administrator', 'admin@klinikukom.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'bidan', 'D3');
```

### 2. **Login ke Admin Panel**

#### **Langkah-langkah:**
1. **Buka website:** `http://localhost:3001` (Frontend)
2. **Klik "Masuk"** di header website
3. **Masukkan kredensial admin:**
   - **Email:** `admin@klinikukom.com`
   - **Password:** `admin123`
4. **Klik "Masuk"**
5. **Setelah login, klik "Admin Panel"** di header

#### **Atau akses langsung:**
```
http://localhost:3001/admin
```

## 🔑 **Kredensial Admin Default**

| Field | Value |
|-------|-------|
| Email | `admin@klinikukom.com` |
| Password | `admin123` |
| Role | Administrator |

## 📊 **Fitur Admin Panel**

### 1. **Dashboard**
- **Total Users:** Jumlah total pengguna terdaftar
- **Active Sessions:** Jumlah sesi ujian yang sedang berlangsung
- **Completed Exams:** Jumlah ujian yang telah selesai
- **Paket Terpopuler:** Ranking paket berdasarkan jumlah pemesanan

### 2. **Manajemen User**
- **Melihat semua user** yang terdaftar
- **Informasi lengkap:** Nama, Email, Profesi, Jenjang, Tanggal Daftar
- **Actions:** Edit dan Hapus user (UI siap, backend perlu dikembangkan)

### 3. **Manajemen Paket**
- **Melihat semua paket** yang tersedia
- **Informasi paket:** Nama, Profesi, Jenjang, Durasi, Harga, Fitur
- **Actions:** Tambah, Edit, dan Hapus paket (UI siap, backend perlu dikembangkan)

### 4. **Bank Soal** (UI Ready)
- **Manajemen soal ujian**
- **Kategori dan pembagian soal**
- **CRUD operations untuk soal**

### 5. **Verifikasi Order** (UI Ready)
- **Melihat pesanan pending**
- **Verifikasi pembayaran**
- **Approve/reject order**

### 6. **Laporan & Statistik** (UI Ready)
- **Laporan keuangan**
- **Statistik performa**
- **Analytics dashboard**

## 🛠️ **Development Notes**

### **API Endpoints Admin:**
- `GET /api/admin/stats` - Statistik dashboard
- `GET /api/admin/users` - List semua users
- `POST /api/admin/users` - Tambah user baru
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Hapus user
- `GET /api/admin/orders` - List orders
- `PATCH /api/admin/orders/:id/verify` - Verifikasi order

### **Security Considerations:**
- ✅ JWT Authentication
- ✅ Password hashing dengan bcrypt
- ⚠️ **TODO:** Role-based access control
- ⚠️ **TODO:** Admin-specific middleware
- ⚠️ **TODO:** Input validation & sanitization

### **Next Steps:**
1. **Implementasi CRUD operations** untuk semua fitur admin
2. **Role-based authentication** (admin, user, moderator)
3. **Audit logging** untuk tracking admin actions
4. **File upload** untuk gambar paket dan soal
5. **Export data** ke Excel/PDF
6. **Real-time notifications** untuk new orders

## 🚨 **Important Security Notes**

1. **Ganti password default** segera setelah setup
2. **Gunakan HTTPS** di production
3. **Implementasi rate limiting** untuk API calls
4. **Regular backup** database
5. **Monitor logs** untuk suspicious activities

## 📞 **Troubleshooting**

### **Tidak bisa login admin:**
1. Pastikan database sudah di-setup dengan user admin
2. Cek kredensial login (case-sensitive)
3. Cek koneksi database di backend
4. Cek JWT secret di environment variables

### **API Error:**
1. Pastikan backend server running di port 3002
2. Cek CORS settings
3. Verify database connection
4. Check API endpoint URLs

### **UI tidak loading:**
1. Clear browser cache
2. Check console untuk JavaScript errors
3. Verify API responses
4. Check network tab untuk failed requests

---

**📧 Support:** Jika ada pertanyaan atau masalah, hubungi tim development.
