import React from 'react';
import { UserPlus } from 'lucide-react';
import { OrganizationChart } from '../shared/OrganizationChart';

export const TeamManagement: React.FC = () => {
  // Mock team structure data
  const teamData = [
    {
      id: '1',
      name: 'Sarah Connor',
      role: 'teamLeader',
      weeklySales: 45000,
      salesTarget: 50000,
      team: [
        {
          id: '2',
          name: 'John Smith',
          role: 'salesman',
          weeklySales: 12500,
          salesTarget: 15000,
        },
        {
          id: '3',
          name: 'Alice Johnson',
          role: 'salesman',
          weeklySales: 18000,
          salesTarget: 15000,
        },
        {
          id: '4',
          name: 'Mike Wilson',
          role: 'salesman',
          weeklySales: 9500,
          salesTarget: 15000,
        },
        {
          id: '5',
          name: 'Emma Davis',
          role: 'salesman',
          weeklySales: 5000,
          salesTarget: 15000,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Team Management</h2>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <UserPlus className="w-5 h-5 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <OrganizationChart data={teamData} />
      </div>
    </div>
  );
};

export default TeamManagement;