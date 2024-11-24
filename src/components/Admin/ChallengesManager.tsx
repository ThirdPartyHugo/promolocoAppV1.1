import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Trophy } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  reward: number;
  target: number;
  startDate: string;
  endDate: string;
}

export const ChallengesManager: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'First Door Knock',
      description: 'Be the first to knock on a door today',
      type: 'daily',
      reward: 100,
      target: 1,
      startDate: '2024-03-20',
      endDate: '2024-03-20'
    },
    {
      id: '2',
      title: 'Weekly Sales Champion',
      description: 'Achieve the highest sales this week',
      type: 'weekly',
      reward: 1000,
      target: 10,
      startDate: '2024-03-18',
      endDate: '2024-03-24'
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleSaveChallenge = (challenge: Challenge) => {
    if (selectedChallenge) {
      setChallenges(challenges.map(c => c.id === challenge.id ? challenge : c));
    } else {
      setChallenges([...challenges, { ...challenge, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setSelectedChallenge(null);
  };

  const handleDeleteChallenge = (id: string) => {
    setChallenges(challenges.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Challenges Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Challenge
        </button>
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
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setShowModal(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteChallenge(challenge.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{challenge.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reward:</span>
                <span className="font-medium text-red-600">{challenge.reward} coins</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Target:</span>
                <span className="font-medium">{challenge.target}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Period:</span>
                <span className="font-medium">
                  {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {selectedChallenge ? 'Edit Challenge' : 'Add New Challenge'}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const challenge = {
                  id: selectedChallenge?.id || '',
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  type: formData.get('type') as 'daily' | 'weekly',
                  reward: Number(formData.get('reward')),
                  target: Number(formData.get('target')),
                  startDate: formData.get('startDate') as string,
                  endDate: formData.get('endDate') as string,
                };
                handleSaveChallenge(challenge);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedChallenge?.title}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedChallenge?.description}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    name="type"
                    defaultValue={selectedChallenge?.type || 'daily'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reward (coins)</label>
                    <input
                      type="number"
                      name="reward"
                      defaultValue={selectedChallenge?.reward}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target</label>
                    <input
                      type="number"
                      name="target"
                      defaultValue={selectedChallenge?.target}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      defaultValue={selectedChallenge?.startDate}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      defaultValue={selectedChallenge?.endDate}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedChallenge(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    {selectedChallenge ? 'Save Changes' : 'Add Challenge'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};