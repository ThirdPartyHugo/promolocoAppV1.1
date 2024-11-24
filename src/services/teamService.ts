import { collection, addDoc, updateDoc, doc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const teamService = {
  createTeam: async (data: {
    name: string;
    leaderId: string;
    territory: string;
    salesTarget: number;
  }) => {
    try {
      const docRef = await addDoc(collection(db, 'teams'), {
        ...data,
        memberIds: [data.leaderId],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  },

  addTeamMember: async (teamId: string, memberId: string) => {
    try {
      const teamRef = doc(db, 'teams', teamId);
      await updateDoc(teamRef, {
        memberIds: arrayUnion(memberId),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  },

  getTeamByLeader: async (leaderId: string) => {
    try {
      const q = query(collection(db, 'teams'), where('leaderId', '==', leaderId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting team:', error);
      throw error;
    }
  }
};