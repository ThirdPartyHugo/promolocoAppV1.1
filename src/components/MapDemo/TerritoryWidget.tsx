import React from 'react';
import { Pencil } from 'lucide-react';

interface TerritoryWidgetProps {
  isDrawing: boolean;
  onToggle: () => void;
}

export const TerritoryWidget: React.FC<TerritoryWidgetProps> = ({ isDrawing, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 ${
        isDrawing ? 'ring-2 ring-red-500' : ''
      }`}
      title="Draw territory"
    >
      <Pencil className="w-6 h-6 text-gray-700" />
    </button>
  );
};