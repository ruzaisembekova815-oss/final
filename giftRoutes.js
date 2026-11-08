const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// Route to get all gifts: GET /api/gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.status(200).json(gifts);
    } catch (error) {
        console.error('Error fetching gifts:', error);
        res.status(500).json({ error: 'Failed to fetch gifts' });
    }
});

// Route to get a single gift by ID: GET /api/gifts/:id
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const giftId = req.params.id;
        
        // Find the gift item matching the id field
        const gift = await collection.findOne({ id: giftId });
        
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        
        res.status(200).json(gift);
    } catch (error) {
        console.error('Error fetching gift detail:', error);
        res.status(500).json({ error: 'Failed to fetch gift detail' });
    }
});

module.exports = router;