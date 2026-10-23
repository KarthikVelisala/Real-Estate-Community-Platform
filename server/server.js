const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/property', require('./routes/propertyRoutes'));
app.use('/api/propertylisting', require('./routes/propertyListingRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));
app.use('/api/inquiry', require('./routes/inquiryRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/notification', require('./routes/notificationRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Real Estate Community Platform API (India)',
    version: '1.0.0',
    status: 'Active',
    market: 'India (Rupees ₹)'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
const startServer = async () => {
  await connectDB();

  // Auto-seed if database is empty
  try {
    const seed = require('./seed');
    await seed.runSeedIfEmpty();
  } catch (err) {
    console.log('[Seed] Auto-seed check finished:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`[Server] Real Estate Backend running on http://localhost:${PORT}`);
  });
};

startServer();
