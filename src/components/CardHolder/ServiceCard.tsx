import React from 'react';
import { Settings, Wrench, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: React.ElementType;
  remainingUses?: number;
  totalUses?: number;
  isPremium?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onSelect: () => void;
  isPremium?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, isPremium }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${isPremium ? 'border-2 border-red-200' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-3 bg-red-50 rounded-full">
            <service.icon className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.duration}</p>
          </div>
        </div>
        {!isPremium && service.remainingUses !== undefined && (
          <span className="text-sm font-medium text-gray-600">
            {service.remainingUses}/{service.totalUses} remaining
          </span>
        )}
      </div>
      
      <p className="mt-4 text-sm text-gray-600">{service.description}</p>
      
      <button
        onClick={onSelect}
        className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium ${
          isPremium
            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        {isPremium ? 'Request Quote' : 'Book Service'}
      </button>
    </div>
  );
};