import React, { useState } from 'react';
import { Calendar, DoorClosed, CreditCard, DollarSign, TrendingUp, Users, Target, Award } from 'lucide-react';

type TimeRange = 'day' | 'week' | 'month' | 'year';

export const SalesOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const metrics = [
    { label: 'Doors Knocked', value: '1,234', icon: DoorClosed, change: '+12.5%' },
    { label: 'Promo Cards Used', value: '456/1000', icon: CreditCard, change: '45.6%' },
    { label: 'Total Sales', value: '$45,678', icon: DollarSign, change: '+15.3%' },
    { label: 'Net Profit', value: '$12,345', icon: TrendingUp, change: '+18.2%' },
  ];

  // Mock data for performance metrics
  const teamPerformance = [
    { name: 'Team Alpha', sales: 156000, target: 200000, members: 5 },
    { name: 'Team Beta', sales: 142000, target: 180000, members: 4 },
    { name: 'Team Gamma', sales: 98000, target: 150000, members: 3 },
  ];

  const topPerformers = [
    { name: 'John Smith', sales: 45000, closingRate: '68%', team: 'Alpha' },
    { name: 'Sarah Connor', sales: 42000, closingRate: '65%', team: 'Beta' },
    { name: 'Mike Wilson', sales: 38000, closingRate: '62%', team: 'Alpha' },
    { name: 'Alice Johnson', sales: 35000, closingRate: '60%', team: 'Gamma' },
  ];

  const salesByRegion = [
    { region: 'North Zone', sales: 180000, growth: '+15%', activeSalesmen: 8 },
    { region: 'South Zone', sales: 165000, growth: '+12%', activeSalesmen: 7 },
    { region: 'East Zone', sales: 145000, growth: '+18%', activeSalesmen: 6 },
    { region: 'West Zone', sales: 135000, growth: '+10%', activeSalesmen: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Sales Overview</h2>
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
          {(['day', 'week', 'month', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
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
              <span className="text-gray-500 text-sm ml-2">vs last {timeRange}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <div className="space-y-4">
            {teamPerformance.map((team) => (
              <div key={team.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{team.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({team.members} members)</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">${(team.sales / 1000).toFixed(1)}k</span>
                    <span className="text-gray-500 ml-2">/ ${(team.target / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (team.sales / team.target) >= 0.9
                        ? 'bg-green-500'
                        : (team.sales / team.target) >= 0.7
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(team.sales / team.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{performer.name}</span>
                      <span className="text-sm text-gray-500 ml-2">Team {performer.team}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">${(performer.sales / 1000).toFixed(1)}k</span>
                      <span className="text-gray-500 ml-2">({performer.closingRate})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Regional Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesByRegion.map((region) => (
            <div key={region.region} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">{region.region}</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sales</span>
                  <span className="font-medium">${(region.sales / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Growth</span>
                  <span className="text-green-600">{region.growth}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active Salesmen</span>
                  <span className="font-medium">{region.activeSalesmen}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};