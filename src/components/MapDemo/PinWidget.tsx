import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface PinWidgetProps {
  selectedPin: string | null;
  onSelectPin: (pin: string | null) => void;
}

const pins = [
  { id: 'sales', label: 'Sale', color: '#16A34A', icon: MapPin },
  { id: 'not-home', label: 'Not Home', color: '#EAB308', icon: MapPin },
  { id: 'not-interested', label: 'Not Interested', color: '#DC2626', icon: MapPin },
  { id: 'comeback', label: 'Come Back', color: '#2563EB', icon: Clock },
];

export const PinWidget: React.FC<PinWidgetProps> = ({ selectedPin, onSelectPin }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
      {pins.map((pin) => (
        <button
          key={pin.id}
          onClick={() => onSelectPin(selectedPin === pin.id ? null : pin.id)}
          className={`flex items-center space-x-2 p-2 rounded-lg w-full transition-colors ${
            selectedPin === pin.id ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <pin.icon className="w-5 h-5" style={{ color: pin.color }} />
          <span className="text-sm text-gray-700">{pin.label}</span>
        </button>
      ))}
    </div>
  );
};