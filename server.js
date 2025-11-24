// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');
const adminRoutes = require('./routes/admin');
const annRoutes = require('./routes/announcements');


const path = require('path');
const app = express();


// CORS – allow frontend (GitHub Pages)
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES (correct)
app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/announcements', annRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date() });
});


// Root route: serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server listen
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
