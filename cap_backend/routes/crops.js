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
    { id: 1, name: "rice", emoji: "🌾", category: "Cereal" },
    { id: 2, name: "maize", emoji: "🌽", category: "Cereal" },
    { id: 3, name: "jute", emoji: "🌿", category: "Fiber" },
    { id: 4, name: "cotton", emoji: "🌸", category: "Fiber" },
    { id: 5, name: "coconut", emoji: "🥥", category: "Plantation" },
    { id: 6, name: "papaya", emoji: "🍈", category: "Fruit" },
    { id: 7, name: "orange", emoji: "🍊", category: "Fruit" },
    { id: 8, name: "apple", emoji: "🍎", category: "Fruit" },
    { id: 9, name: "muskmelon", emoji: "🍑", category: "Fruit" },
    { id: 10, name: "watermelon", emoji: "🍉", category: "Fruit" },
    { id: 11, name: "grapes", emoji: "🍇", category: "Fruit" },
    { id: 12, name: "mango", emoji: "🥭", category: "Fruit" },
    { id: 13, name: "banana", emoji: "🍌", category: "Fruit" },
    { id: 14, name: "pomegranate", emoji: "🌺", category: "Fruit" },
    { id: 15, name: "lentil", emoji: "🫘", category: "Pulse" },
    { id: 16, name: "blackgram", emoji: "🫘", category: "Pulse" },
    { id: 17, name: "mungbean", emoji: "🫘", category: "Pulse" },
    { id: 18, name: "mothbeans", emoji: "🫘", category: "Pulse" },
    { id: 19, name: "pigeonpeas", emoji: "🫘", category: "Pulse" },
    { id: 20, name: "kidneybeans", emoji: "🫘", category: "Pulse" },
    { id: 21, name: "chickpea", emoji: "🫘", category: "Pulse" },
    { id: 22, name: "coffee", emoji: "☕", category: "Plantation" }
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
