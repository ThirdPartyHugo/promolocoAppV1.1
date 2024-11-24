import React, { useState } from 'react';
import { FileText, Upload, DollarSign, Home, Thermometer, Camera } from 'lucide-react';

type ServiceType = 'thermopump' | 'iso';

interface FormData {
  serviceType: ServiceType;
  clientName: string;
  address: string;
  email: string;
  phone: string;
  // Thermopump specific
  houseType?: string;
  heatingType?: string;
  model?: string;
  installLocation?: string;
  panelPhoto?: File;
  // ISO specific
  insulationType?: string;
  squareFootage?: number;
  atticHeight?: number;
  houseAge?: number;
  atticPhotos?: File[];
  pestControl?: boolean;
  // Common
  notes: string;
  saleAmount: number;
  grants: number;
  discounts: number;
}

export const SubmissionForm: React.FC = () => {
  const [formType, setFormType] = useState<ServiceType>('thermopump');
  const [formData, setFormData] = useState<FormData>({
    serviceType: 'thermopump',
    clientName: '',
    address: '',
    email: '',
    phone: '',
    notes: '',
    saleAmount: 0,
    grants: 0,
    discounts: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">New Sale Submission</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setFormType('thermopump')}
            className={`px-4 py-2 rounded-lg ${
              formType === 'thermopump'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Thermopump
          </button>
          <button
            onClick={() => setFormType('iso')}
            className={`px-4 py-2 rounded-lg ${
              formType === 'iso'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            ISO
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Service Specific Fields */}
        {formType === 'thermopump' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">House Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option>Detached</option>
                  <option>Semi-detached</option>
                  <option>Townhouse</option>
                  <option>Apartment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Heating Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option>Electric Baseboard</option>
                  <option>Gas Furnace</option>
                  <option>Oil Furnace</option>
                  <option>Wood Stove</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option>Model A - 12,000 BTU</option>
                  <option>Model B - 18,000 BTU</option>
                  <option>Model C - 24,000 BTU</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Installation Location</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option>Indoor Wall</option>
                  <option>Exterior Wall</option>
                  <option>Central System</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Electrical Panel Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                      <span>Upload photo</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Insulation Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option>Fiberglass</option>
                  <option>Cellulose</option>
                  <option>Spray Foam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Square Footage</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attic Height (inches)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">House Age (years)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attic Photos</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                      <span>Upload photos</span>
                      <input type="file" className="sr-only" multiple accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Include Pest Control (automatically added to final price)
              </label>
            </div>
          </div>
        )}

        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sale Amount (pre-tax)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Eligible Grants</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Discounts</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Submit Sale
          </button>
        </div>
      </form>
    </div>
  );
};