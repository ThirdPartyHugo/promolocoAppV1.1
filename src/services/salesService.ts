import { collection, addDoc, updateDoc, doc, Timestamp, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const salesService = {
  createSale: async (data: {
    userId: string;
    customerId: string;
    amount: number;
    promoCardId: string;
    date: Date;
  }) => {
    try {
      // Create sale document
      const saleRef = await addDoc(collection(db, 'sales'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // Update user's paysheet
      const paysheetRef = doc(db, 'paysheets', data.userId);
      await updateDoc(paysheetRef, {
        sales: increment(data.amount),
        commission: increment(data.amount * 0.1), // 10% commission
        totalPayable: increment(data.amount * 0.1),
        updatedAt: Timestamp.now(),
      });

      // Update promo card status
      const cardRef = doc(db, 'promoCards', data.promoCardId);
      await updateDoc(cardRef, {
        status: 'used',
        usedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      return saleRef.id;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  }
};