import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useContractor = (contractorId: string) => {
  const [contractor, setContractor] = useState<any>(null);
  const [promoCards, setPromoCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeContractor = onSnapshot(
      doc(db, 'contractors', contractorId),
      (doc) => {
        if (doc.exists()) {
          setContractor({ id: doc.id, ...doc.data() });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching contractor:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    const unsubscribeCards = onSnapshot(
      query(collection(db, 'promoCards'), where('contractorId', '==', contractorId)),
      (snapshot) => {
        const cardData: any[] = [];
        snapshot.forEach((doc) => {
          cardData.push({ id: doc.id, ...doc.data() });
        });
        setPromoCards(cardData);
      },
      (error) => {
        console.error('Error fetching promo cards:', error);
        setError(error.message);
      }
    );

    return () => {
      unsubscribeContractor();
      unsubscribeCards();
    };
  }, [contractorId]);

  return { contractor, promoCards, loading, error };
};