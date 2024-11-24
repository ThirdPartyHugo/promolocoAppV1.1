import React from 'react';
import { Wallet, Trophy, Gift } from 'lucide-react';

interface WalletProps {
  balance: number;
  activeChallenges: {
    id: string;
    title: string;
    progress: number;
    target: number;
    reward: number;
  }[];
}

export const RewardsWallet: React.FC<WalletProps> = ({ balance, activeChallenges }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">My Rewards Wallet</h3>
        <div className="flex items-center bg-red-50 px-4 py-2 rounded-lg">
          <Wallet className="w-5 h-5 text-red-600 mr-2" />
          <span className="font-semibold text-red-600">{balance} coins</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Active Challenges</h4>
        {activeChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-medium">{challenge.title}</span>
              </div>
              <span className="text-sm text-red-600 font-medium">+{challenge.reward} coins</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{challenge.progress} / {challenge.target}</span>
              <span className="text-xs text-gray-500">
                {Math.round((challenge.progress / challenge.target) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};