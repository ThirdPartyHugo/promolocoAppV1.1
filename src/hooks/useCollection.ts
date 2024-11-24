import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, Query } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useCollection = (collectionName: string, queryConstraints?: any[]) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q: Query;
    if (queryConstraints) {
      q = query(collection(db, collectionName), ...queryConstraints);
    } else {
      q = query(collection(db, collectionName));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const results: any[] = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching collection:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryConstraints]);

  return { documents, error, loading };
};