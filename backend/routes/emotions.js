const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');
const auth = require('../middleware/auth');
const { analyzeEmotion } = require('../services/emotionAnalysis');

// Analyze emotion from image
router.post('/analyze', auth, async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const emotions = await analyzeEmotion(image);
        res.json(emotions);
    } catch (error) {
        console.error('Error analyzing emotion:', error);
        res.status(500).json({ message: 'Error analyzing emotion' });
    }
});

// Save emotion data
router.post('/', auth, async (req, res) => {
    try {
        const { emotions } = req.body;
        const emotion = new Emotion({
            userId: req.user.id,
            emotions
        });
        await emotion.save();
        res.status(201).json(emotion);
    } catch (error) {
        console.error('Error saving emotion:', error);
        res.status(500).json({ message: 'Error saving emotion data' });
    }
});

// Get emotion history
router.get('/:userId', auth, async (req, res) => {
    try {
        const { lastTimestamp } = req.query;
        const query = { userId: req.params.userId };
        
        if (lastTimestamp) {
            query.timestamp = { $gt: new Date(lastTimestamp) };
        }

        const emotions = await Emotion.find(query)
            .sort({ timestamp: -1 })
            .limit(50);

        res.json(emotions);
    } catch (error) {
        console.error('Error getting emotion history:', error);
        res.status(500).json({ message: 'Error getting emotion history' });
    }
});

module.exports = router; 