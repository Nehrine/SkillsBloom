const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary in-memory storage for users and sessions
let users = [];
let sessions = [];

// Route to serve homepage
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Handle user registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ name, email, password });
    res.status(201).json({ message: 'Registration successful' });
});

// Handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
});

// Schedule a learning session
app.post('/schedule', (req, res) => {
    const { topic, date, time, videoURL } = req.body;
    if (!topic || !date || !time || !videoURL) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    sessions.push({ topic, date, time, videoURL });
    res.status(201).json({ message: 'Session scheduled successfully' });
});

// Get scheduled sessions
app.get('/sessions', (req, res) => {
    res.json(sessions);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
