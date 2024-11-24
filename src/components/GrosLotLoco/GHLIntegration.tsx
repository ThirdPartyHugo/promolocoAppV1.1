import React from 'react';
import { MessageSquare, Phone, Mail, CheckCircle } from 'lucide-react';

export const GHLIntegration: React.FC = () => {
  const conversations = [
    {
      id: 1,
      client: 'John Smith',
      lastMessage: "Thanks for the quote, I'll review it.",
      time: '10m ago',
      type: 'sms',
      status: 'unread',
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      lastMessage: 'When can you schedule the installation?',
      time: '1h ago',
      type: 'email',
      status: 'read',
    },
    {
      id: 3,
      client: 'Michael Brown',
      lastMessage: 'Missed call',
      time: '2h ago',
      type: 'call',
      status: 'missed',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">GHL Communications</h3>
        <div className="flex items-center text-sm text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Connected
        </div>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center p-4 rounded-lg ${
              conversation.status === 'unread' ? 'bg-red-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                conversation.status === 'unread' ? 'bg-red-100' : 'bg-gray-200'
              }`}>
                {getIcon(conversation.type)}
              </div>
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{conversation.client}</h4>
                <span className="text-sm text-gray-500">{conversation.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{conversation.lastMessage}</p>
            </div>
            {conversation.status === 'unread' && (
              <div className="ml-4">
                <span className="w-3 h-3 bg-red-600 rounded-full block"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Open GHL Dashboard
        </button>
      </div>
    </div>
  );
};