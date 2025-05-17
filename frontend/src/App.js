import React, { useState, useEffect } from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { emotionService, authService } from './services/mongodb';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Fetch emotion history when user changes or tab changes to dashboard/history
  useEffect(() => {
    const fetchEmotionHistory = async () => {
      if (currentUser && (activeTab === 'dashboard' || activeTab === 'history')) {
        setIsLoading(true);
        try {
          const history = await emotionService.getEmotionHistory(currentUser.id);
          setEmotionHistory(history);
        } catch (error) {
          console.error('Error loading emotion history:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEmotionHistory();
  }, [currentUser, activeTab]);

  const handleEmotionUpdate = async (emotions) => {
    if (!currentUser) return;

    try {
      const savedEmotion = await emotionService.saveEmotionData(currentUser.id, emotions);
      // Update local state with the new emotion data
      setEmotionHistory(prev => [savedEmotion, ...prev]);
    } catch (error) {
      console.error('Error saving emotion data:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const user = response.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      setCurrentUser(user);
      setShowLogin(false);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await authService.register(email, password);
      const user = response.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      setCurrentUser(user);
      setShowRegister(false);
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setEmotionHistory([]);
  };

  const renderContent = () => {
    if (!currentUser && (activeTab === 'live' || activeTab === 'dashboard' || activeTab === 'history')) {
      return (
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login or register to access this feature.</p>
          <div className="auth-buttons">
            <button onClick={() => setShowLogin(true)} className="auth-button">
              Login
            </button>
            <button onClick={() => setShowRegister(true)} className="auth-button">
              Register
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'live':
        return (
          <div className="live-detection">
            <h2>Real-time Emotion Detection</h2>
            <WebcamCapture onEmotionUpdate={handleEmotionUpdate} />
          </div>
        );
      case 'dashboard':
        return <Dashboard emotionHistory={emotionHistory} isLoading={isLoading} />;
      case 'history':
        return <History emotionHistory={emotionHistory} isLoading={isLoading} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        onLogout={handleLogout}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />
      <main className="main-content">
        <div className="container">
          {activeTab !== 'home' && currentUser && (
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live Detection
              </button>
              <button 
                className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </div>
          )}

          <div className="content-area">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Login 
              onLogin={handleLogin}
              onToggleForm={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Register 
              onRegister={handleRegister}
              onToggleForm={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
              onClose={() => setShowRegister(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
