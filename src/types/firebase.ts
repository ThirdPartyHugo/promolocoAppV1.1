import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'teamLeader' | 'salesman' | 'contractor' | 'groslotloco' | 'cardholder';

export interface FirebaseUser {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  teamId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseTeam {
  id: string;
  name: string;
  leaderId: string;
  territory: string;
  salesTarget: number;
  memberIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseService {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseContractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessNumber: string;
  totalCards: number;
  usedCards: number;
  status: 'active' | 'inactive';
  contractStatus: 'pending' | 'signed' | 'none';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  salesmanId: string;
  teamId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseSale {
  id: string;
  customerId: string;
  salesmanId: string;
  teamId?: string;
  promoCardId: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
  position: {
    lat: number;
    lng: number;
  };
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebasePromoCard {
  id: string;
  number: string;
  contractorId: string;
  assignedTo?: string;
  status: 'available' | 'assigned' | 'used';
  usedBy?: string;
  usedAt?: Timestamp;
  customerId?: string;
  saleId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebasePaysheet {
  id: string;
  salesmanId: string;
  teamId?: string;
  period: string;
  sales: number;
  commission: number;
  expenses: number;
  bonuses: number;
  totalPayable: number;
  customers: {
    id: string;
    name: string;
    promoCard: string;
    amount: number;
    date: Timestamp;
  }[];
  teamMembers?: {
    salesmanId: string;
    name: string;
    amount: number;
    commission: number;
    date: Timestamp;
  }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}