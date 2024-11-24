import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createUser, db, createTeam } from '../lib/firebase';

export async function initializeDefaultUsers() {
  try {
    // Check if admin user exists
    const adminQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
    const adminSnapshot = await getDocs(adminQuery);

    if (!adminSnapshot.empty) {
      console.log('Default users already initialized');
      return;
    }

    const defaultUsers = [
      {
        email: 'admin@promoloco.com',
        password: 'admin123',
        role: 'admin' as const,
        name: 'Admin User'
      },
      {
        email: 'teamleader@promoloco.com',
        password: 'leader123',
        role: 'teamLeader' as const,
        name: 'Team Leader'
      },
      {
        email: 'salesman@promoloco.com',
        password: 'sales123',
        role: 'salesman' as const,
        name: 'Sales Representative'
      }
    ];

    // Create users sequentially
    for (const userData of defaultUsers) {
      try {
        const newUser = await createUser(
          userData.email,
          userData.password,
          userData.role,
          userData.name
        );

        // If it's a team leader, create a team for them
        if (userData.role === 'teamLeader') {
          await createTeam(
            'Default Team',
            newUser.id,
            'Default Territory',
            50000
          );
        }

        console.log(`Created user: ${userData.email}`);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`User ${userData.email} already exists`);
        } else {
          console.error(`Error creating user ${userData.email}:`, error);
        }
      }
    }

    console.log('Default users initialized successfully');
  } catch (error) {
    console.error('Error initializing default users:', error);
  }
}