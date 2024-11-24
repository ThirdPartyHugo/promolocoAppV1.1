import React, { useState } from 'react';
import { CreditCard, Users, Plus } from 'lucide-react';

interface PromoCard {
  contractorId: number;
  cardNumber: number;
  assignedTo: string | null;
  status: 'available' | 'assigned' | 'used';
}

export const ProductManagement: React.FC = () => {
  const [selectedContractor, setSelectedContractor] = useState<number>(1);
  const [cardRange, setCardRange] = useState({ start: 1, end: 1 });
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  // Mock team members data (in real app, fetch from API)
  const teamMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
  ];

  // Mock promotional cards data (in real app, fetch from API)
  const [promoCards, setPromoCards] = useState<PromoCard[]>([
    { contractorId: 1, cardNumber: 1, assignedTo: 'John Doe', status: 'assigned' },
    { contractorId: 1, cardNumber: 2, assignedTo: null, status: 'available' },
    { contractorId: 2, cardNumber: 1, assignedTo: 'Jane Smith', status: 'used' },
  ]);

  const handleAssignCards = () => {
    // Implementation for assigning cards
    setShowAssignModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Promotional Cards Management</h2>
        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Assign Cards
        </button>
      </div>

      {/* Contractor Selection */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Contractor
        </label>
        <select
          value={selectedContractor}
          onChange={(e) => setSelectedContractor(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              Contractor #{num}
            </option>
          ))}
        </select>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Card ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {promoCards
              .filter((card) => card.contractorId === selectedContractor)
              .map((card) => (
                <tr key={`${card.contractorId}-${card.cardNumber}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {card.contractorId}-{card.cardNumber.toString().padStart(3, '0')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {card.assignedTo || 'Unassigned'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      card.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : card.status === 'assigned'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {card.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-red-600 hover:text-red-900">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Assign Cards Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Assign Promotional Cards</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign to
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Range
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    placeholder="Start"
                    value={cardRange.start}
                    onChange={(e) => setCardRange({ ...cardRange, start: Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                  <input
                    type="number"
                    min="1"
                    max="500"
                    placeholder="End"
                    value={cardRange.end}
                    onChange={(e) => setCardRange({ ...cardRange, end: Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignCards}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Assign Cards
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};