require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const email = 'admin@example.com';
  const password = 'admin123';

  // Cek jika admin sudah ada
  let admin = await User.findOne({ email });
  if (admin) {
    console.log('Admin user already exists!');
    // Delete existing admin to recreate with correct password
    await User.deleteOne({ email });
    console.log('Deleted existing admin user');
  }

  admin = new User({
    nama: 'Admin',
    email,
    password, // Let the pre-save hook handle hashing
    profesi: 'admin',
    jenjang: 'N/A',
    role: 'admin'
  });

  await admin.save();
  console.log('Admin user created!');
  mongoose.disconnect();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
