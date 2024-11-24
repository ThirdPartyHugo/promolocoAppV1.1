import React from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, mapContainerStyle, defaultCenter, libraries } from './MapConfig';

const getPoints = () => {
  const points = [];
  for (let i = 0; i < 100; i++) {
    points.push({
      location: new google.maps.LatLng(
        defaultCenter.lat + (Math.random() - 0.5) * 0.1,
        defaultCenter.lng + (Math.random() - 0.5) * 0.1
      ),
      weight: Math.random() * 10,
    });
  }
  return points;
};

export const Analytics = () => {
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
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeId: 'satellite',
      }}
    >
      <HeatmapLayer
        data={getPoints()}
        options={{
          radius: 20,
          opacity: 0.7,
          gradient: [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)',
          ],
        }}
      />
    </GoogleMap>
  );
};