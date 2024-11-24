import React from 'react';
import { Gift, Coins, ExternalLink, Users } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  imageUrl?: string;
  quantity: number;
  teamReward?: boolean;
}

export const RewardsStore: React.FC = () => {
  const [rewards] = React.useState<Reward[]>([
    {
      id: '1',
      title: 'Leadership Training',
      description: 'Full-day leadership workshop with industry experts',
      cost: 2000,
      category: 'Training',
      quantity: 3
    },
    {
      id: '2',
      title: 'Team Building Event',
      description: 'Organize a custom team building event',
      cost: 3000,
      category: 'Experience',
      quantity: 2,
      teamReward: true
    },
    {
      id: '3',
      title: 'Executive Lunch',
      description: 'Private lunch with company executives',
      cost: 1500,
      category: 'Experience',
      quantity: 5
    },
    {
      id: '4',
      title: 'Team Vacation Package',
      description: '2-day team retreat at luxury resort',
      cost: 15000,
      category: 'Vacation',
      quantity: 1,
      teamReward: true
    }
  ]);

  const [userCoins] = React.useState(5000);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Leadership Rewards</h2>
        <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
          <Coins className="w-5 h-5" />
          <span className="font-medium">{userCoins} coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {reward.imageUrl && (
              <img
                src={reward.imageUrl}
                alt={reward.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="w-5 h-5 text-red-600 mr-2" />
                  <h3 className="font-medium">{reward.title}</h3>
                </div>
                {reward.teamReward && (
                  <span className="flex items-center text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    <Users className="w-3 h-3 mr-1" />
                    Team Reward
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">{reward.category}</span>
              <p className="text-sm text-gray-600 mt-2">{reward.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-yellow-700">
                  <Coins className="w-5 h-5 mr-1" />
                  <span className="font-semibold">{reward.cost}</span>
                </div>
                <span className="text-sm text-gray-500">{reward.quantity} available</span>
              </div>

              <button
                disabled={userCoins < reward.cost || reward.quantity === 0}
                className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-lg ${
                  userCoins >= reward.cost && reward.quantity > 0
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {userCoins >= reward.cost ? (
                  <>
                    <span>Redeem Reward</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  'Insufficient Coins'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};