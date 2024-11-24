import { collection, addDoc, getDocs, query, where, Timestamp, writeBatch, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { FirebaseUser, FirebaseContractor, FirebaseService } from '../types/firebase';

const defaultServices: Omit<FirebaseService, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Oil Change',
    description: 'Complete oil change service with quality oil and filter',
    cost: 45.99,
    duration: '30-45 min',
  },
  {
    name: 'Tire Change',
    description: 'Professional tire change and balancing service',
    cost: 25.99,
    duration: '45-60 min',
  },
  {
    name: 'Labor Time',
    description: 'General maintenance and repair services',
    cost: 35.00,
    duration: '30 min',
  },
  {
    name: 'Check Engine',
    description: 'Complete engine diagnostic scan',
    cost: 29.99,
    duration: '30-45 min',
  },
];

const defaultUsers = [
  {
    email: 'admin@promoloco.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
  },
  {
    email: 'teamleader@promoloco.com',
    password: 'team123',
    role: 'teamLeader',
    name: 'Team Leader',
  },
  {
    email: 'salesman@promoloco.com',
    password: 'sales123',
    role: 'salesman',
    name: 'Sales Person',
  },
];

export async function initializeFirebaseData() {
  try {
    // Check if data already exists
    const usersQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
    const usersSnapshot = await getDocs(usersQuery);
    
    if (!usersSnapshot.empty) {
      console.log('Firebase already initialized');
      return;
    }

    const batch = writeBatch(db);

    // Create default users
    for (const userData of defaultUsers) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        const userDocRef = doc(collection(db, 'users'));
        const userDoc: Omit<FirebaseUser, 'id'> = {
          uid: user.uid,
          email: userData.email,
          role: userData.role as FirebaseUser['role'],
          name: userData.name,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        batch.set(userDocRef, userDoc);
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error);
        // Continue with other users if one fails
        continue;
      }
    }

    // Create default services
    for (const service of defaultServices) {
      const serviceDocRef = doc(collection(db, 'services'));
      batch.set(serviceDocRef, {
        ...service,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }

    // Create sample contractors
    const contractors = [
      {
        name: 'ABC Contractors',
        email: 'contact@abccontractors.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, State',
        businessNumber: 'BN123456',
        totalCards: 500,
        usedCards: 0,
        status: 'active',
        contractStatus: 'signed',
      },
      {
        name: 'XYZ Services',
        email: 'info@xyzservices.com',
        phone: '(555) 987-6543',
        address: '456 Oak Ave, City, State',
        businessNumber: 'BN789012',
        totalCards: 300,
        usedCards: 0,
        status: 'active',
        contractStatus: 'signed',
      },
    ];

    for (const contractor of contractors) {
      const contractorDocRef = doc(collection(db, 'contractors'));
      batch.set(contractorDocRef, {
        ...contractor,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }

    // Commit all the batch operations
    await batch.commit();

    console.log('Firebase initialized with sample data');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}