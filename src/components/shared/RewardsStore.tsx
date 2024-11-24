import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  imageUrl?: string;
}

interface RewardsStoreProps {
  balance: number;
  rewards: Reward[];
  onClaimReward: (rewardId: string) => void;
}

export const RewardsStore: React.FC<RewardsStoreProps> = ({ balance, rewards, onClaimReward }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Rewards Store</h3>
        <div className="text-sm text-gray-500">
          Available Balance: <span className="font-semibold text-red-600">{balance} coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-gray-50 rounded-lg overflow-hidden">
            {reward.imageUrl && (
              <img
                src={reward.imageUrl}
                alt={reward.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{reward.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-sm font-medium rounded">
                  {reward.category}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-red-600">{reward.cost} coins</span>
                <button
                  onClick={() => onClaimReward(reward.id)}
                  disabled={balance < reward.cost}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    balance >= reward.cost
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Claim
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};