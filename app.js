const express = require('express');
const cors = require('cors');

// Import route modules
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes); // Serves /api/search
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the GiftLink API');
});

module.exports = app;