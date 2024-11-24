import React, { useState } from 'react';
import { X, DollarSign, Mail, Phone, User, FileText, CreditCard, Send } from 'lucide-react';

interface CustomerFormProps {
  position: google.maps.LatLngLiteral;
  onClose: () => void;
  onSubmit: (data: any) => void;
  availableCards?: string[];
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ 
  position, 
  onClose, 
  onSubmit,
  availableCards = ['1-001', '1-002', '1-003'] // This should come from your Firebase store
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    saleAmount: '',
    promoCard: availableCards[0] || '',
    sendInvoice: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      position,
      saleAmount: parseFloat(formData.saleAmount),
      timestamp: new Date()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">New Customer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Name
              </div>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </div>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </div>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Promo Card Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Promo Card
              </div>
            </label>
            <select
              name="promoCard"
              required
              value={formData.promoCard}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              {availableCards.map(card => (
                <option key={card} value={card}>
                  Card #{card}
                </option>
              ))}
            </select>
          </div>

          {/* Sale Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Sale Amount
              </div>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="saleAmount"
                required
                min="0"
                step="0.01"
                value={formData.saleAmount}
                onChange={handleChange}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Notes
              </div>
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Send Invoice Option */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendInvoice"
              name="sendInvoice"
              checked={formData.sendInvoice}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="sendInvoice" className="flex items-center text-sm text-gray-700">
              <Send className="w-4 h-4 mr-2" />
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};