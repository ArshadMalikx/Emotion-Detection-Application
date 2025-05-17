import React from 'react';
import './Home.css';

const Home = ({ setActiveTab }) => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UX Designer",
      content: "This emotion detection tool has revolutionized how I understand user reactions during testing sessions. The real-time analysis is incredibly accurate!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      content: "As a developer, I'm impressed by the accuracy and speed of the emotion detection. The dashboard provides valuable insights for our user research.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager",
      content: "The historical data tracking feature has been invaluable for our team. We can now make data-driven decisions based on user emotional responses.",
      rating: 4
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EmotionAI</h1>
          <p>Advanced emotion detection powered by artificial intelligence</p>
          <button 
            onClick={() => setActiveTab('live')} 
            className="cta-button"
          >
            Try Live Detection
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <h2>About EmotionAI</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="icon">🎯</div>
              <h3>Real-time Analysis</h3>
              <p>Get instant emotion detection with our advanced AI technology</p>
            </div>
            <div className="about-card">
              <div className="icon">📊</div>
              <h3>Detailed Analytics</h3>
              <p>Track and analyze emotional patterns over time</p>
            </div>
            <div className="about-card">
              <div className="icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Your data is processed locally and never stored on our servers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="reviews-content">
          <h2>What Our Users Say</h2>
          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h3>{review.name}</h3>
                    <p>{review.role}</p>
                  </div>
                  <div className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Have questions or feedback? We'd love to hear from you!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="icon">📧</span>
                  <p>contact@emotionai.com</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📱</span>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <p>123 AI Street, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 