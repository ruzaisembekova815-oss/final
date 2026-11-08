const express = require('express');
const natural = require('natural');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint example using natural for sentiment analysis
app.post('/api/sentiment', (req, res) => {
    const { sentiment } = req.body;
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const tokenizer = new natural.WordTokenizer();
    const analysisResult = analyzer.getSentiment(tokenizer.tokenize(sentiment));
    
    res.status(200).json({ sentimentScore: analysisResult });
});

app.listen(port, () => {
    console.log(`Sentiment microservice running on port ${port}`);
});