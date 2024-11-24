import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, mapContainerStyle, defaultCenter, libraries } from './MapConfig';

const teamLocations = [
  { id: 1, name: 'John Smith', position: { lat: 45.5017, lng: -73.5673 } },
  { id: 2, name: 'Jane Doe', position: { lat: 45.5025, lng: -73.5685 } },
];

export const TeamLocations = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeId: 'satellite',
      }}
    >
      {teamLocations.map((member) => (
        <Marker
          key={member.id}
          position={member.position}
          title={member.name}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          }}
        />
      ))}
    </GoogleMap>
  );
};