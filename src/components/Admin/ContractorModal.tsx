import React, { memo } from 'react';
import { Building2, Mail, Phone, CreditCard, MapPin, Hash, FileText } from 'lucide-react';

interface ContractorModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  sendContract: boolean;
  onToggleSendContract: (value: boolean) => void;
}

export const ContractorModal = memo(({ onClose, onSubmit, sendContract, onToggleSendContract }: ContractorModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold">Add New Contractor</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit(Object.fromEntries(formData));
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Name
                </span>
              </label>
              <input
                type="text"
                name="companyName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
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
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Initial Number of Cards
                </span>
              </label>
              <input
                type="number"
                name="totalCards"
                min="1"
                defaultValue="500"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sendContract"
                  checked={sendContract}
                  onChange={(e) => onToggleSendContract(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="sendContract" className="ml-2 block text-sm text-gray-900">
                  Send contract for signature
                </label>
              </div>

              {sendContract && (
                <div className="space-y-4 pl-6 border-l-2 border-red-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        Business Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="businessNumber"
                      required={sendContract}
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
                      required={sendContract}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex">
                      <FileText className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Contract Process</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Contract will be generated and sent to the provided email</li>
                            <li>Business must review and digitally sign the contract</li>
                            <li>Signed contract will be stored in our system</li>
                            <li>Promotional cards will be activated after contract signing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                Add Contractor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});