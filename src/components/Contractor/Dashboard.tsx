import React, { useState } from 'react';
import { CustomerManagement } from './CustomerManagement';
import { ServicePricing } from './ServicePricing';
import { ServiceCalendar } from './ServiceCalendar';
import { FinancialOverview } from './FinancialOverview';
import { Users, Settings, DollarSign, Calendar } from 'lucide-react';

const ContractorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('calendar');

  const tabs = [
    { id: 'calendar', label: 'Service Calendar', icon: Calendar },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'services', label: 'Service Pricing', icon: Settings },
    { id: 'financials', label: 'Financial Overview', icon: DollarSign },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <ServiceCalendar />;
      case 'customers':
        return <CustomerManagement />;
      case 'services':
        return <ServicePricing />;
      case 'financials':
        return <FinancialOverview />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <nav className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Contractor Dashboard</h2>
        </div>
        <ul className="space-y-2 p-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default ContractorDashboard;