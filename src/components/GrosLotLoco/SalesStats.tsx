import React from 'react';
import { DollarSign, Calendar, Clock, AlertCircle } from 'lucide-react';

export const SalesStats: React.FC = () => {
  const stats = [
    { label: 'Sales Count', value: '24', icon: DollarSign },
    { label: 'Total Sales', value: '$156,000', icon: DollarSign },
    { label: 'Upcoming Installations', value: '8', icon: Calendar },
    { label: 'Pending Callbacks', value: '3', icon: Clock },
    { label: 'Unclosed Submissions', value: '5', icon: AlertCircle },
  ];

  const commissionRates = [
    { range: '0-50k', rate: '8%' },
    { range: '50k-100k', rate: '10%' },
    { range: '100k-150k', rate: '12%' },
    { range: '150k+', rate: '15%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <stat.icon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Plan */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Commission Plan</h3>
          <div className="space-y-4">
            {commissionRates.map((tier) => (
              <div key={tier.range} className="flex items-center justify-between">
                <span className="text-gray-600">${tier.range}</span>
                <span className="font-medium">{tier.rate}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-500">Current: $156,000</span>
              <span className="text-gray-500">Next Tier: $200,000</span>
            </div>
          </div>
        </div>

        {/* Pay Sheet Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Current Pay Sheet</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Gross Sales</span>
              <span className="font-medium">$156,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Base Commission (12%)</span>
              <span className="font-medium">$18,720</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Bonuses</span>
              <span className="text-green-600 font-medium">+$2,500</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Deductions</span>
              <span className="text-red-600 font-medium">-$500</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold">Net Commission</span>
              <span className="text-xl font-bold text-red-600">$20,720</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};