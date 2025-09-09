# CBT UKOM - Sistem Ujian Kompetensi

Sistem CBT (Computer Based Test) untuk UKOM (Ujian Kompetensi) Bidan dan Perawat yang terintegrasi dengan database MySQL dan menggunakan Nuxt.js sebagai backend API.

## 📋 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Persiapan Lingkungan](#-persiapan-lingkungan)
- [Instalasi](#-instalasi)
- [Konfigurasi Database](#-konfigurasi-database)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🚀 Fitur Utama

- ✅ **Autentikasi User** (Login/Register)
- ✅ **Manajemen Paket CBT** (Bidan D3/D4-S1, Perawat D3/D4-S1)
- ✅ **Sistem Pembelian** dengan upload bukti transfer
- ✅ **Interface CBT** dengan timer dan navigasi soal
- ✅ **Admin Panel** untuk manajemen data
- ✅ **Dashboard User** untuk tracking progress
- ✅ **Sistem Scoring** dan hasil ujian

## 🛠 Teknologi

### Backend
- **Framework**: Nuxt.js 3
- **Database**: MySQL 8.0
- **ORM**: Direct SQL queries with mysql2
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Custom SVG icons

### Tools
- **Testing**: Jest/Vitest
- **Linting**: ESLint
- **Container**: Docker & Docker Compose

## 💻 Persiapan Lingkungan

### Prerequisites
- Node.js >= 18.0.0
- MySQL >= 8.0
- Docker & Docker Compose (opsional)

### Environment Variables
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=cbt_ukom

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# App Configuration
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/your-username/cbt-ukom.git
cd cbt-ukom
```

### 2. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies (jika terpisah)
cd ../src
npm install
```

### 3. Setup Database
```bash
# Import database schema
mysql -u root -p < database/migrations/001_create_tables.sql

# Import seed data
mysql -u root -p < database/seeds/001_seed_data.sql
```

### 4. Run Development Server
```bash
# Backend
cd backend
npm run dev

# Frontend (terminal baru)
cd src
npm run dev
```

## 🗄 Konfigurasi Database

### Tables Overview

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profesi ENUM('bidan', 'perawat') NOT NULL,
  jenjang ENUM('D3', 'D4-S1') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Paket Table
```sql
CREATE TABLE paket (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  profesi ENUM('bidan', 'perawat') NOT NULL,
  jenjang ENUM('D3', 'D4-S1') NOT NULL,
  durasi_bulan INT NOT NULL,
  harga DECIMAL(10,2) NOT NULL,
  fitur TEXT,
  jumlah_soal INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  paket_id INT NOT NULL,
  status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  bukti_transfer VARCHAR(255),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (paket_id) REFERENCES paket(id)
);
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register new user account.

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profesi": "bidan",
  "jenjang": "D3"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "profesi": "bidan",
    "jenjang": "D3"
  }
}
```

#### POST `/api/auth/login`
Authenticate user login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "profesi": "bidan",
    "jenjang": "D3"
  }
}
```

### Package Management Endpoints

#### GET `/api/paket`
Get all available packages.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Paket CBT Bidan D3 3 Bulan",
      "profesi": "bidan",
      "jenjang": "D3",
      "durasi_bulan": 3,
      "harga": 150000.00,
      "fitur": "Review pembahasan, Timer CBT, Autosave",
      "jumlah_soal": 100
    }
  ]
}
```

#### GET `/api/paket/filtered`
Get packages filtered by profession and level.

**Query Parameters:**
- `profesi`: bidan | perawat
- `jenjang`: D3 | D4-S1

**Example:** `/api/paket/filtered?profesi=bidan&jenjang=D3`

### Order Management Endpoints

#### POST `/api/orders`
Create new order/purchase.

**Request Body:**
```json
{
  "user_id": 1,
  "paket_id": 1,
  "bukti_transfer": "base64_encoded_image"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order_id": 1
}
```

#### GET `/api/admin/orders/pending`
Get all pending orders (Admin only).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "paket_id": 1,
      "status": "pending",
      "bukti_transfer": "path/to/image.jpg",
      "start_date": null,
      "end_date": null,
      "created_at": "2024-01-01T00:00:00.000Z",
      "user": {
        "nama": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

#### PATCH `/api/admin/orders/verify`
Verify or reject order (Admin only).

**Request Body:**
```json
{
  "order_id": 1,
  "status": "verified"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

### Question Management Endpoints

#### GET `/api/soal/random`
Get random questions for CBT session.

**Query Parameters:**
- `limit`: number of questions (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "soal": "Pertanyaan CBT...",
      "pilihan_a": "Jawaban A",
      "pilihan_b": "Jawaban B",
      "pilihan_c": "Jawaban C",
      "pilihan_d": "Jawaban D",
      "jawaban_benar": "a"
    }
  ]
}
```

#### GET `/api/admin/soal`
Get all questions (Admin only).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "kategori_id": 1,
      "profesi": "bidan",
      "jenjang": "D3",
      "soal": "Pertanyaan...",
      "pilihan_a": "Jawaban A",
      "pilihan_b": "Jawaban B",
      "pilihan_c": "Jawaban C",
      "pilihan_d": "Jawaban D",
      "jawaban_benar": "a",
      "pembahasan": "Pembahasan jawaban...",
      "kategori": {
        "nama": "Dasar Kebidanan"
      }
    }
  ]
}
```

#### POST `/api/admin/soal`
Create new question (Admin only).

**Request Body:**
```json
{
  "kategori_id": 1,
  "profesi": "bidan",
  "jenjang": "D3",
  "soal": "Pertanyaan baru...",
  "pilihan_a": "Jawaban A",
  "pilihan_b": "Jawaban B",
  "pilihan_c": "Jawaban C",
  "pilihan_d": "Jawaban D",
  "jawaban_benar": "a",
  "pembahasan": "Penjelasan jawaban..."
}
```

### Exam Session Endpoints

#### POST `/api/exam/start`
Start new exam session.

**Request Body:**
```json
{
  "user_id": 1,
  "paket_id": 1,
  "soal_ids": [1, 2, 3, 4, 5]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exam session started",
  "session_id": 1
}
```

#### POST `/api/exam/submit`
Submit exam answers and calculate score.

**Request Body:**
```json
{
  "session_id": 1,
  "answers": [
    {"soal_id": 1, "jawaban": "a"},
    {"soal_id": 2, "jawaban": "b"}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exam submitted successfully",
  "score": 85.5,
  "total_questions": 50,
  "correct_answers": 43
}
```

#### GET `/api/exam/review`
Get exam review with correct answers.

**Query Parameters:**
- `session_id`: exam session ID

### User Management Endpoints

#### GET `/api/user/exam-history`
Get user's exam history.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "paket_id": 1,
      "start_time": "2024-01-01T10:00:00.000Z",
      "end_time": "2024-01-01T11:00:00.000Z",
      "score": 85.5,
      "status": "completed",
      "paket": {
        "nama": "Paket CBT Bidan D3 3 Bulan"
      }
    }
  ]
}
```

#### GET `/api/user/packages`
Get user's active packages.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "paket_id": 1,
      "start_date": "2024-01-01",
      "end_date": "2024-04-01",
      "paket": {
        "nama": "Paket CBT Bidan D3 3 Bulan",
        "durasi_bulan": 3,
        "harga": 150000.00
      }
    }
  ]
}
```

### Admin Endpoints

#### GET `/api/admin/stats`
Get admin dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_users": 150,
    "total_orders": 45,
    "pending_orders": 12,
    "total_questions": 1200,
    "revenue": 6750000.00
  }
}
```

#### GET `/api/admin/users`
Get all users (Admin only).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "John Doe",
      "email": "john@example.com",
      "profesi": "bidan",
      "jenjang": "D3",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/admin/paket`
Create new package (Admin only).

**Request Body:**
```json
{
  "nama": "Paket CBT Baru",
  "profesi": "bidan",
  "jenjang": "D3",
  "durasi_bulan": 6,
  "harga": 250000.00,
  "fitur": "Fitur baru",
  "jumlah_soal": 150
}
```

## 🧪 Testing

### Unit Tests
```bash
# Run backend tests
cd backend
npm test

# Run with coverage
npm run test:coverage
```

### API Tests
```bash
# Test all endpoints
npm run test:api

# Test specific endpoint
npm run test:auth
npm run test:orders
npm run test:questions
```

### Test Files Structure
```
backend/
├── tests/
│   ├── unit/
│   │   ├── auth.test.js
│   │   ├── orders.test.js
│   │   ├── questions.test.js
│   │   └── utils.test.js
│   ├── integration/
│   │   ├── api.test.js
│   │   └── database.test.js
│   └── fixtures/
│       ├── test-data.json
│       └── mock-users.json
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Setup for Production
```bash
# Copy environment file
cp .env.example .env

# Edit with production values
nano .env
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   # Check MySQL service
   sudo systemctl status mysql

   # Test connection
   mysql -u root -p -e "SELECT 1"
   ```

2. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in environment
   - Check token expiration (default: 7 days)

3. **File Upload Issues**
   - Check upload directory permissions
   - Verify file size limits in configuration

## 📞 Support

For support and questions:
- Email: support@cbtukom.com
- Documentation: [API Docs](./docs/api.md)
- Issues: [GitHub Issues](https://github.com/your-username/cbt-ukom/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Last Updated:** January 2024
**Version:** 1.0.0