import { collection, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const initializeFirebaseData = async () => {
  try {
    // Check if data already exists
    const usersQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
    const usersSnapshot = await getDocs(usersQuery);
    
    if (!usersSnapshot.empty) {
      console.log('Firebase already initialized');
      return;
    }

    const batch = writeBatch(db);

    // Create collections
    const collections = [
      'users',
      'teams',
      'paysheets',
      'contractors',
      'services',
      'promoCards',
      'customers',
      'sales',
      'challenges',
      'rewards'
    ];

    // Initialize each collection with basic structure
    collections.forEach(collectionName => {
      const collectionRef = collection(db, collectionName);
      batch.set(doc(collectionRef, 'structure'), {
        createdAt: new Date(),
        initialized: true
      });
    });

    await batch.commit();
    console.log('Firebase collections initialized');

  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};