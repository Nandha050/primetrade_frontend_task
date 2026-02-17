require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const recipeRoutes = require('./src/routes/recipes');
const authMiddleware = require('./src/middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chef-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', authMiddleware, recipeRoutes);

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
