import React from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, mapContainerStyle, defaultCenter, libraries } from './MapConfig';

export const TerritoryManager = () => {
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
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeId: 'satellite',
      }}
    >
      <DrawingManager
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
          polygonOptions: {
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
          },
          rectangleOptions: {
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
          },
        }}
      />
    </GoogleMap>
  );
};