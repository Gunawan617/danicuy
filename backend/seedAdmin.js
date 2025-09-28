require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const email = 'admin@example.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);

  // Cek jika admin sudah ada
  let admin = await User.findOne({ email });
  if (admin) {
    console.log('Admin user already exists!');
    mongoose.disconnect();
    return;
  }

  admin = new User({
    nama: 'Admin',
    email,
    password: hashedPassword,
    profesi: 'admin',
    jenjang: 'admin',
    role: 'admin'
  });

  await admin.save();
  console.log('Admin user created!');
  mongoose.disconnect();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
