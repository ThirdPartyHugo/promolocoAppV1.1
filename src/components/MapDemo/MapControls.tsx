import React from 'react';
import { Layers, Map as MapIcon, Thermometer, Draw, Pin } from 'lucide-react';

interface MapControlsProps {
  onMapTypeChange: (type: google.maps.MapTypeId) => void;
  onToggleHeatmap: (show: boolean) => void;
  currentMapType: google.maps.MapTypeId;
  showHeatmap: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onMapTypeChange,
  onToggleHeatmap,
  currentMapType,
  showHeatmap,
}) => {
  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      {/* Map Type Controls */}
      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className="space-y-2">
          <button
            onClick={() => onMapTypeChange(google.maps.MapTypeId.HYBRID)}
            className={`flex items-center w-full p-2 rounded-lg ${
              currentMapType === google.maps.MapTypeId.HYBRID
                ? 'bg-red-50 text-red-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <Layers className="w-5 h-5 mr-2" />
            <span>Satellite</span>
          </button>
          <button
            onClick={() => onMapTypeChange(google.maps.MapTypeId.ROADMAP)}
            className={`flex items-center w-full p-2 rounded-lg ${
              currentMapType === google.maps.MapTypeId.ROADMAP
                ? 'bg-red-50 text-red-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <MapIcon className="w-5 h-5 mr-2" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Drawing Controls */}
      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className="space-y-2">
          <button
            onClick={() => onToggleHeatmap(!showHeatmap)}
            className={`flex items-center w-full p-2 rounded-lg ${
              showHeatmap ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
            }`}
          >
            <Thermometer className="w-5 h-5 mr-2" />
            <span>Heatmap</span>
          </button>
          <button
            className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50"
          >
            <Draw className="w-5 h-5 mr-2" />
            <span>Draw</span>
          </button>
          <button
            className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50"
          >
            <Pin className="w-5 h-5 mr-2" />
            <span>Add Pin</span>
          </button>
        </div>
      </div>
    </div>
  );
};