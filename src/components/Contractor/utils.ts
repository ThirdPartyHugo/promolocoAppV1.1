import { Customer } from './types';

export const generateSampleCustomers = (): Customer[] => {
  return Array.from({ length: 500 }, (_, index) => ({
    id: `customer-${index + 1}`,
    promoCard: `PC${Math.floor(index / 500) + 1}-${(index % 500) + 1}`,
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    address: `${Math.floor(Math.random() * 9000) + 1000} Main St, City, State 12345`,
    servicesUsed: []
  }));
};