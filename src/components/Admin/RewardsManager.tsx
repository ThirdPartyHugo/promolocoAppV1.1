import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Gift } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  imageUrl?: string;
  quantity: number;
}

export const RewardsManager: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([
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
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleSaveReward = (reward: Reward) => {
    if (selectedReward) {
      setRewards(rewards.map(r => r.id === reward.id ? reward : r));
    } else {
      setRewards([...rewards, { ...reward, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setSelectedReward(null);
  };

  const handleDeleteReward = (id: string) => {
    setRewards(rewards.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rewards Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Reward
        </button>
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
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-medium">{reward.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{reward.category}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReward(reward);
                      setShowModal(true);
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteReward(reward.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{reward.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-red-600">{reward.cost} coins</span>
                <span className="text-sm text-gray-500">{reward.quantity} available</span>
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
                {selectedReward ? 'Edit Reward' : 'Add New Reward'}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const reward = {
                  id: selectedReward?.id || '',
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  cost: Number(formData.get('cost')),
                  category: formData.get('category') as string,
                  imageUrl: formData.get('imageUrl') as string || undefined,
                  quantity: Number(formData.get('quantity')),
                };
                handleSaveReward(reward);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedReward?.title}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedReward?.description}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    defaultValue={selectedReward?.category || 'Experience'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="Experience">Experience</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Physical">Physical Challenge</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost (coins)</label>
                    <input
                      type="number"
                      name="cost"
                      defaultValue={selectedReward?.cost}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={selectedReward?.quantity}
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                  <input
                    type="url"
                    name="imageUrl"
                    defaultValue={selectedReward?.imageUrl}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedReward(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    {selectedReward ? 'Save Changes' : 'Add Reward'}
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