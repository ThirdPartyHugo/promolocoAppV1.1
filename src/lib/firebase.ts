import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, Timestamp, query, where, getDocs, writeBatch, arrayUnion } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { UserRole } from '../types/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAAgaCqbiJQWmueC8BG5Ufb-WKRbOles7I",
  authDomain: "promoloco-app.firebaseapp.com",
  projectId: "promoloco-app",
  storageBucket: "promoloco-app.firebasestorage.app",
  messagingSenderId: "461831163266",
  appId: "1:461831163266:web:d63ba8b7046cc1688b539b",
  measurementId: "G-NJ249RBXHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const createUser = async (email: string, password: string, role: UserRole, name: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      uid: user.uid,
      email,
      name,
      role,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const userRef = await addDoc(collection(db, 'users'), userData);
    return { id: userRef.id, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Team functions
export const createTeam = async (name: string, leaderId: string, territory: string, salesTarget: number) => {
  try {
    const teamData = {
      name,
      leaderId,
      territory,
      salesTarget,
      memberIds: [leaderId],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const teamRef = await addDoc(collection(db, 'teams'), teamData);
    
    // Update the leader's user document with the team ID
    const userRef = doc(db, 'users', leaderId);
    await updateDoc(userRef, { teamId: teamRef.id });
    
    return { id: teamRef.id, ...teamData };
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const addTeamMember = async (teamId: string, data: {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}) => {
  try {
    // Create the user account
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Create user document
    const userData = {
      uid: user.uid,
      email: data.email,
      name: data.name,
      role: data.role,
      teamId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const userRef = await addDoc(collection(db, 'users'), userData);
    
    // Update team members
    const teamRef = doc(db, 'teams', teamId);
    await updateDoc(teamRef, {
      memberIds: arrayUnion(userRef.id),
      updatedAt: Timestamp.now(),
    });
    
    return { id: userRef.id, ...userData };
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

export default app;