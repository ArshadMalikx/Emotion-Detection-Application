import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './WebcamCapture.css';

const WebcamCapture = ({ onEmotionUpdate }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [emotions, setEmotions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const captureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      setIsLoading(true);
      // Convert canvas to base64
      const imageData = canvas.toDataURL('image/jpeg');

      // Send to backend for analysis
      const response = await axios.post('http://localhost:5000/api/emotions/analyze', {
        image: imageData
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update local state with emotion data
      setEmotions(response.data);
      
      // Call the callback with the emotion data
      if (onEmotionUpdate) {
        onEmotionUpdate(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error analyzing emotion: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(captureAndSend, 3000); // Capture every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStreaming]);

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      angry: '😠',
      disgust: '🤢',
      fear: '😨',
      happy: '😊',
      sad: '😢',
      surprise: '😲',
      neutral: '😐'
    };
    return emojis[emotion] || '❓';
  };

  return (
    <div className="webcam-container">
      {error && <div className="error-message">{error}</div>}
      <div className="webcam-wrapper">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', maxWidth: '640px' }}
        />
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Analyzing emotions...</p>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="emotions-display">
        <h3>Detected Emotions</h3>
        <div className="emotions-grid">
          {Object.entries(emotions).map(([emotion, score]) => (
            <div key={emotion} className="emotion-card">
              <div className="emotion-icon">
                {getEmotionEmoji(emotion)}
              </div>
              <div className="emotion-info">
                <span className="emotion-name">{emotion}</span>
                <div className="emotion-bar">
                  <div 
                    className="emotion-progress" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <span className="emotion-score">{score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;