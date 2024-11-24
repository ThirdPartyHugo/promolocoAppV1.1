import React, { useState } from 'react';
import { Calendar, Wrench, Settings, Clock, Plus, AlertCircle } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { ServiceBooking } from './ServiceBooking';
import { ContactInfo } from './ContactInfo';
import { ServiceCatalog } from './ServiceCatalog';
import { CustomServiceForm } from './CustomServiceForm';
import { CardStatus } from './CardStatus';

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

interface CardInfo {
  cardNumber: string;
  activationDate: string;
  expirationDate: string;
  isActive: boolean;
}

const CardHolderDashboard: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showCustomService, setShowCustomService] = useState(false);

  // Mock card data
  const cardInfo: CardInfo = {
    cardNumber: "1-001",
    activationDate: "2024-03-15",
    expirationDate: "2025-03-15",
    isActive: true
  };

  const services: Service[] = [
    {
      id: 'oil-change',
      name: 'Oil Change',
      description: 'Complete oil change service with quality oil and filter',
      duration: '30-45 min',
      icon: Settings,
      remainingUses: 2,
      totalUses: 2
    },
    {
      id: 'tire-change',
      name: 'Tire Change',
      description: 'Professional tire change and balancing service',
      duration: '45-60 min',
      icon: Wrench,
      remainingUses: 1,
      totalUses: 1
    },
    {
      id: 'labor-time',
      name: 'Labor Time',
      description: 'General maintenance and repair services',
      duration: '30 min blocks',
      icon: Clock,
      remainingUses: 2,
      totalUses: 2
    },
    {
      id: 'brake-service',
      name: 'Brake Service',
      description: 'Brake inspection and maintenance',
      duration: '60-90 min',
      icon: Wrench,
      isPremium: true
    },
    {
      id: 'engine-diagnostic',
      name: 'Engine Diagnostic',
      description: 'Complete engine diagnostic scan',
      duration: '30-45 min',
      icon: Settings,
      isPremium: true
    }
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Status */}
          <CardStatus cardInfo={cardInfo} />

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Services</h2>
            <button
              onClick={() => setShowCustomService(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Custom Service
            </button>
          </div>

          <ServiceCatalog
            services={services.filter(s => !s.isPremium)}
            onSelect={handleServiceSelect}
          />

          {/* Premium Services */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services
                .filter(s => s.isPremium)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={() => handleServiceSelect(service)}
                    isPremium
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <ContactInfo />
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedService && (
        <ServiceBooking
          service={selectedService}
          onClose={() => {
            setShowBooking(false);
            setSelectedService(null);
          }}
        />
      )}

      {/* Custom Service Modal */}
      {showCustomService && (
        <CustomServiceForm
          onClose={() => setShowCustomService(false)}
          onSubmit={(data) => {
            console.log('Custom service request:', data);
            setShowCustomService(false);
          }}
        />
      )}
    </div>
  );
};

export default CardHolderDashboard;