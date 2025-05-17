import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your backend URL

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Emotion data service
export const emotionService = {
    // Save emotion data
    saveEmotionData: async (userId, emotions) => {
        try {
            const response = await api.post('/emotions', {
                userId,
                emotions,
                timestamp: new Date().toISOString()
            });
            return response.data;
        } catch (error) {
            console.error('Error saving emotion data:', error);
            throw error;
        }
    },

    // Get emotion history
    getEmotionHistory: async (userId) => {
        try {
            const response = await api.get(`/emotions/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting emotion history:', error);
            throw error;
        }
    },

    // Subscribe to emotion updates (using polling)
    subscribeToEmotionHistory: (userId, callback) => {
        let isSubscribed = true;
        let lastTimestamp = null;

        const pollData = async () => {
            if (!isSubscribed) return;

            try {
                const response = await api.get(`/emotions/${userId}`, {
                    params: { lastTimestamp }
                });
                
                const data = response.data;
                if (data.length > 0) {
                    lastTimestamp = data[0].timestamp;
                    callback(data);
                }
            } catch (error) {
                console.error('Error polling emotion history:', error);
            }

            // Poll every 5 seconds
            setTimeout(pollData, 5000);
        };

        // Start polling
        pollData();

        // Return unsubscribe function
        return () => {
            isSubscribed = false;
        };
    }
};

// Auth service
export const authService = {
    // Register user
    register: async (email, password) => {
        try {
            const response = await api.post('/auth/register', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}; 