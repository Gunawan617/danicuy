-- Setup Admin User Script
-- Run this script to create admin user in your database

-- First, create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS cbt_ukom;
USE cbt_ukom;

-- Create admin user with password: admin123
-- Password hash generated with bcrypt (salt rounds: 10)
INSERT INTO users (nama, email, password_hash, profesi, jenjang) VALUES
('Administrator', 'admin@klinikukom.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'bidan', 'D3')
ON DUPLICATE KEY UPDATE
nama = 'Administrator',
password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
profesi = 'bidan',
jenjang = 'D3';

SELECT 'Admin user created successfully!' as message;
SELECT * FROM users WHERE email = 'admin@klinikukom.com';
