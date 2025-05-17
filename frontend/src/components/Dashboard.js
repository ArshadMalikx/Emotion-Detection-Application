import React, { useMemo } from 'react';
import './Dashboard.css';

const Dashboard = ({ emotionHistory, isLoading }) => {
  const stats = useMemo(() => {
    if (!emotionHistory || !emotionHistory.length) return null;

    const emotionCounts = {};
    const emotionScores = {};

    emotionHistory.forEach(entry => {
      if (entry.emotions) {
        Object.entries(entry.emotions).forEach(([emotion, score]) => {
          if (!emotionCounts[emotion]) {
            emotionCounts[emotion] = 0;
            emotionScores[emotion] = 0;
          }
          emotionCounts[emotion]++;
          emotionScores[emotion] += score;
        });
      }
    });

    const averages = {};
    Object.keys(emotionCounts).forEach(emotion => {
      averages[emotion] = emotionScores[emotion] / emotionCounts[emotion];
    });

    const dominantEmotion = Object.entries(averages).reduce((a, b) => 
      a[1] > b[1] ? a : b
    );

    return {
      totalDetections: emotionHistory.length,
      dominantEmotion: {
        name: dominantEmotion[0],
        score: Math.round(dominantEmotion[1])
      },
      averages
    };
  }, [emotionHistory]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <h3>Loading dashboard data...</h3>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-empty">
        <h3>No emotion data available yet</h3>
        <p>Start the live detection to see your emotion statistics</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Emotion Analysis Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h4>Total Detections</h4>
            <p className="stat-value">{stats.totalDetections}</p>
          </div>
          <div className="stat-card">
            <h4>Dominant Emotion</h4>
            <p className="stat-value">{stats.dominantEmotion.name}</p>
            <p className="stat-subvalue">{stats.dominantEmotion.score}%</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Emotion Averages</h3>
          <div className="emotion-stats">
            {Object.entries(stats.averages).map(([emotion, score]) => (
              <div key={emotion} className="emotion-stat">
                <div className="emotion-stat-header">
                  <span className="emotion-name">{emotion}</span>
                  <span className="emotion-score">{Math.round(score)}%</span>
                </div>
                <div className="emotion-bar">
                  <div 
                    className="emotion-progress" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <div className="recent-activity">
            {emotionHistory.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="activity-item">
                <div className="activity-time">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
                <div className="activity-emotions">
                  {entry.emotions && Object.entries(entry.emotions).map(([emotion, score]) => (
                    <span key={emotion} className="activity-emotion">
                      {emotion}: {Math.round(score)}%
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 