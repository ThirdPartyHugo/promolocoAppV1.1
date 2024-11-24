import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

interface MapProps {
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
  }>;
}

const MapComponent: React.FC<MapProps> = ({ markers = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBn1qguY8gUoQ3Jq2hUyHvOV1eM_BGZelk'
  });

  return isLoaded ? (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      Loading map...
    </div>
  );
};

export default MapComponent;