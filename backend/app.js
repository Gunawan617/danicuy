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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(bodyParser.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
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
