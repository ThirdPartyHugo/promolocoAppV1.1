import React from 'react';
import { Map, ChartBar, Users, FileText, Settings, Bell } from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  items: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, items }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto">
        <nav className="flex space-x-1 p-2 overflow-x-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}