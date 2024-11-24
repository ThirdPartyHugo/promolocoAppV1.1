import React from 'react';
import { Gift, Coins, ExternalLink } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  imageUrl?: string;
  quantity: number;
}

export const RewardsStore: React.FC = () => {
  const [rewards] = React.useState<Reward[]>([
    {
      id: '1',
      title: 'Training with Owner',
      description: '1-hour personal training session',
      cost: 1000,
      category: 'Experience',
      quantity: 5
    },
    {
      id: '2',
      title: 'Golf Day',
      description: 'Full day at premium golf course',
      cost: 5000,
      category: 'Experience',
      quantity: 3
    },
    {
      id: '3',
      title: 'Vacation Package',
      description: '3-day all-inclusive resort stay',
      cost: 10000,
      category: 'Vacation',
      quantity: 2
    }
  ]);

  const [userCoins] = React.useState(2500);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rewards Store</h2>
        <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
          <Coins className="w-5 h-5" />
          <span className="font-medium">{userCoins} coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-medium">{reward.title}</h3>
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