import React from 'react';
import { Trophy, Clock, Target, Coins, Users } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  reward: number;
  target: number;
  progress: number;
  endDate: string;
  teamProgress?: {
    memberId: string;
    name: string;
    progress: number;
  }[];
}

export const ChallengesView: React.FC = () => {
  const [challenges] = React.useState<Challenge[]>([
    {
      id: '1',
      title: 'Team Sales Champion',
      description: 'Lead your team to the highest total sales this week',
      type: 'weekly',
      reward: 2000,
      target: 50000,
      progress: 35000,
      endDate: '2024-03-24',
      teamProgress: [
        { memberId: '1', name: 'John Smith', progress: 12000 },
        { memberId: '2', name: 'Alice Johnson', progress: 15000 },
        { memberId: '3', name: 'Bob Wilson', progress: 8000 },
      ],
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: 'Entire team arrives on time for the week',
      type: 'weekly',
      reward: 1000,
      target: 5,
      progress: 3,
      endDate: '2024-03-24',
    },
    {
      id: '3',
      title: 'Training Champion',
      description: 'Complete team training sessions',
      type: 'daily',
      reward: 500,
      target: 3,
      progress: 2,
      endDate: '2024-03-20',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Team Challenges</h2>
        <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
          <Coins className="w-5 h-5" />
          <span className="font-medium">5,000 coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="flex items-center text-red-600">
                <Coins className="w-4 h-4 mr-1" />
                <span className="font-medium">{challenge.reward}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-2">{challenge.description}</p>
            
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Team Progress</span>
                  <span className="font-medium">
                    {typeof challenge.progress === 'number' && typeof challenge.target === 'number'
                      ? challenge.progress >= 1000
                        ? `$${(challenge.progress / 1000).toFixed(1)}k / $${(challenge.target / 1000).toFixed(1)}k`
                        : `${challenge.progress} / ${challenge.target}`
                      : `${challenge.progress} / ${challenge.target}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  />
                </div>
              </div>

              {challenge.teamProgress && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Individual Contributions
                  </h4>
                  {challenge.teamProgress.map((member) => (
                    <div key={member.memberId} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{member.name}</span>
                        <span className="text-gray-700">${(member.progress / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-red-400 h-1.5 rounded-full"
                          style={{ width: `${(member.progress / challenge.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};