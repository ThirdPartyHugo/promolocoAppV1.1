import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { salesPinService } from '../services/salesPinService';
import { promoCardService } from '../services/promoCardService';

export const useSalesPin = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCards, setAvailableCards] = useState<any[]>([]);

  const loadAvailableCards = async () => {
    if (!user) return;
    try {
      const cards = await promoCardService.getAssignedCards(user.id);
      setAvailableCards(cards.filter(card => card.status === 'assigned'));
    } catch (err) {
      console.error('Error loading promo cards:', err);
      setError(err instanceof Error ? err.message : 'Failed to load promo cards');
    }
  };

  // Load cards when the hook is initialized
  useEffect(() => {
    loadAvailableCards();
  }, [user]);

  const addSale = async (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    promoCard: string;
    amount: number;
    position: google.maps.LatLngLiteral;
    address: string;
    notes?: string;
    paymentMethod: string;
  }) => {
    if (!user) {
      setError('User must be logged in to add a sale');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate promo card first
      await salesPinService.validatePromoCard(data.promoCard, user.id);

      // Create the sales pin with all related records
      const result = await salesPinService.createSalesPin(
        {
          position: data.position,
          customer: {
            name: data.customerName,
            email: data.customerEmail,
            phone: data.customerPhone,
            address: data.address,
          },
          sale: {
            amount: data.amount,
            promoCardId: data.promoCard,
            paymentMethod: data.paymentMethod,
            notes: data.notes,
          },
        },
        user
      );

      // Refresh available cards after successful sale
      await loadAvailableCards();

      return result;
    } catch (err) {
      console.error('Error adding sale:', err);
      setError(err instanceof Error ? err.message : 'Failed to add sale');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addSale,
    loading,
    error,
    availableCards,
    loadAvailableCards,
  };
};