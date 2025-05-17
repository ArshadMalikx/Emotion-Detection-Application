const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

// Function to convert base64 to image file
async function base64ToImage(base64String) {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const tempFilePath = path.join(__dirname, '../temp', `temp-${Date.now()}.jpg`);

    // Ensure temp directory exists
    if (!fs.existsSync(path.join(__dirname, '../temp'))) {
        fs.mkdirSync(path.join(__dirname, '../temp'), { recursive: true });
    }

    await writeFileAsync(tempFilePath, imageBuffer);
    return tempFilePath;
}

// Function to analyze emotion
async function analyzeEmotion(base64Image) {
    // For now, return mock emotion data
    // In a real implementation, you would use a proper emotion detection library
    const emotions = {
        angry: Math.random() * 0.2,
        disgust: Math.random() * 0.1,
        fear: Math.random() * 0.15,
        happy: Math.random() * 0.8,
        sad: Math.random() * 0.2,
        surprise: Math.random() * 0.3,
        neutral: Math.random() * 0.5
    };

    // Normalize the values
    const total = Object.values(emotions).reduce((sum, val) => sum + val, 0);
    Object.keys(emotions).forEach(key => {
        emotions[key] = Math.round((emotions[key] / total) * 100);
    });

    return emotions;
}

module.exports = {
    analyzeEmotion
}; 