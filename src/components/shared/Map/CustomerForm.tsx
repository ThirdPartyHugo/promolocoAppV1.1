import React, { useState, useEffect } from 'react';
import { X, DollarSign, Mail, Phone, CreditCard } from 'lucide-react';
import { useSalesPin } from '../../../hooks/useSalesPin';
import { promoCardService } from '../../../services/promoCardService';

interface CustomerFormProps {
  position: google.maps.LatLngLiteral;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ position, onClose, onSubmit }) => {
  const { addSale, loading, error: saleError, availableCards, loadAvailableCards } = useSalesPin();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    promoCard: '',
    amount: '',
    paymentMethod: 'cash',
    notes: '',
    sendInvoice: false,
    address: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load available promo cards when component mounts
    loadAvailableCards();

    // Get address from coordinates using Geocoding service
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        setFormData(prev => ({
          ...prev,
          address: results[0].formatted_address
        }));
      }
    });
  }, [position, loadAvailableCards]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.promoCard) {
      setError('Please select a promo card');
      return;
    }

    try {
      await addSale({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        promoCard: formData.promoCard,
        amount: Number(formData.amount),
        position,
        address: formData.address,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
      });

      onSubmit({
        ...formData,
        position,
        timestamp: new Date()
      });
      
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit sale');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">New Sale</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {(error || saleError) && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
            {error || saleError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Promo Card</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.promoCard}
                onChange={(e) => setFormData({ ...formData, promoCard: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Select a card</option>
                {availableCards.map((card) => (
                  <option key={card.id} value={card.id}>
                    Card #{card.number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sale Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
            >
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="interac">Interac</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sendInvoice"
              checked={formData.sendInvoice}
              onChange={(e) => setFormData({ ...formData, sendInvoice: e.target.checked })}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="sendInvoice" className="ml-2 block text-sm text-gray-700">
              Send invoice to customer
            </label>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};