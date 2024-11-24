import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp, writeBatch, doc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAgaCqbiJQWmueC8BG5Ufb-WKRbOles7I",
  authDomain: "promoloco-app.firebaseapp.com",
  projectId: "promoloco-app",
  storageBucket: "promoloco-app.firebasestorage.app",
  messagingSenderId: "461831163266",
  appId: "1:461831163266:web:d63ba8b7046cc1688b539b",
  measurementId: "G-NJ249RBXHQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createPromoCards(contractorId, quantity, startNumber = 1) {
  try {
    const batch = writeBatch(db);
    const cards = [];

    for (let i = 0; i < quantity; i++) {
      const cardNumber = (startNumber + i).toString().padStart(3, '0');
      const cardRef = doc(collection(db, 'promoCards'));
      const cardData = {
        number: cardNumber,
        contractorId,
        status: 'available',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      batch.set(cardRef, cardData);
      cards.push({ id: cardRef.id, ...cardData });
    }

    await batch.commit();
    return cards;
  } catch (error) {
    console.error('Error creating promo cards:', error);
    throw error;
  }
}

async function initializeTestData() {
  try {
    console.log('Creating test contractor...');
    // Create a test contractor
    const contractorRef = await addDoc(collection(db, 'contractors'), {
      name: 'Test Contractor',
      email: 'test@contractor.com',
      phone: '(555) 123-4567',
      totalCards: 100,
      usedCards: 0,
      status: 'active',
      contractStatus: 'signed',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log('Creating promo cards...');
    // Create 100 promo cards for the contractor
    const cards = await createPromoCards(contractorRef.id, 100);

    console.log('Test data initialized successfully');
    console.log(`Created contractor with ID: ${contractorRef.id}`);
    console.log(`Created ${cards.length} promo cards`);

  } catch (error) {
    console.error('Error initializing test data:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeTestData();