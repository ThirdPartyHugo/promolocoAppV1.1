import React, { useState } from 'react';
import { Plus, Search, CreditCard, Users, ArrowRight, Mail, FileText, Building2, MapPin, Hash } from 'lucide-react';

// ... (keep existing interfaces)

interface ContractorDetails {
  id: string;
  businessName: string;
  legalNumber: string;
  address: string;
  email: string;
  phone: string;
  contractStatus: 'pending' | 'signed' | 'none';
  contractUrl?: string;
  contractDate?: string;
}

export const PromoCardManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [contractDetails, setContractDetails] = useState<ContractorDetails | null>(null);

  // Mock data
  const contractors: (Contractor & { contractStatus?: 'pending' | 'signed' | 'none' })[] = [
    { 
      id: '1', 
      name: 'ABC Contractors', 
      totalCards: 500, 
      usedCards: 250,
      contractStatus: 'signed'
    },
    { 
      id: '2', 
      name: 'XYZ Services', 
      totalCards: 300, 
      usedCards: 150,
      contractStatus: 'none'
    },
  ];

  // ... (keep existing promoCards array)

  const handleSendContract = (data: ContractorDetails) => {
    // In a real app, this would:
    // 1. Generate the contract PDF
    // 2. Send it via email
    // 3. Store the contract details
    console.log('Sending contract to:', data);
    setShowContractModal(false);
  };

  return (
    <div className="space-y-6">
      {/* ... (keep existing header and contractor overview sections) */}

      {/* Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold">Send Contract</h3>
                </div>
                <button
                  onClick={() => setShowContractModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSendContract({
                  id: Math.random().toString(),
                  businessName: formData.get('businessName') as string,
                  legalNumber: formData.get('legalNumber') as string,
                  address: formData.get('address') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  contractStatus: 'pending'
                });
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Business Legal Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center">
                      <Hash className="w-4 h-4 mr-2" />
                      Business Registration Number
                    </span>
                  </label>
                  <input
                    type="text"
                    name="legalNumber"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Business Address
                    </span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Business Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-1">Contract Process:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Contract will be generated and sent to the provided email</li>
                        <li>Business must review and digitally sign the contract</li>
                        <li>Signed contract will be stored in the system</li>
                        <li>Once approved, promotional cards can be assigned</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowContractModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Send Contract
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modify the existing Assign Cards Modal to include contract check */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Assign Promotional Cards</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contractor
                  </label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    onChange={(e) => {
                      const contractor = contractors.find(c => c.id === e.target.value);
                      if (contractor?.contractStatus === 'none') {
                        setShowAssignModal(false);
                        setShowContractModal(true);
                      }
                    }}
                  >
                    <option value="">Select contractor</option>
                    {contractors.map(contractor => (
                      <option key={contractor.id} value={contractor.id}>
                        {contractor.name} {contractor.contractStatus === 'none' ? '(Contract Required)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Cards
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Assign Cards
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Contract Status to Contractor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contractors.map(contractor => (
          <div
            key={contractor.id}
            onClick={() => setSelectedContractor(contractor.id)}
            className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-colors ${
              selectedContractor === contractor.id ? 'ring-2 ring-red-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{contractor.name}</h3>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Cards</p>
                <p className="text-lg font-semibold">{contractor.totalCards}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Used Cards</p>
                <p className="text-lg font-semibold">{contractor.usedCards}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-sm px-2 py-1 rounded-full ${
                contractor.contractStatus === 'signed' 
                  ? 'bg-green-100 text-green-800'
                  : contractor.contractStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {contractor.contractStatus === 'signed' 
                  ? 'Contract Signed'
                  : contractor.contractStatus === 'pending'
                  ? 'Contract Pending'
                  : 'Contract Required'}
              </span>
              {contractor.contractStatus === 'signed' && (
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Contract
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ... (keep existing cards table and other sections) */}
    </div>
  );
};