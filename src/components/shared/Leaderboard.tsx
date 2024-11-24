import React, { useState } from 'react';
import { Trophy, Medal, Calendar, DollarSign, DoorOpen } from 'lucide-react';

type TimeRange = 'day' | 'week' | 'month';
type LeaderboardType = 'sales' | 'doors';

interface LeaderboardEntry {
  id: string;
  name: string;
  teamName?: string;
  amount: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  avatar?: string;
}

interface LeaderboardProps {
  showTeams?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ showTeams = false }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [type, setType] = useState<LeaderboardType>('sales');

  // Mock data - in real app, fetch based on timeRange and type
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'John Smith',
      teamName: 'Team Alpha',
      amount: type === 'sales' ? 12500 : 45,
      rank: 1,
      trend: 'up',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
    },
    {
      id: '2',
      name: 'Sarah Connor',
      teamName: 'Team Beta',
      amount: type === 'sales' ? 10800 : 42,
      rank: 2,
      trend: 'up',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=random',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      teamName: 'Team Alpha',
      amount: type === 'sales' ? 9500 : 38,
      rank: 3,
      trend: 'down',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
    },
    {
      id: '4',
      name: 'Emma Davis',
      teamName: 'Team Gamma',
      amount: type === 'sales' ? 8900 : 35,
      rank: 4,
      trend: 'stable',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=random',
    },
    {
      id: '5',
      name: 'David Wilson',
      teamName: 'Team Beta',
      amount: type === 'sales' ? 8500 : 32,
      rank: 5,
      trend: 'up',
      avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=random',
    },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setType('sales')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                type === 'sales'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="w-4 h-4 inline-block mr-1" />
              Sales
            </button>
            <button
              onClick={() => setType('doors')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                type === 'doors'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DoorOpen className="w-4 h-4 inline-block mr-1" />
              Doors
            </button>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('day')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'day'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'week'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'month'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center p-4 rounded-lg ${
              entry.rank <= 3 ? 'bg-gray-50' : ''
            }`}
          >
            <div className={`text-2xl font-bold ${getRankColor(entry.rank)} w-8`}>
              {entry.rank}
            </div>
            <div className="flex-shrink-0 w-10 h-10 ml-4">
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="font-medium">{entry.name}</div>
              {showTeams && (
                <div className="text-sm text-gray-500">{entry.teamName}</div>
              )}
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {type === 'sales' ? (
                  <span>${entry.amount.toLocaleString()}</span>
                ) : (
                  <span>{entry.amount} doors</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {getTrendIcon(entry.trend)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};