const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    emotions: {
        type: Object,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
});

module.exports = mongoose.model('Emotion', emotionSchema); 