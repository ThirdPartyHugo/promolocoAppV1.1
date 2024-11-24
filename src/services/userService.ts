import { collection, addDoc, updateDoc, doc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { teamService } from './teamService';
import { paysheetService } from './paysheetService';

export const userService = {
  createUser: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    teamId?: string;
  }) => {
    try {
      // Create auth user
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      // Create user document
      const userDoc = {
        uid: user.uid,
        email: data.email,
        name: data.name,
        role: data.role,
        teamId: data.teamId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const userRef = await addDoc(collection(db, 'users'), userDoc);

      // If user is a salesman or team leader, create initial paysheet
      if (['salesman', 'teamLeader'].includes(data.role)) {
        await paysheetService.createPaysheet({
          userId: userRef.id,
          salesmanName: data.name,
          period: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        });
      }

      return { id: userRef.id, ...userDoc };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  inviteTeamMember: async (data: {
    email: string;
    name: string;
    role: string;
    teamId?: string;
    reportingTo?: string;
  }) => {
    try {
      // Create user document with invited status
      const userDoc = {
        email: data.email,
        name: data.name,
        role: data.role,
        teamId: data.teamId,
        reportingTo: data.reportingTo,
        status: 'invited',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const userRef = await addDoc(collection(db, 'users'), userDoc);

      // Send invitation email (implement your email service here)
      console.log(`Sending invitation email to ${data.email}`);

      return { id: userRef.id, ...userDoc };
    } catch (error) {
      console.error('Error inviting team member:', error);
      throw error;
    }
  }
};