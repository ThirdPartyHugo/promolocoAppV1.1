import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

interface CardInfo {
  cardNumber: string;
  activationDate: string;
  expirationDate: string;
  isActive: boolean;
}

interface CardStatusProps {
  cardInfo: CardInfo;
}

export const CardStatus: React.FC<CardStatusProps> = ({ cardInfo }) => {
  const calculateRemainingTime = () => {
    const now = new Date();
    const expiration = new Date(cardInfo.expirationDate);
    const diffTime = expiration.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Expired';
    if (diffDays <= 30) return `${diffDays} days remaining`;
    if (diffDays <= 60) return 'About 2 months remaining';
    if (diffDays <= 90) return 'About 3 months remaining';
    return `${Math.floor(diffDays / 30)} months remaining`;
  };

  const getStatusColor = () => {
    const now = new Date();
    const expiration = new Date(cardInfo.expirationDate);
    const diffTime = expiration.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'bg-red-100 text-red-800';
    if (diffDays <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="font-medium">Promotional Card #{cardInfo.cardNumber}</h3>
            <p className="text-sm text-gray-500">
              Activated on {new Date(cardInfo.activationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {calculateRemainingTime()}
        </span>
      </div>

      <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600">
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
        <p>
          Your promotional card is valid until{' '}
          <span className="font-medium">
            {new Date(cardInfo.expirationDate).toLocaleDateString()}
          </span>
          . Make sure to use your services before they expire.
        </p>
      </div>

      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{
            width: `${(new Date().getTime() - new Date(cardInfo.activationDate).getTime()) / 
              (new Date(cardInfo.expirationDate).getTime() - new Date(cardInfo.activationDate).getTime()) * 100}%`
          }}
        />
      </div>
    </div>
  );
};