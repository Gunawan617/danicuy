console.log('Loaded app.js from', __dirname);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bannersRoutes = require('./routes/banners');
const tryoutRoutes = require('./routes/tryout');
const bimbelRoutes = require('./routes/bimbel');
const articleRoutes = require('./routes/articles');
const bookRoutes = require('./routes/books');
const faqRoutes = require('./routes/faqs');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update if your frontend runs elsewhere
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
console.log('Auth routes registered');
app.use('/api/banners', bannersRoutes);
app.use('/api/tryout', tryoutRoutes);
app.use('/api/bimbel', bimbelRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/faqs', faqRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend running'});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
