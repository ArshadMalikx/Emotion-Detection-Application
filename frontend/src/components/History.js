import React, { useState } from 'react';
import './History.css';

const History = ({ emotionHistory, isLoading }) => {
  const [filter, setFilter] = useState('all');

  const filteredHistory = emotionHistory.filter(entry => {
    if (filter === 'all') return true;
    const dominantEmotion = Object.entries(entry.emotions).reduce((a, b) => 
      a[1] > b[1] ? a : b
    );
    return dominantEmotion[0] === filter;
  });

  const uniqueEmotions = [...new Set(
    emotionHistory.flatMap(entry => 
      Object.keys(entry.emotions)
    )
  )];

  if (isLoading) {
    return (
      <div className="history-loading">
        <h3>Loading history data...</h3>
      </div>
    );
  }

  return (
    <div className="history">
      <div className="history-header">
        <h2>Emotion History</h2>
        <div className="history-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {uniqueEmotions.map(emotion => (
            <button
              key={emotion}
              className={`filter-btn ${filter === emotion ? 'active' : ''}`}
              onClick={() => setFilter(emotion)}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <div className="history-timeline">
        {filteredHistory.length === 0 ? (
          <div className="history-empty">
            <p>No emotion history available</p>
          </div>
        ) : (
          filteredHistory.map((entry, index) => {
            const dominantEmotion = Object.entries(entry.emotions).reduce((a, b) => 
              a[1] > b[1] ? a : b
            );
            
            return (
              <div key={index} className="timeline-item">
                <div className="timeline-time">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
                <div className="timeline-content">
                  <div className="timeline-emotion">
                    <span className="emotion-icon">
                      {dominantEmotion[0] === 'happy' && '😊'}
                      {dominantEmotion[0] === 'sad' && '😢'}
                      {dominantEmotion[0] === 'angry' && '😠'}
                      {dominantEmotion[0] === 'surprise' && '😲'}
                      {dominantEmotion[0] === 'fear' && '😨'}
                      {dominantEmotion[0] === 'disgust' && '🤢'}
                      {dominantEmotion[0] === 'neutral' && '😐'}
                    </span>
                    <div className="emotion-details">
                      <span className="emotion-name">
                        {dominantEmotion[0]}
                      </span>
                      <span className="emotion-score">
                        {Math.round(dominantEmotion[1])}%
                      </span>
                    </div>
                  </div>
                  <div className="timeline-other-emotions">
                    {Object.entries(entry.emotions)
                      .filter(([emotion]) => emotion !== dominantEmotion[0])
                      .map(([emotion, score]) => (
                        <span key={emotion} className="other-emotion">
                          {emotion}: {Math.round(score)}%
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default History; 