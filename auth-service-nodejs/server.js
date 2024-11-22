// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Database connection error:', err));