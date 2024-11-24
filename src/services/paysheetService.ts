import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PaysheetData {
  userId: string;
  salesmanName: string;
  period: string;
  sales?: number;
  commission?: number;
  expenses?: number;
  bonuses?: number;
  totalPayable?: number;
  customers?: any[];
}

export const paysheetService = {
  createPaysheet: async (data: PaysheetData) => {
    try {
      const docRef = await addDoc(collection(db, 'paysheets'), {
        ...data,
        sales: data.sales || 0,
        commission: data.commission || 0,
        expenses: data.expenses || 0,
        bonuses: data.bonuses || 0,
        totalPayable: data.totalPayable || 0,
        customers: data.customers || [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating paysheet:', error);
      throw error;
    }
  },

  updatePaysheet: async (id: string, data: Partial<PaysheetData>) => {
    try {
      const docRef = doc(db, 'paysheets', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating paysheet:', error);
      throw error;
    }
  },
};