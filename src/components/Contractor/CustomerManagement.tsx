import React, { useState } from 'react';
import { CustomerList } from './CustomerList';
import { ServiceUsageModal } from './ServiceUsageModal';
import { Customer, UsedService } from './types';
import { generateSampleCustomers } from './utils';

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(generateSampleCustomers());
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showServiceUsageModal, setShowServiceUsageModal] = useState(false);
  const [profits, setProfits] = useState<Record<string, number>>({});

  const handleUpdateProfit = (customerId: string, profit: number) => {
    setProfits(prev => ({
      ...prev,
      [customerId]: profit
    }));
  };

  const handleUpdateServices = (customerId: string, services: UsedService[]) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId
        ? { ...customer, servicesUsed: services }
        : customer
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Management</h2>
      
      <CustomerList
        customers={customers}
        profits={profits}
        onUpdateProfit={handleUpdateProfit}
        onManageServices={(customer) => {
          setSelectedCustomer(customer);
          setShowServiceUsageModal(true);
        }}
      />

      {showServiceUsageModal && selectedCustomer && (
        <ServiceUsageModal
          customer={selectedCustomer}
          onClose={() => {
            setShowServiceUsageModal(false);
            setSelectedCustomer(null);
          }}
          onUpdateServices={handleUpdateServices}
        />
      )}
    </div>
  );
};