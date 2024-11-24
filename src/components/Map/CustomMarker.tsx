import React from 'react';
import { PinStatus } from './PinWidget';

interface MarkerProps {
  position: google.maps.LatLngLiteral;
  status: PinStatus;
  onClick?: () => void;
}

export const CustomMarker: React.FC<MarkerProps> = ({ position, status, onClick }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null);

  React.useEffect(() => {
    if (!window.google) return;

    const svgMarker = {
      path: 'M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z',
      fillColor: getColorForStatus(status.id),
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 2,
    };

    const newMarker = new google.maps.Marker({
      position,
      icon: svgMarker,
      title: status.label,
    });

    if (onClick) {
      newMarker.addListener('click', onClick);
    }

    setMarker(newMarker);

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [position, status]);

  return null;
};

function getColorForStatus(statusId: string): string {
  switch (statusId) {
    case 'not-home':
      return '#EAB308'; // yellow-600
    case 'not-interested':
      return '#DC2626'; // red-600
    case 'comeback':
      return '#2563EB'; // blue-600
    case 'closed':
      return '#16A34A'; // green-600
    default:
      return '#6B7280'; // gray-500
  }
}