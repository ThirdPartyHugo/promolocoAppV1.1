import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target, Edit2 } from 'lucide-react';

export const SalesMetrics: React.FC = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goals, setGoals] = useState({
    teamSales: 50000,
    teamClosingRate: 45,
    teamSize: 10,
    averagePerformance: 85,
  });

  const metrics = [
    { label: 'Total Sales', value: '$45,678', icon: DollarSign, change: '+12.5%' },
    { label: 'Closing Rate', value: '42%', icon: TrendingUp, change: '+5.2%' },
    { label: 'Team Size', value: '8', icon: Users, change: '+1' },
    { label: 'Weekly Goal', value: '85%', icon: Target, change: '+15%' },
  ];

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setGoals({
      teamSales: Number(formData.get('teamSales')),
      teamClosingRate: Number(formData.get('teamClosingRate')),
      teamSize: Number(formData.get('teamSize')),
      averagePerformance: Number(formData.get('averagePerformance')),
    });
    
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Team Performance</h2>
        <button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Edit2 className="w-5 h-5 mr-2" />
          Set Team Goals
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <metric.icon className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">{metric.change}</span>
              <span className="text-gray-500 text-sm ml-2">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Team Goals Progress */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Team Goals Progress</h3>
          <p className="text-sm text-gray-500">Weekly Targets</p>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Team Sales Target</span>
              <span className="text-sm text-gray-500">$45,678/${goals.teamSales.toLocaleString()}</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Team Closing Rate</span>
              <span className="text-sm text-gray-500">42%/{goals.teamClosingRate}%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: '93%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Team Size</span>
              <span className="text-sm text-gray-500">8/{goals.teamSize}</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Average Performance</span>
              <span className="text-sm text-gray-500">82%/{goals.averagePerformance}%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Setting Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Set Team Goals</h3>
              <form onSubmit={handleGoalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Sales Target ($)</label>
                  <input
                    type="number"
                    name="teamSales"
                    defaultValue={goals.teamSales}
                    min="0"
                    step="1000"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Closing Rate (%)</label>
                  <input
                    type="number"
                    name="teamClosingRate"
                    defaultValue={goals.teamClosingRate}
                    min="0"
                    max="100"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Team Size</label>
                  <input
                    type="number"
                    name="teamSize"
                    defaultValue={goals.teamSize}
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Average Performance Goal (%)</label>
                  <input
                    type="number"
                    name="averagePerformance"
                    defaultValue={goals.averagePerformance}
                    min="0"
                    max="100"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowGoalModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Save Goals
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