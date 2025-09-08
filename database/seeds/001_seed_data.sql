-- Seed data for paket
INSERT INTO paket (nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal) VALUES
('Paket CBT Bidan D3 3 Bulan', 'bidan', 'D3', 3, 150000.00, 'Review pembahasan, Timer CBT, Autosave', 100),
('Paket CBT Bidan D3 6 Bulan', 'bidan', 'D3', 6, 250000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress', 200),
('Paket CBT Bidan D3 9 Bulan', 'bidan', 'D3', 9, 350000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian', 300),
('Paket CBT Bidan D3 12 Bulan', 'bidan', 'D3', 12, 450000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian, Konsultasi online', 400),

('Paket CBT Bidan D4-S1 3 Bulan', 'bidan', 'D4-S1', 3, 200000.00, 'Review pembahasan, Timer CBT, Autosave', 120),
('Paket CBT Bidan D4-S1 6 Bulan', 'bidan', 'D4-S1', 6, 320000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress', 240),
('Paket CBT Bidan D4-S1 9 Bulan', 'bidan', 'D4-S1', 9, 450000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian', 360),
('Paket CBT Bidan D4-S1 12 Bulan', 'bidan', 'D4-S1', 12, 580000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian, Konsultasi online', 480),

('Paket CBT Perawat D3 3 Bulan', 'perawat', 'D3', 3, 150000.00, 'Review pembahasan, Timer CBT, Autosave', 100),
('Paket CBT Perawat D3 6 Bulan', 'perawat', 'D3', 6, 250000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress', 200),
('Paket CBT Perawat D3 9 Bulan', 'perawat', 'D3', 9, 350000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian', 300),
('Paket CBT Perawat D3 12 Bulan', 'perawat', 'D3', 12, 450000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian, Konsultasi online', 400),

('Paket CBT Perawat D4-S1 3 Bulan', 'perawat', 'D4-S1', 3, 200000.00, 'Review pembahasan, Timer CBT, Autosave', 120),
('Paket CBT Perawat D4-S1 6 Bulan', 'perawat', 'D4-S1', 6, 320000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress', 240),
('Paket CBT Perawat D4-S1 9 Bulan', 'perawat', 'D4-S1', 9, 450000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian', 360),
('Paket CBT Perawat D4-S1 12 Bulan', 'perawat', 'D4-S1', 12, 580000.00, 'Review pembahasan, Timer CBT, Autosave, Laporan progress, Simulasi ujian, Konsultasi online', 480);

-- Seed data for kategori
INSERT INTO kategori (profesi, jenjang, nama, bobot) VALUES
-- Bidan D3
('bidan', 'D3', 'Dasar Kebidanan', 1.00),
('bidan', 'D3', 'Kehamilan Fisiologis', 1.00),
('bidan', 'D3', 'Persalinan Normal', 1.00),
('bidan', 'D3', 'Nifas & Laktasi', 1.00),
('bidan', 'D3', 'Bayi Baru Lahir Normal', 1.00),
('bidan', 'D3', 'Kesehatan Reproduksi Dasar', 1.00),

-- Bidan D4-S1
('bidan', 'D4-S1', 'Kehamilan Risiko Tinggi', 1.00),
('bidan', 'D4-S1', 'Persalinan dengan Komplikasi', 1.00),
('bidan', 'D4-S1', 'Neonatus Risiko Tinggi', 1.00),
('bidan', 'D4-S1', 'Ginekologi & Fertilitas', 1.00),
('bidan', 'D4-S1', 'Kesehatan Reproduksi Lanjut', 1.00),
('bidan', 'D4-S1', 'Manajemen & Kebijakan Kesehatan Ibu Anak', 1.00),

-- Perawat D3
('perawat', 'D3', 'Keperawatan Dasar', 1.00),
('perawat', 'D3', 'Keperawatan Medikal Bedah Dasar', 1.00),
('perawat', 'D3', 'Keperawatan Anak (Basic)', 1.00),
('perawat', 'D3', 'Keperawatan Jiwa (Basic)', 1.00),
('perawat', 'D3', 'Keperawatan Maternitas (Basic)', 1.00),
('perawat', 'D3', 'Keperawatan Komunitas', 1.00),

-- Perawat D4-S1
('perawat', 'D4-S1', 'Keperawatan Medikal Bedah Lanjut', 1.00),
('perawat', 'D4-S1', 'Keperawatan Anak Lanjut', 1.00),
('perawat', 'D4-S1', 'Keperawatan Jiwa Lanjut', 1.00),
('perawat', 'D4-S1', 'Keperawatan Gawat Darurat', 1.00),
('perawat', 'D4-S1', 'Keperawatan Manajemen & Komunitas', 1.00),
('perawat', 'D4-S1', 'Etika & Riset Keperawatan', 1.00);
