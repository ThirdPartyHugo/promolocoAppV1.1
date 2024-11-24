import React from 'react';
import { ServiceCard } from './ServiceCard';

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

interface ServiceCatalogProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ services, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onSelect={() => onSelect(service)}
        />
      ))}
    </div>
  );
};