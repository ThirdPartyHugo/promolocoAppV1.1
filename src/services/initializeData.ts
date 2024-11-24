import { promoCardService } from './promoCardService';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const initializeTestData = async () => {
  try {
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

    // Create 100 promo cards for the contractor
    await promoCardService.createPromoCards(contractorRef.id, 100);

    // Assign 10 cards to the test salesman
    const testSalesmanId = 'YOUR_TEST_SALESMAN_ID'; // Replace with actual test salesman ID
    await promoCardService.assignCardsToSalesman(testSalesmanId, contractorRef.id, 10);

    console.log('Test data initialized successfully');
  } catch (error) {
    console.error('Error initializing test data:', error);
    throw error;
  }
};