import React from 'react';
import { Map, Users } from 'lucide-react';

const MapDashboard = () => {
  const territories = [
    { id: 1, name: 'North Zone', assignedTo: 'John Doe', status: 'active' },
    { id: 2, name: 'South Zone', assignedTo: 'Jane Smith', status: 'pending' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Map className="w-5 h-5 text-red-600" />
          Territory Management
        </h3>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Assign Territory
        </button>
      </div>
      <div className="space-y-4">
        {territories.map((territory) => (
          <div key={territory.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <h4 className="font-medium">{territory.name}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {territory.assignedTo}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              territory.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {territory.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapDashboard;