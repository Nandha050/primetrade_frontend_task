require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/auth');
const recipeRoutes = require('./src/routes/recipes');
const authMiddleware = require('./src/middleware/auth');
const connectDB = require('./src/config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    res.status(503).json({
      success: false,
      message: 'Database connection unavailable'
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', authMiddleware, recipeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel (Vercel exports the app)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Chef API Server running on port ${PORT}`);
  });
}

module.exports = app;
