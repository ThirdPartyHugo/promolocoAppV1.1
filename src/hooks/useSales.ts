import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useSales = (userId?: string) => {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [orderBy('date', 'desc')];
    if (userId) {
      constraints.unshift(where('userId', '==', userId));
    }

    const unsubscribe = onSnapshot(
      query(collection(db, 'sales'), ...constraints),
      (snapshot) => {
        const salesData: any[] = [];
        snapshot.forEach((doc) => {
          salesData.push({ id: doc.id, ...doc.data() });
        });
        setSales(salesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching sales:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { sales, loading, error };
};