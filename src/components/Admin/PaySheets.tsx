import React, { useState } from 'react';
import { DollarSign, Plus, Download, Search, Users, ArrowLeft, Filter } from 'lucide-react';

// Generate sample paysheet data
const generateSamplePaysheets = () => {
  const salespeople = [
    'John Smith',
    'Sarah Connor',
    'Mike Wilson',
    'Emma Davis',
    'David Brown',
    'Alice Johnson',
  ];

  return salespeople.map((name, index) => {
    const sales = Math.floor(Math.random() * 50000) + 10000;
    const commission = sales * 0.1;
    const expenses = Math.floor(Math.random() * 1000);
    const bonuses = Math.floor(Math.random() * 2000);

    const customers = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
      id: `customer-${index}-${i}`,
      name: `Customer ${i + 1}`,
      promoCard: `${index + 1}-${String(i + 1).padStart(3, '0')}`,
      amount: Math.floor(Math.random() * 3000) + 1000,
      date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1).toLocaleDateString(),
    }));

    return {
      id: `paysheet-${index}`,
      userId: `user-${index}`,
      salesmanName: name,
      period: 'March 2024',
      sales,
      commission,
      expenses,
      bonuses,
      totalPayable: commission - expenses + bonuses,
      customers,
    };
  });
};

export const PaySheets: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedPaysheet, setSelectedPaysheet] = useState<any | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [view, setView] = useState<'list' | 'details'>('list');
  const [paysheets] = useState(generateSamplePaysheets());

  const handleBack = () => {
    setView('list');
    setSelectedPaysheet(null);
    setCustomerSearch('');
  };

  const filteredCustomers = selectedPaysheet?.customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.promoCard.includes(customerSearch)
  ) || [];

  if (view === 'details' && selectedPaysheet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedPaysheet.salesmanName}'s Pay Sheet
              </h2>
              <p className="text-sm text-gray-500">{selectedPaysheet.period}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddExpense(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense/Bonus
            </button>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Commission Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="text-lg font-medium">${selectedPaysheet.sales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Commission (10%)</span>
                  <span className="text-lg font-medium">${selectedPaysheet.commission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-red-600">
                  <span>Expenses</span>
                  <span className="text-lg font-medium">-${selectedPaysheet.expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Bonuses</span>
                  <span className="text-lg font-medium">+${selectedPaysheet.bonuses.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Commission</span>
                    <span className="text-xl font-bold text-green-600">
                      ${selectedPaysheet.totalPayable.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Sales</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search customers..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 w-64"
                      />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Promo Card
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer: any) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.promoCard}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                            ${customer.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        ${filteredCustomers.reduce((sum: number, customer: any) => sum + customer.amount, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pay Sheets</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="current">Current Period</option>
            <option value="last">Last Period</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <Download className="w-5 h-5 mr-2" />
            Export All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          {paysheets.map((paysheet) => (
            <div
              key={paysheet.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => {
                setSelectedPaysheet(paysheet);
                setView('details');
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-gray-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{paysheet.salesmanName}</h3>
                    <p className="text-sm text-gray-500">{paysheet.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-lg font-medium">${paysheet.sales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Commission</p>
                    <p className="text-lg font-medium text-green-600">${paysheet.totalPayable.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Expense or Bonus</h3>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const type = formData.get('type') as 'expense' | 'bonus';
                const amount = Number(formData.get('amount'));
                setShowAddExpense(false);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    name="type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="bonus">Bonus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="amount"
                      min="0"
                      step="0.01"
                      required
                      className="pl-10 block w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddExpense(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Add
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