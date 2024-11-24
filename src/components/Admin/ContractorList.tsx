import React, { memo } from 'react';
import { Building2 } from 'lucide-react';

interface Contractor {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalCards: number;
  usedCards: number;
  status: string;
  contractStatus: string;
}

interface ContractorListProps {
  contractors: Contractor[];
  selectedContractor: number;
  onSelectContractor: (id: number) => void;
}

export const ContractorList = memo(({ contractors, selectedContractor, onSelectContractor }: ContractorListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200">
        {contractors.map((contractor) => (
          <div
            key={contractor.id}
            onClick={() => onSelectContractor(contractor.id)}
            className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedContractor === contractor.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="w-8 h-8 text-gray-400 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{contractor.name}</h3>
                  <div className="mt-1 flex items-center space-x-4">
                    <p className="text-sm text-gray-500">{contractor.email}</p>
                    <p className="text-sm text-gray-500">{contractor.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-sm text-gray-500">Total Cards</p>
                  <p className="text-lg font-medium">{contractor.totalCards}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Used Cards</p>
                  <p className="text-lg font-medium">{contractor.usedCards}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contractor.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {contractor.status}
                  </span>
                  <span
                    className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contractor.contractStatus === 'signed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    Contract {contractor.contractStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});