import React, { useState } from 'react';
import { BarChart3, Users, MapPin, Network, Search, DollarSign, Building2, Trophy, Gift, CreditCard } from 'lucide-react';
import { SalesOverview } from './SalesOverview';
import { TeamManagement } from './TeamManagement';
import { CustomerSearch } from './CustomerSearch';
import { PaySheets } from './PaySheets';
import { ContractorManagement } from './ContractorManagement';
import { ChallengesManager } from './ChallengesManager';
import { RewardsManager } from './RewardsManager';
import { PromoCardManagement } from './PromoCardManagement';
import { Leaderboard } from '../shared/Leaderboard';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Overview', icon: BarChart3 },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'customers', label: 'Customer Search', icon: Search },
    { id: 'paysheets', label: 'Pay Sheets', icon: DollarSign },
    { id: 'contractors', label: 'Contractors', icon: Building2 },
    { id: 'cards', label: 'Promo Cards', icon: CreditCard },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'rewards', label: 'Rewards Store', icon: Gift },
    { id: 'leaderboard', label: 'Leaderboard', icon: Network },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'sales':
        return <SalesOverview />;
      case 'team':
        return <TeamManagement />;
      case 'customers':
        return <CustomerSearch />;
      case 'paysheets':
        return <PaySheets />;
      case 'contractors':
        return <ContractorManagement />;
      case 'cards':
        return <PromoCardManagement />;
      case 'challenges':
        return <ChallengesManager />;
      case 'rewards':
        return <RewardsManager />;
      case 'leaderboard':
        return <Leaderboard showTeams />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <nav className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
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

export default AdminDashboard;