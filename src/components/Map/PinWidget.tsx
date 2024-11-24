import React from 'react';
import { Home, XCircle, Clock, CheckCircle } from 'lucide-react';

export interface PinStatus {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const pinStatuses: PinStatus[] = [
  {
    id: 'not-home',
    label: 'Not Home',
    icon: Home,
    color: '#EAB308'
  },
  {
    id: 'not-interested',
    label: 'Not Interested',
    icon: XCircle,
    color: '#DC2626'
  },
  {
    id: 'comeback',
    label: 'Come Back',
    icon: Clock,
    color: '#2563EB'
  },
  {
    id: 'closed',
    label: 'Closed',
    icon: CheckCircle,
    color: '#16A34A'
  }
];

interface PinWidgetProps {
  onSelectStatus: (status: PinStatus) => void;
}

export const PinWidget: React.FC<PinWidgetProps> = ({ onSelectStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 z-10">
      <div className="space-y-2">
        {pinStatuses.map((status) => (
          <button
            key={status.id}
            onClick={() => onSelectStatus(status)}
            className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <status.icon className="w-5 h-5 mr-2" style={{ color: status.color }} />
            <span className="text-sm font-medium text-gray-700">{status.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};