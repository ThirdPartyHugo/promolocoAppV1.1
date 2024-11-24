import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Calendar, MapPin, Mail, Phone, Building2, Users } from 'lucide-react';
import { ServiceCalendar } from '../Contractor/ServiceCalendar';
import { CustomerList } from '../Contractor/CustomerList';
import { FinancialOverview } from '../Contractor/FinancialOverview';

interface ContractorDetailsProps {
  contractor: any;
  onBack: () => void;
}

export const ContractorDetails: React.FC<ContractorDetailsProps> = ({ contractor, onBack }) => {
  const [activeTab, setActiveTab] = useState('customers');

  const tabs = [
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'calendar', label: 'Service Calendar', icon: Calendar },
    { id: 'financials', label: 'Financial Overview', icon: Building2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomerList 
          customers={contractor.customers || []}
          profits={contractor.profits || {}}
          onUpdateProfit={() => {}}
          onManageServices={() => {}}
        />;
      case 'calendar':
        return <ServiceCalendar />;
      case 'financials':
        return <FinancialOverview />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold">{contractor.name}</h2>
            <p className="text-sm text-gray-500">Contractor #{contractor.id}</p>
          </div>
        </div>
      </div>

      {/* Contractor Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{contractor.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{contractor.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{contractor.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Cards</p>
          <p className="text-2xl font-semibold">{contractor.totalCards}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Used Cards</p>
          <p className="text-2xl font-semibold">{contractor.usedCards}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Customers</p>
          <p className="text-2xl font-semibold">{contractor.customers?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">${contractor.revenue || 0}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};