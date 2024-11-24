import React from 'react';
import { HeatmapLayer } from '@react-google-maps/api';

interface SalesHeatmapProps {
  data: {
    location: google.maps.LatLng;
    weight: number;
  }[];
}

export const SalesHeatmap: React.FC<SalesHeatmapProps> = ({ data }) => {
  return (
    <HeatmapLayer
      data={data}
      options={{
        radius: 20,
        opacity: 0.6,
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
          'rgba(255, 0, 0, 1)'
        ]
      }}
    />
  );
};