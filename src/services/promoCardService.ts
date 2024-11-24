import { collection, addDoc, updateDoc, doc, Timestamp, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const promoCardService = {
  async createPromoCards(contractorId: string, quantity: number, startNumber: number = 1) {
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
  },

  async assignCardsToSalesman(salesmanId: string, contractorId: string, quantity: number) {
    try {
      // Get available cards for the contractor
      const q = query(
        collection(db, 'promoCards'),
        where('contractorId', '==', contractorId),
        where('status', '==', 'available'),
        where('assignedTo', '==', null)
      );
      
      const snapshot = await getDocs(q);
      const availableCards = snapshot.docs;

      if (availableCards.length < quantity) {
        throw new Error(`Only ${availableCards.length} cards available`);
      }

      const batch = writeBatch(db);
      const cardsToAssign = availableCards.slice(0, quantity);

      cardsToAssign.forEach(card => {
        batch.update(doc(db, 'promoCards', card.id), {
          assignedTo: salesmanId,
          status: 'assigned',
          updatedAt: Timestamp.now(),
        });
      });

      await batch.commit();
      return cardsToAssign.map(card => ({ id: card.id, ...card.data() }));
    } catch (error) {
      console.error('Error assigning promo cards:', error);
      throw error;
    }
  },

  async getAssignedCards(salesmanId: string) {
    try {
      const q = query(
        collection(db, 'promoCards'),
        where('assignedTo', '==', salesmanId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting assigned cards:', error);
      throw error;
    }
  },

  async getAvailableCards(contractorId: string) {
    try {
      const q = query(
        collection(db, 'promoCards'),
        where('contractorId', '==', contractorId),
        where('status', '==', 'available'),
        where('assignedTo', '==', null)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting available cards:', error);
      throw error;
    }
  }
};