import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Building2, Mail, Phone, CreditCard, MapPin, Hash, FileText } from 'lucide-react';
import { ContractorList } from './ContractorList';
import { ContractorModal } from './ContractorModal';
import { ContractorDetails } from './ContractorDetails';

interface AddContractorData {
  name: string;
  email: string;
  phone: string;
  totalCards: number;
  businessNumber?: string;
  address?: string;
  sendContract?: boolean;
}

export const ContractorManagement: React.FC = () => {
  const [selectedContractor, setSelectedContractor] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sendContract, setSendContract] = useState(false);
  
  // Mock contractors data - in real app, this would come from an API
  const contractors = useMemo(() => [
    {
      id: 1,
      name: 'ABC Promotions',
      email: 'contact@abcpromo.com',
      phone: '(555) 123-4567',
      totalCards: 500,
      usedCards: 245,
      status: 'active',
      contractStatus: 'signed',
      revenue: 125000,
      customers: [
        {
          id: 'c1',
          promoCard: '1-001',
          name: 'John Smith',
          email: 'john@example.com',
          phone: '(555) 111-2222',
          address: '123 Main St',
          servicesUsed: [
            { serviceId: 'oil-change', dateUsed: '2024-03-15' }
          ]
        },
        // Add more mock customers
      ]
    },
    {
      id: 2,
      name: 'XYZ Marketing',
      email: 'info@xyzmarketing.com',
      phone: '(555) 987-6543',
      totalCards: 500,
      usedCards: 178,
      status: 'active',
      contractStatus: 'pending',
      revenue: 89000,
      customers: []
    },
  ], []);

  const handleAddContractor = useCallback((data: AddContractorData) => {
    console.log('Adding contractor:', data);
    setShowAddModal(false);
  }, []);

  const handleSelectContractor = useCallback((id: number) => {
    setSelectedContractor(id);
  }, []);

  const selectedContractorData = contractors.find(c => c.id === selectedContractor);

  if (selectedContractorData) {
    return (
      <ContractorDetails
        contractor={selectedContractorData}
        onBack={() => setSelectedContractor(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contractors</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Contractor
        </button>
      </div>

      <ContractorList
        contractors={contractors}
        selectedContractor={selectedContractor || 0}
        onSelectContractor={handleSelectContractor}
      />

      {showAddModal && (
        <ContractorModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddContractor}
          sendContract={sendContract}
          onToggleSendContract={setSendContract}
        />
      )}
    </div>
  );
};