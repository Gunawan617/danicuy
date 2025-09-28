const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/jwt'); // Correctly import SECRET

// Register new user
exports.register = async (req, res) => {
    const { nama, email, password, profesi, jenjang } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            nama,
            email,
            password: hashedPassword,
            profesi,
            jenjang,
            role: 'user' // default role
        });

        await user.save();

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
        res.status(201).json({ 
            token,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                profesi: user.profesi,
                jenjang: user.jenjang
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
        res.json({ 
            token,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                profesi: user.profesi,
                jenjang: user.jenjang
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    // req.user is attached by authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper to expose secret for JWT middleware
exports.SECRET = SECRET;
