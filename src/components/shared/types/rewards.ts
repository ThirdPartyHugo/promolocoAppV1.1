export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'weekly' | 'monthly';
  condition: {
    type: 'firstKnock' | 'mostSales' | 'salesTarget' | 'closingRate';
    target?: number;
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'experience' | 'physical' | 'challenge' | 'vacation';
  imageUrl?: string;
  available: boolean;
}

export interface UserWallet {
  userId: string;
  balance: number;
  earnedRewards: {
    challengeId: string;
    amount: number;
    date: string;
  }[];
  claimedRewards: {
    rewardId: string;
    date: string;
    status: 'pending' | 'approved' | 'claimed';
  }[];
}