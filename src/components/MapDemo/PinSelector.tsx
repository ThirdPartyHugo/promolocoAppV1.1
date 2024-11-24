import React from 'react';
import { MapPin } from 'lucide-react';

type PinType = 'sale' | 'notHome' | 'notInterested';

interface PinSelectorProps {
  selectedType: PinType | null;
  onSelect: (type: PinType | null) => void;
}

const pinTypes = [
  { id: 'sale', label: 'Sale', color: '#16A34A' },
  { id: 'notHome', label: 'Not Home', color: '#EAB308' },
  { id: 'notInterested', label: 'Not Interested', color: '#DC2626' },
] as const;

export const PinSelector: React.FC<PinSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
      {pinTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(selectedType === type.id ? null : type.id as PinType)}
          className={`flex items-center w-full p-2 rounded-lg transition-colors ${
            selectedType === type.id
              ? 'bg-gray-100'
              : 'hover:bg-gray-50'
          }`}
        >
          <MapPin
            className="w-5 h-5 mr-2"
            style={{ color: type.color }}
          />
          <span className="text-sm font-medium text-gray-700">
            {type.label}
          </span>
        </button>
      ))}
    </div>
  );
};