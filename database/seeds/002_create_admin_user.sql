-- Create admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (nama, email, password_hash, profesi, jenjang) VALUES
('Administrator', 'admin@klinikukom.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'bidan', 'D3');

-- Note: The password hash above is for 'admin123'
-- You can generate a new hash using: node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your_password', 10).then(h => console.log(h))"
