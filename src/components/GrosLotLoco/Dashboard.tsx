import React, { useState } from 'react';
import { Calendar, FileText, BarChart3, DollarSign, Users, Clock } from 'lucide-react';
import { SubmissionForm } from './SubmissionForm';
import { SalesStats } from './SalesStats';
import { MeetingSchedule } from './MeetingSchedule';
import { GoogleCalendar } from './GoogleCalendar';
import { GHLIntegration } from './GHLIntegration';

const GrosLotLocoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  const tabs = [
    { id: 'calendar', label: 'Calendar & GHL', icon: Calendar },
    { id: 'submissions', label: 'Submit Sale', icon: FileText },
    { id: 'stats', label: 'Sales Stats', icon: BarChart3 },
    { id: 'meetings', label: 'Meetings', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoogleCalendar />
            <GHLIntegration />
          </div>
        );
      case 'submissions':
        return <SubmissionForm />;
      case 'stats':
        return <SalesStats />;
      case 'meetings':
        return <MeetingSchedule />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <nav className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Gros Lot Loco</h2>
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

export default GrosLotLocoDashboard;