import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target, Award, Edit2 } from 'lucide-react';

export const SalesMetrics: React.FC = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goals, setGoals] = useState({
    weeklySales: 10000,
    closingRate: 45,
    customerVisits: 100,
  });

  const metrics = [
    { label: 'Today\'s Sales', value: '$2,450', icon: DollarSign, change: '+15.3%' },
    { label: 'Closing Rate', value: '38%', icon: TrendingUp, change: '+2.4%' },
    { label: 'Weekly Goal', value: '72%', icon: Target, change: '+8%' },
    { label: 'Performance Rank', value: '#3', icon: Award, change: 'Top 5' },
  ];

  const weeklyData = [
    { day: 'Mon', sales: 4, amount: 1200 },
    { day: 'Tue', sales: 6, amount: 1800 },
    { day: 'Wed', sales: 3, amount: 900 },
    { day: 'Thu', sales: 7, amount: 2100 },
    { day: 'Fri', sales: 5, amount: 1500 },
  ];

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setGoals({
      weeklySales: Number(formData.get('weeklySales')),
      closingRate: Number(formData.get('closingRate')),
      customerVisits: Number(formData.get('customerVisits')),
    });
    
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Sales Metrics</h2>
        <button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Edit2 className="w-5 h-5 mr-2" />
          Set Goals
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center">
                <span className="w-12 text-sm text-gray-500">{day.day}</span>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: `${(day.sales / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">{day.sales} sales</span>
                <span className="ml-4 text-sm text-gray-500">${day.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Goals Progress</h3>
            <p className="text-sm text-gray-500">Weekly Targets</p>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Weekly Sales Target</span>
                <span className="text-sm text-gray-500">$7,500/${goals.weeklySales.toLocaleString()}</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Closing Rate Goal</span>
                <span className="text-sm text-gray-500">38%/{goals.closingRate}%</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Customer Visits</span>
                <span className="text-sm text-gray-500">75/{goals.customerVisits}</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Setting Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Set Weekly Goals</h3>
              <form onSubmit={handleGoalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weekly Sales Target ($)</label>
                  <input
                    type="number"
                    name="weeklySales"
                    defaultValue={goals.weeklySales}
                    min="0"
                    step="100"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Closing Rate Goal (%)</label>
                  <input
                    type="number"
                    name="closingRate"
                    defaultValue={goals.closingRate}
                    min="0"
                    max="100"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Visits Goal</label>
                  <input
                    type="number"
                    name="customerVisits"
                    defaultValue={goals.customerVisits}
                    min="0"
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