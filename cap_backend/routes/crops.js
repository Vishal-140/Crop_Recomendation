const express = require('express');
const router = express.Router();

/**
 * Crops data — strictly from Crop_recommendation dataset.csv label column.
 * Dataset has 22 unique crop labels, 100 samples each, 2200 total.
 * The 'category' field is a display helper but does NOT exist in the dataset CSV.
 * Only the crop 'name' values (e.g. "rice", "maize") are from the actual dataset.
 * Emojis match the project specification exactly.
 */
const CROPS = [
    { id: 1, name: "rice", category: "Cereal" },
    { id: 2, name: "maize", category: "Cereal" },
    { id: 3, name: "jute", category: "Fiber" },
    { id: 4, name: "cotton", category: "Fiber" },
    { id: 5, name: "coconut", category: "Plantation" },
    { id: 6, name: "papaya", category: "Fruit" },
    { id: 7, name: "orange", category: "Fruit" },
    { id: 8, name: "apple", category: "Fruit" },
    { id: 9, name: "muskmelon", category: "Fruit" },
    { id: 10, name: "watermelon", category: "Fruit" },
    { id: 11, name: "grapes", category: "Fruit" },
    { id: 12, name: "mango", category: "Fruit" },
    { id: 13, name: "banana", category: "Fruit" },
    { id: 14, name: "pomegranate", category: "Fruit" },
    { id: 15, name: "lentil", category: "Pulse" },
    { id: 16, name: "blackgram", category: "Pulse" },
    { id: 17, name: "mungbean", category: "Pulse" },
    { id: 18, name: "mothbeans", category: "Pulse" },
    { id: 19, name: "pigeonpeas", category: "Pulse" },
    { id: 20, name: "kidneybeans", category: "Pulse" },
    { id: 21, name: "chickpea", category: "Pulse" },
    { id: 22, name: "coffee", category: "Plantation" }
];

// GET /api/crops — all 22 crops from dataset
router.get('/crops', (req, res) => {
    res.json({ total: CROPS.length, crops: CROPS });
});

// GET /api/crops/category/:category
router.get('/crops/category/:category', (req, res) => {
    const filtered = CROPS.filter(
        c => c.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json({ total: filtered.length, crops: filtered });
});

module.exports = router;
