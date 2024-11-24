import { addDoc, collection, doc, updateDoc, increment, Timestamp, getDoc, getDocs, query, where, writeBatch, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FirebaseUser } from '../types/firebase';

interface SalesPinData {
  position: google.maps.LatLngLiteral;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  sale: {
    amount: number;
    promoCardId: string;
    paymentMethod: string;
    notes?: string;
  };
}

export const salesPinService = {
  async createSalesPin(data: SalesPinData, user: FirebaseUser) {
    try {
      // Start a batch write
      const batch = writeBatch(db);

      // 1. Create customer record
      const customerRef = doc(collection(db, 'customers'));
      const customerData = {
        ...data.customer,
        salesmanId: user.id,
        teamId: user.teamId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      batch.set(customerRef, customerData);

      // 2. Create sale record
      const saleRef = doc(collection(db, 'sales'));
      const saleData = {
        ...data.sale,
        customerId: customerRef.id,
        salesmanId: user.id,
        teamId: user.teamId,
        position: data.position,
        date: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      batch.set(saleRef, saleData);

      // 3. Update promo card status
      const cardRef = doc(db, 'promoCards', data.sale.promoCardId);
      const cardDoc = await getDoc(cardRef);
      const cardData = cardDoc.data();
      
      batch.update(cardRef, {
        status: 'used',
        usedBy: user.id,
        usedAt: Timestamp.now(),
        customerId: customerRef.id,
        saleId: saleRef.id,
        updatedAt: Timestamp.now(),
      });

      // Update contractor's card count
      if (cardData?.contractorId) {
        const contractorRef = doc(db, 'contractors', cardData.contractorId);
        batch.update(contractorRef, {
          usedCards: increment(1),
          updatedAt: Timestamp.now(),
        });
      }

      // 4. Update salesman's paysheet
      const currentPeriod = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      const paysheetQuery = query(
        collection(db, 'paysheets'),
        where('salesmanId', '==', user.id),
        where('period', '==', currentPeriod)
      );
      
      const paysheetSnapshot = await getDocs(paysheetQuery);
      let paysheetRef;
      
      if (paysheetSnapshot.empty) {
        // Create new paysheet if none exists for current period
        paysheetRef = doc(collection(db, 'paysheets'));
        const commission = data.sale.amount * 0.1; // 10% commission
        batch.set(paysheetRef, {
          salesmanId: user.id,
          teamId: user.teamId,
          period: currentPeriod,
          sales: data.sale.amount,
          commission: commission,
          expenses: 0,
          bonuses: 0,
          totalPayable: commission,
          customers: [{
            id: customerRef.id,
            name: data.customer.name,
            promoCard: data.sale.promoCardId,
            amount: data.sale.amount,
            date: Timestamp.now(),
          }],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      } else {
        // Update existing paysheet
        paysheetRef = doc(db, 'paysheets', paysheetSnapshot.docs[0].id);
        const commission = data.sale.amount * 0.1; // 10% commission
        batch.update(paysheetRef, {
          sales: increment(data.sale.amount),
          commission: increment(commission),
          totalPayable: increment(commission),
          customers: arrayUnion({
            id: customerRef.id,
            name: data.customer.name,
            promoCard: data.sale.promoCardId,
            amount: data.sale.amount,
            date: Timestamp.now(),
          }),
          updatedAt: Timestamp.now(),
        });
      }

      // 5. If user has a team leader, update team leader's paysheet
      if (user.teamId) {
        const teamDoc = await getDoc(doc(db, 'teams', user.teamId));
        const teamData = teamDoc.data();
        
        if (teamData?.leaderId) {
          const leaderPaysheetQuery = query(
            collection(db, 'paysheets'),
            where('salesmanId', '==', teamData.leaderId),
            where('period', '==', currentPeriod)
          );
          
          const leaderPaysheetSnapshot = await getDocs(leaderPaysheetQuery);
          const leaderCommission = data.sale.amount * 0.05; // 5% commission for team leader
          
          if (leaderPaysheetSnapshot.empty) {
            // Create new paysheet for team leader
            const leaderPaysheetRef = doc(collection(db, 'paysheets'));
            batch.set(leaderPaysheetRef, {
              salesmanId: teamData.leaderId,
              teamId: user.teamId,
              period: currentPeriod,
              sales: 0,
              commission: 0,
              expenses: 0,
              bonuses: 0,
              teamSales: data.sale.amount,
              teamCommission: leaderCommission,
              totalPayable: leaderCommission,
              customers: [],
              teamMembers: [{
                salesmanId: user.id,
                name: user.name,
                amount: data.sale.amount,
                commission: leaderCommission,
                date: Timestamp.now(),
              }],
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
          } else {
            // Update existing team leader paysheet
            const leaderPaysheetRef = doc(db, 'paysheets', leaderPaysheetSnapshot.docs[0].id);
            batch.update(leaderPaysheetRef, {
              teamSales: increment(data.sale.amount),
              teamCommission: increment(leaderCommission),
              totalPayable: increment(leaderCommission),
              teamMembers: arrayUnion({
                salesmanId: user.id,
                name: user.name,
                amount: data.sale.amount,
                commission: leaderCommission,
                date: Timestamp.now(),
              }),
              updatedAt: Timestamp.now(),
            });
          }
        }
      }

      // Commit all changes
      await batch.commit();

      return {
        customerId: customerRef.id,
        saleId: saleRef.id,
      };
    } catch (error) {
      console.error('Error creating sales pin:', error);
      throw error;
    }
  },

  async getAvailablePromoCards(userId: string) {
    try {
      const q = query(
        collection(db, 'promoCards'),
        where('assignedTo', '==', userId),
        where('status', '==', 'available')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting available promo cards:', error);
      throw error;
    }
  },

  async validatePromoCard(cardId: string, userId: string) {
    try {
      const cardDoc = await getDoc(doc(db, 'promoCards', cardId));
      if (!cardDoc.exists()) {
        throw new Error('Promo card not found');
      }
      const cardData = cardDoc.data();
      if (cardData.assignedTo !== userId) {
        throw new Error('Promo card not assigned to this user');
      }
      if (cardData.status !== 'available') {
        throw new Error('Promo card is not available');
      }
      return true;
    } catch (error) {
      console.error('Error validating promo card:', error);
      throw error;
    }
  }
};