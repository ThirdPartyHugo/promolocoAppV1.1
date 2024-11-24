import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface MapData {
  territories: any[];
  pins: any[];
  sales: any[];
  loading: boolean;
  error: string | null;
}

export const useMapData = (userId?: string, teamId?: string) => {
  const [mapData, setMapData] = useState<MapData>({
    territories: [],
    pins: [],
    sales: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    try {
      // Territories subscription
      const territoriesQuery = teamId
        ? query(collection(db, 'territories'), where('teamId', '==', teamId))
        : query(collection(db, 'territories'));

      unsubscribers.push(
        onSnapshot(
          territoriesQuery,
          (snapshot) => {
            const territories: any[] = [];
            snapshot.forEach((doc) => {
              territories.push({ id: doc.id, ...doc.data() });
            });
            setMapData(prev => ({ ...prev, territories }));
          },
          (error) => {
            console.error('Error fetching territories:', error);
            setMapData(prev => ({ ...prev, error: error.message }));
          }
        )
      );

      // Pins subscription
      const pinsQuery = userId
        ? query(collection(db, 'pins'), where('userId', '==', userId))
        : query(collection(db, 'pins'));

      unsubscribers.push(
        onSnapshot(
          pinsQuery,
          (snapshot) => {
            const pins: any[] = [];
            snapshot.forEach((doc) => {
              pins.push({ id: doc.id, ...doc.data() });
            });
            setMapData(prev => ({ ...prev, pins }));
          },
          (error) => {
            console.error('Error fetching pins:', error);
            setMapData(prev => ({ ...prev, error: error.message }));
          }
        )
      );

      // Sales subscription
      const salesQuery = teamId
        ? query(collection(db, 'sales'), where('teamId', '==', teamId))
        : query(collection(db, 'sales'));

      unsubscribers.push(
        onSnapshot(
          salesQuery,
          (snapshot) => {
            const sales: any[] = [];
            snapshot.forEach((doc) => {
              sales.push({ id: doc.id, ...doc.data() });
            });
            setMapData(prev => ({ ...prev, sales, loading: false }));
          },
          (error) => {
            console.error('Error fetching sales:', error);
            setMapData(prev => ({ ...prev, error: error.message, loading: false }));
          }
        )
      );
    } catch (error) {
      console.error('Error setting up map data subscriptions:', error);
      setMapData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false
      }));
    }

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [userId, teamId]);

  return mapData;
};