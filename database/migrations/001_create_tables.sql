-- Create database if not exists
CREATE DATABASE IF NOT EXISTS cbt_ukom;

-- Use the database
USE cbt_ukom;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profesi ENUM('bidan', 'perawat') NOT NULL,
  jenjang ENUM('D3', 'D4-S1') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Paket table
CREATE TABLE IF NOT EXISTS paket (
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

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
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

-- Kategori table
CREATE TABLE IF NOT EXISTS kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profesi ENUM('bidan', 'perawat') NOT NULL,
  jenjang ENUM('D3', 'D4-S1') NOT NULL,
  nama VARCHAR(255) NOT NULL,
  bobot DECIMAL(5,2) DEFAULT 1.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Soal table
CREATE TABLE IF NOT EXISTS soal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kategori_id INT NOT NULL,
  profesi ENUM('bidan', 'perawat') NOT NULL,
  jenjang ENUM('D3', 'D4-S1') NOT NULL,
  pertanyaan TEXT NOT NULL,
  opsi_a TEXT,
  opsi_b TEXT,
  opsi_c TEXT,
  opsi_d TEXT,
  jawaban_benar CHAR(1) NOT NULL,
  pembahasan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id)
);

-- Exam sessions table
CREATE TABLE IF NOT EXISTS exam_session (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  paket_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  score DECIMAL(5,2),
  status ENUM('ongoing', 'completed', 'abandoned') DEFAULT 'ongoing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (paket_id) REFERENCES paket(id)
);

-- Exam session questions table
CREATE TABLE IF NOT EXISTS exam_session_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  soal_id INT NOT NULL,
  jawaban_user CHAR(1),
  is_correct BOOLEAN,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES exam_session(id),
  FOREIGN KEY (soal_id) REFERENCES soal(id)
);
