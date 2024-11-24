import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UseFirestoreOptions {
  collection: string;
  queries?: QueryConstraint[];
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitDocs?: number;
}

export function useFirestore<T extends DocumentData>({
  collection: collectionName,
  queries = [],
  orderByField,
  orderDirection = 'desc',
  limitDocs,
}: UseFirestoreOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collectionRef = collection(db, collectionName);
        
        let queryConstraints = [...queries];
        if (orderByField) {
          queryConstraints.push(orderBy(orderByField, orderDirection));
        }
        if (limitDocs) {
          queryConstraints.push(limit(limitDocs));
        }

        const q = query(collectionRef, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(documents);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, JSON.stringify(queries), orderByField, orderDirection, limitDocs]);

  const add = async (data: Omit<T, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add document');
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update document');
    }
  };

  const remove = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete document');
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
  };
}