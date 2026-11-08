const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// Route to search and filter gifts: GET /api/search
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        
        // Extract query parameters
        const { category, condition, age } = req.query;
        let query = {};
        
        // Filter by category if provided
        if (category) {
            query.category = category;
        }
        
        // Filter by condition if provided
        if (condition) {
            query.condition = condition;
        }
        
        // Filter by age if provided
        if (age) {
            query.age = { $lte: Number(age) };
        }
        
        // Execute the search query
        const results = await collection.find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching gifts:', error);
        res.status(500).json({ error: 'Failed to search gifts' });
    }
});

module.exports = router;