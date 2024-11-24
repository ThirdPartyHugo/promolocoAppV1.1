export interface Service {
  id: string;
  name: string;
  cost: number;
}

export interface UsedService {
  serviceId: string;
  dateUsed: string;
}

export interface Customer {
  id: string;
  promoCard: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  servicesUsed: UsedService[];
}

export const availableServices: Service[] = [
  { id: 'oil-change', name: 'Oil Change', cost: 45.99 },
  { id: 'tire-change', name: 'Tire Change', cost: 25.99 },
  { id: 'labor-30min', name: '30min Labor Time', cost: 35.00 },
  { id: 'check-engine', name: 'Check Engine', cost: 29.99 }
];