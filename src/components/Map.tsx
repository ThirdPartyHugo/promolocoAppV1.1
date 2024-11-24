import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 8rem)',
};

const defaultCenter = {
  lat: 45.5017,
  lng: -73.5673,
};

const libraries = ['drawing', 'visualization', 'places'] as const;

interface MapProps {
  apiKey: string;
}

export const Map: React.FC<MapProps> = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(newPos);
          if (map) {
            map.panTo(newPos);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map]);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentPosition}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeId: 'satellite',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      }}
    >
      <DrawingManager
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.POLYGON,
            ],
          },
          markerOptions: {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#f00',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#fff',
            },
          },
          polygonOptions: {
            fillColor: '#f00',
            fillOpacity: 0.3,
            strokeWeight: 2,
            strokeColor: '#f00',
            clickable: true,
            editable: true,
            draggable: true,
          },
        }}
      />
    </GoogleMap>
  );
};