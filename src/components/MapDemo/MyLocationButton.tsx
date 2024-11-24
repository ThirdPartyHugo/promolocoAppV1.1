import React from 'react';
import { Navigation2 } from 'lucide-react';

interface MyLocationButtonProps {
  onClick: () => void;
}

export const MyLocationButton: React.FC<MyLocationButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
      title="Go to my location"
    >
      <Navigation2 className="w-6 h-6 text-gray-700" />
    </button>
  );
};