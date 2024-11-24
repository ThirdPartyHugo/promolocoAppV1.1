import { collection, addDoc, updateDoc, doc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const contractorService = {
  createContractor: async (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    businessNumber: string;
    totalCards: number;
  }) => {
    try {
      const docRef = await addDoc(collection(db, 'contractors'), {
        ...data,
        usedCards: 0,
        status: 'active',
        contractStatus: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // Create initial promo cards
      const batch = writeBatch(db);
      for (let i = 1; i <= data.totalCards; i++) {
        const cardRef = doc(collection(db, 'promoCards'));
        batch.set(cardRef, {
          contractorId: docRef.id,
          cardNumber: i,
          status: 'available',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
      await batch.commit();

      return docRef.id;
    } catch (error) {
      console.error('Error creating contractor:', error);
      throw error;
    }
  },

  updateContractStatus: async (id: string, status: 'pending' | 'signed' | 'none') => {
    try {
      const docRef = doc(db, 'contractors', id);
      await updateDoc(docRef, {
        contractStatus: status,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating contractor status:', error);
      throw error;
    }
  }
};