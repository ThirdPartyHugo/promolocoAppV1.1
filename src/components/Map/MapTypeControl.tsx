import React from 'react';
import { Map, Layers } from 'lucide-react';

interface MapTypeControlProps {
  currentType: google.maps.MapTypeId;
  onChange: (type: google.maps.MapTypeId) => void;
}

export const MapTypeControl: React.FC<MapTypeControlProps> = ({ currentType, onChange }) => {
  const mapTypes = [
    { id: google.maps.MapTypeId.SATELLITE, label: 'Satellite', icon: Layers },
    { id: google.maps.MapTypeId.ROADMAP, label: 'Map', icon: Map },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <div className="space-y-2">
        {mapTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center w-full p-2 rounded-lg transition-colors ${
              currentType === id
                ? 'bg-red-50 text-red-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};