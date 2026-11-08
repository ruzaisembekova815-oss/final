const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    
    const client = new MongoClient(url);
    
    // Connect to the MongoDB server
    await client.connect();
    
    dbInstance = client.db('giftdb');
    console.log('Successfully connected to MongoDB');
    
    return dbInstance;
}

module.exports = connectToDatabase;