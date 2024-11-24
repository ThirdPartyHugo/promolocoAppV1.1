import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Users } from 'lucide-react';

interface Sale {
  id: string;
  date: string;
  customerName: string;
  promoCard: string;
  amount: number;
}

interface TeamCommission {
  teamMember: string;
  sales: number;
  commission: number;
}

interface PaySheetProps {
  name: string;
  role: 'salesman' | 'teamLeader';
  period: string;
  sales: Sale[];
  commission: {
    rate: number;
    amount: number;
    teamRate?: number;
    teamAmount?: number;
    teamSales?: TeamCommission[];
  };
  expenses: number;
  bonuses: number;
}

// Sample sales data generator
const generateSampleSales = (count: number): Sale[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `sale-${i + 1}`,
    date: new Date(2024, 2, Math.floor(Math.random() * 31) + 1).toLocaleDateString(),
    customerName: `Customer ${i + 1}`,
    promoCard: `1-${String(i + 1).padStart(3, '0')}`,
    amount: Math.floor(Math.random() * 3000) + 1000,
  }));
};

// Sample team sales data generator
const generateTeamSales = (count: number): TeamCommission[] => {
  return Array.from({ length: count }, (_, i) => ({
    teamMember: `Team Member ${i + 1}`,
    sales: Math.floor(Math.random() * 50000) + 20000,
    commission: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const PersonalPaySheet: React.FC<PaySheetProps> = ({
  name,
  role,
  period,
  commission,
  expenses,
  bonuses,
}) => {
  // Generate sample data
  const sales = generateSampleSales(8);
  const teamSales = role === 'teamLeader' ? generateTeamSales(4) : undefined;

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalTeamSales = teamSales?.reduce((sum, member) => sum + member.sales, 0) || 0;
  const totalTeamCommission = teamSales?.reduce((sum, member) => sum + member.commission, 0) || 0;
  const totalPayable = commission.amount + (commission.teamAmount || 0) - expenses + bonuses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Pay Sheet</h2>
          <p className="text-sm text-gray-500">{period}</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Personal Sales</p>
              <p className="text-2xl font-semibold mt-1">${totalSales.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {role === 'teamLeader' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Team Sales</p>
                <p className="text-2xl font-semibold mt-1">${totalTeamSales.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <Users className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sales Count</p>
              <p className="text-2xl font-semibold mt-1">{sales.length}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Final Payout</p>
              <p className="text-2xl font-semibold mt-1 text-green-600">
                ${totalPayable.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Commission Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Personal Commission ({commission.rate}%)</span>
              <span className="font-medium">${commission.amount.toLocaleString()}</span>
            </div>
            
            {role === 'teamLeader' && commission.teamAmount && commission.teamRate && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Team Commission ({commission.teamRate}%)</span>
                <span className="font-medium">${commission.teamAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 text-red-600">
              <span>Expenses</span>
              <span className="font-medium">-${expenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-green-600">
              <span>Bonuses</span>
              <span className="font-medium">+${bonuses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-medium">Total Payable</span>
              <span className="text-xl font-bold text-green-600">${totalPayable.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {role === 'teamLeader' && teamSales && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium">Team Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission Generated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamSales.map((member) => (
                  <tr key={member.teamMember} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{member.teamMember}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${member.sales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${member.commission.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Total</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    ${totalTeamSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    ${totalTeamCommission.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Personal Sales Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.promoCard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${sale.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  ${totalSales.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};