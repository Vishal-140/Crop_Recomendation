require('dotenv').config();
const express = require('express');
const cors = require('cors');
const predictRoute = require('./routes/predict');
const cropsRoute = require('./routes/crops');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api', predictRoute);
app.use('/api', cropsRoute);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Crop Recommendation API is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`🌾 Crop Recommendation API running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;