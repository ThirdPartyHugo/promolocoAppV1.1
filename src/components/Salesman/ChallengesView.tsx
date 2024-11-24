import React from 'react';
import { Trophy, Clock, Target, Coins } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  reward: number;
  target: number;
  progress: number;
  endDate: string;
}

export const ChallengesView: React.FC = () => {
  const [challenges] = React.useState<Challenge[]>([
    {
      id: '1',
      title: 'First Door Knock',
      description: 'Be the first to knock on a door today',
      type: 'daily',
      reward: 100,
      target: 1,
      progress: 0,
      endDate: '2024-03-20'
    },
    {
      id: '2',
      title: 'Weekly Sales Champion',
      description: 'Achieve the highest sales this week',
      type: 'weekly',
      reward: 1000,
      target: 10,
      progress: 7,
      endDate: '2024-03-24'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Active Challenges</h2>
        <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
          <Coins className="w-5 h-5" />
          <span className="font-medium">2,500 coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-red-600 mr-3" />
                <div>
                  <h3 className="font-medium">{challenge.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    challenge.type === 'daily' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {challenge.type}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{challenge.description}</p>
            
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{challenge.progress} / {challenge.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-red-600">
                  <Coins className="w-4 h-4 mr-1" />
                  <span className="font-medium">{challenge.reward}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};