const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login route utilizing collection.findOne
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        
        // Locate the current user in the database using findOne
        const theUser = await collection.findOne({ email: req.body.email });

        if (theUser) {
            const passwordMatch = await bcrypt.compare(req.body.password, theUser.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            let payload = {
                user: {
                    id: theUser._id.toString(),
                },
            };

            const authtoken = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret');
            return res.status(200).json({ 
                authtoken, 
                userName: theUser.firstName, 
                userEmail: theUser.email 
            });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;