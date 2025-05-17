import { db } from './firebase';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    orderBy, 
    getDocs,
    serverTimestamp,
    onSnapshot,
    limit,
    enableNetwork,
    disableNetwork
} from 'firebase/firestore';

// Add emotion data to Firestore with retry logic
export const saveEmotionData = async (userId, emotions) => {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            console.log('Saving emotion data for user:', userId);
            const docRef = await addDoc(collection(db, 'emotions'), {
                userId,
                emotions,
                timestamp: serverTimestamp()
            });
            console.log('Emotion data saved with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error(`Error saving emotion data (attempt ${retryCount + 1}/${maxRetries}):`, error);
            retryCount++;
            
            if (retryCount === maxRetries) {
                throw error;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
    }
};

// Get emotion history for a user with retry logic
export const getEmotionHistory = async (userId) => {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            console.log('Fetching emotion history for user:', userId);
            const q = query(
                collection(db, 'emotions'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc'),
                limit(50)
            );
            
            const querySnapshot = await getDocs(q);
            const history = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toISOString()
            }));
            console.log('Fetched emotion history:', history);
            return history;
        } catch (error) {
            console.error(`Error getting emotion history (attempt ${retryCount + 1}/${maxRetries}):`, error);
            retryCount++;
            
            if (retryCount === maxRetries) {
                throw error;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
    }
};

// Subscribe to real-time updates for a user's emotion history
export const subscribeToEmotionHistory = (userId, callback) => {
    try {
        console.log('Subscribing to emotion history for user:', userId);
        const q = query(
            collection(db, 'emotions'),
            where('userId', '==', userId),
            orderBy('timestamp', 'desc'),
            limit(50)
        );

        return onSnapshot(q, 
            (querySnapshot) => {
                const history = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().toISOString()
                }));
                console.log('Real-time update received:', history);
                callback(history);
            }, 
            (error) => {
                console.error('Error in emotion history subscription:', error);
                // Attempt to reconnect
                disableNetwork(db).then(() => {
                    return enableNetwork(db);
                }).catch(err => {
                    console.error('Error reconnecting to Firestore:', err);
                });
            }
        );
    } catch (error) {
        console.error('Error setting up emotion history subscription:', error);
        throw error;
    }
}; 