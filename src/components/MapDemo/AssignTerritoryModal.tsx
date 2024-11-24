import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

interface Salesman {
  id: string;
  name: string;
}

interface AssignTerritoryModalProps {
  onClose: () => void;
  onAssign: (salesmanId: string, color: string) => void;
}

// Predefined colors for territories
const territoryColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#800080', // Purple
  '#008080', // Teal
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#4B0082', // Indigo
  '#006400', // Dark Green
];

// Mock salesmen data (replace with real data from your backend)
const mockSalesmen: Salesman[] = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Mike Wilson' },
];

export const AssignTerritoryModal: React.FC<AssignTerritoryModalProps> = ({
  onClose,
  onAssign,
}) => {
  const [selectedSalesman, setSelectedSalesman] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(territoryColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSalesman) {
      onAssign(selectedSalesman, selectedColor);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold">Assign Territory</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Salesman
            </label>
            <select
              value={selectedSalesman}
              onChange={(e) => setSelectedSalesman(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Choose a salesman...</option>
              {mockSalesmen.map((salesman) => (
                <option key={salesman.id} value={salesman.id}>
                  {salesman.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Territory Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {territoryColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-900' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedSalesman}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Territory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};