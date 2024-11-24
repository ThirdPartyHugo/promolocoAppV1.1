import React from 'react';
import { Map } from './Map';

const MapDemo: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">
        <Map apiKey="AIzaSyBn1qguY8gUoQ3Jq2hUyHvOV1eM_BGZelk" />
      </div>
    </div>
  );
};

export default MapDemo;