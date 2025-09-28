require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Opsi usang dihapus
    console.log('Connected to MongoDB for seeding.');

    const adminEmail = 'admin@example.com';

    // Hapus admin lama jika ada, untuk memastikan data bersih
    await User.deleteOne({ email: adminEmail });
    console.log('Old admin user (if any) has been removed.');

    // Buat user admin baru dengan password teks biasa
    // Model User akan mengenkripsi secara otomatis
    const adminUser = new User({
      nama: 'Admin User',
      email: adminEmail,
      password: 'password123', // <-- Password teks biasa
      profesi: 'admin',
      jenjang: 'N/A',
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('--- LOGIN CREDENTIALS ---');
    console.log('Email: admin@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedAdmin();