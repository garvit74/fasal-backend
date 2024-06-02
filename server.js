const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./controllers/authController');
const listRoutes = require('./controllers/listController');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = require('./database/connection');
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
