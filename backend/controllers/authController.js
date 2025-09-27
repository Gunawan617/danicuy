const users = require('../data/users');
const jwt = require('jsonwebtoken');
const SECRET = "express_banner_jwt_secret_key"; // In production use env var

// Register new user
exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    const user = { id: users.length + 1, username, password };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully.' });
};

// Login user
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '2h' });
    res.json({ token });
};

// Helper to expose secret for JWT middleware
exports.SECRET = SECRET;
