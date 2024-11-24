import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { PinWidget } from './PinWidget';
import { CustomerForm } from './CustomerForm';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"];

interface MapProps {
  apiKey: string;
}

export const Map: React.FC<MapProps> = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 45.5017, lng: -73.5673 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newPos);
          if (map) {
            map.panTo(newPos);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [map]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-10">
        <PinWidget onSelectStatus={setSelectedStatus} />
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeId: 'satellite',
          zoomControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          mapTypeControl: false,
        }}
      >
      </GoogleMap>

      {showCustomerForm && selectedPosition && (
        <CustomerForm
          position={selectedPosition}
          onClose={() => {
            setShowCustomerForm(false);
            setSelectedPosition(null);
            setSelectedStatus(null);
          }}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};