# Real-Time Emotion Detection Application

A full-stack web application that uses computer vision and machine learning to detect and analyze human emotions in real-time through webcam feed.

## Features

- 🎥 Real-time emotion detection using webcam
- 📊 Live emotion analysis with confidence scores
- 📈 Emotion history tracking and visualization
- 🔐 Secure user authentication
- 📱 Responsive design for all devices
- 📊 Interactive dashboard for emotion analytics


## Tech Stack

- **Frontend:**
  - React.js
  - CSS3
  - Axios for API calls

- **Backend:**
  - Node.js/Express.js
  - Python (DeepFace, OpenCV)
  - MongoDB

- **Authentication:**
  - JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Webcam

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/emotion-detection-app.git
cd emotion-detection-app
```

2. Install backend dependencies
```bash
cd backend
npm install
pip install -r requirements.txt
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Configure environment variables
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
```

5. Start the development servers
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```
3. Set up environment variables
4. Start the development servers:
   ```bash
   # Backend
   npm run dev
   
   # Frontend
   npm start
   ```
   
## Project Structure
emotion-detection-app/
├── frontend/ # React application
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── services/ # API integration
│ │ └── styles/ # CSS modules
└── backend/ # Node.js server
├── routes/ # API endpoints
├── models/ # Database schemas
└── middleware/ # Authentication


## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

### Emotion Analysis
- `POST /api/emotions/analyze` - Real-time emotion analysis
- `GET /api/emotions/history` - Get emotion history

## Usage

1. Register or login to your account
2. Navigate to the Live Detection page
3. Allow camera access when prompted
4. View real-time emotion analysis
5. Check your emotion history in the Dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [DeepFace](https://github.com/serengil/deepface) for emotion detection
- [OpenCV](https://opencv.org/) for computer vision capabilities
- [React](https://reactjs.org/) for frontend development
- [Node.js](https://nodejs.org/) for backend development

## Contact

Arshad(335arshadmalik@gmail.com)
Project Link: [https://github.com/yourusername/emotion-detection-app](https://github.com/yourusername/emotion-detection-app)




