import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, Users, MapPin, DollarSign, Target } from 'lucide-react';
import { OrganizationChart } from '../shared/OrganizationChart';

export const TeamManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

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
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Users className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Team Leaders</p>
              <p className="text-2xl font-semibold">4</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Users className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold">$156K</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Performance</p>
              <p className="text-2xl font-semibold">87%</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Target className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <OrganizationChart data={teamData} />
      </div>

      {/* Add/Edit Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {selectedMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                    <option value="teamLeader">Team Leader</option>
                    <option value="salesman">Salesman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Territory</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sales Target</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedMember(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    {selectedMember ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;