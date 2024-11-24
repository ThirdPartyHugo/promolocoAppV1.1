import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useTeam = (teamId: string) => {
  const [team, setTeam] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeTeam = onSnapshot(
      doc(db, 'teams', teamId),
      (doc) => {
        if (doc.exists()) {
          setTeam({ id: doc.id, ...doc.data() });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching team:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    const unsubscribeMembers = onSnapshot(
      query(collection(db, 'users'), where('teamId', '==', teamId)),
      (snapshot) => {
        const memberData: any[] = [];
        snapshot.forEach((doc) => {
          memberData.push({ id: doc.id, ...doc.data() });
        });
        setMembers(memberData);
      },
      (error) => {
        console.error('Error fetching team members:', error);
        setError(error.message);
      }
    );

    return () => {
      unsubscribeTeam();
      unsubscribeMembers();
    };
  }, [teamId]);

  return { team, members, loading, error };
};