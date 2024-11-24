import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Customer, Service, UsedService, availableServices } from './types';

interface ServiceUsageModalProps {
  customer: Customer;
  onClose: () => void;
  onUpdateServices: (customerId: string, services: UsedService[]) => void;
}

export const ServiceUsageModal: React.FC<ServiceUsageModalProps> = ({
  customer,
  onClose,
  onUpdateServices,
}) => {
  const handleToggleService = (serviceId: string) => {
    const isUsed = customer.servicesUsed.some(s => s.serviceId === serviceId);
    let updatedServices: UsedService[];

    if (isUsed) {
      updatedServices = customer.servicesUsed.filter(s => s.serviceId !== serviceId);
    } else {
      updatedServices = [
        ...customer.servicesUsed,
        { serviceId, dateUsed: new Date().toISOString() }
      ];
    }

    onUpdateServices(customer.id, updatedServices);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Services for {customer.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.map((service) => {
            const isUsed = customer.servicesUsed.some(
              s => s.serviceId === service.id
            );
            return (
              <div
                key={service.id}
                className={`p-4 rounded-lg border ${
                  isUsed ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-gray-500">
                      Cost: ${service.cost.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleService(service.id)}
                    className={`p-2 rounded-full ${
                      isUsed
                        ? 'text-green-500 hover:text-green-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};