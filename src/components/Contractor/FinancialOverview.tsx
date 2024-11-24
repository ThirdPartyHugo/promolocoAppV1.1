import React from 'react';
import { DollarSign, TrendingUp, Users, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

interface ServiceRevenue {
  service: string;
  revenue: number;
  count: number;
  trend: number;
}

export const FinancialOverview: React.FC = () => {
  // Mock data
  const metrics = [
    { label: 'Total Revenue', value: '$12,450', trend: '+15.3%', icon: DollarSign },
    { label: 'Active Customers', value: '145', trend: '+8.2%', icon: Users },
    { label: 'Services This Month', value: '89', trend: '+12.5%', icon: Calendar },
    { label: 'Avg. Service Value', value: '$140', trend: '+5.7%', icon: TrendingUp },
  ];

  const serviceRevenue: ServiceRevenue[] = [
    { service: 'Oil Change', revenue: 4500, count: 45, trend: 12 },
    { service: 'Tire Change', revenue: 3200, count: 32, trend: -5 },
    { service: 'Labor Time', revenue: 2800, count: 28, trend: 8 },
    { service: 'Check Engine', revenue: 1950, count: 13, trend: 15 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Financial Overview</h2>

      {/* Key Metrics */}
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
              <span className="text-green-500 text-sm font-medium">{metric.trend}</span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Revenue Breakdown */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Service Revenue Breakdown</h3>
        <div className="space-y-6">
          {serviceRevenue.map((service) => (
            <div key={service.service} className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium">{service.service}</span>
                    <span className="text-sm text-gray-500 ml-2">({service.count} services)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">${service.revenue}</span>
                    <div className={`ml-2 flex items-center ${
                      service.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {service.trend > 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      <span className="text-sm">{Math.abs(service.trend)}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(service.revenue / 5000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Monthly Revenue Trend</h3>
        <div className="h-64 flex items-end justify-between">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((month, i) => (
            <div key={month} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-red-600 rounded-t"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};