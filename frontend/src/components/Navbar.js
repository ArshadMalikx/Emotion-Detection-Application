import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, currentUser, onLogout, onLogin, onRegister }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setActiveTab('home')}>
          <span className="brand-icon">😊</span>
          <h1>EmotionAI</h1>
        </div>
        <div className="navbar-links">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          {currentUser && (
            <>
              <button 
                className={`nav-link ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live Detection
              </button>
              <button 
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </>
          )}
          <a 
            href="https://github.com/NikhilGuleria2004/FacReq.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            GitHub
          </a>
          {currentUser ? (
            <div className="user-menu">
              <span className="user-name">{currentUser.displayName || currentUser.email}</span>
              <button onClick={onLogout} className="nav-link logout-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={onLogin} className="nav-link login-button">
                Login
              </button>
              <button onClick={onRegister} className="nav-link register-button">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 