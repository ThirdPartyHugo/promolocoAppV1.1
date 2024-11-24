import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PaySheet {
  id: string;
  userId: string;
  salesmanName: string;
  period: string;
  sales: number;
  commission: number;
  expenses: number;
  bonuses: number;
  totalPayable: number;
  customers: any[];
}

export const usePaysheets = (userId?: string) => {
  const [paysheets, setPaysheets] = useState<PaySheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [orderBy('period', 'desc')];
    if (userId) {
      constraints.unshift(where('userId', '==', userId));
    }

    const q = query(collection(db, 'paysheets'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results: PaySheet[] = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() } as PaySheet);
        });
        setPaysheets(results);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching paysheets:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { paysheets, loading, error };
};