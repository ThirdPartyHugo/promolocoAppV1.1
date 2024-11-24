import React from 'react';
import { DollarSign } from 'lucide-react';
import { Customer, availableServices } from './types';

interface CustomerListProps {
  customers: Customer[];
  profits: Record<string, number>;
  onUpdateProfit: (customerId: string, profit: number) => void;
  onManageServices: (customer: Customer) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  profits,
  onUpdateProfit,
  onManageServices,
}) => {
  const calculateExpense = (customer: Customer) => {
    return customer.servicesUsed.reduce((total, service) => {
      const serviceInfo = availableServices.find(s => s.serviceId === service.serviceId);
      return total + (serviceInfo?.cost || 0);
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Promo Card
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Info
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Services
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expense
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profit
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => {
            const expense = calculateExpense(customer);
            return (
              <tr key={customer.id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {customer.promoCard}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-gray-500">{customer.email}</p>
                    <p className="text-gray-500">{customer.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {customer.servicesUsed.length} of {availableServices.length} services used
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{
                            width: `${(customer.servicesUsed.length / availableServices.length) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-sm text-red-600">
                    ${expense.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600">
                      ${(profits[customer.id] || 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        const profit = prompt('Enter profit amount:', (profits[customer.id] || 0).toString());
                        if (profit !== null) {
                          onUpdateProfit(customer.id, parseFloat(profit) || 0);
                        }
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <DollarSign className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onManageServices(customer)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Manage Services
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};