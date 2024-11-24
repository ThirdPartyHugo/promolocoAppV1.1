export const GOOGLE_MAPS_API_KEY = 'AIzaSyBn1qguY8gUoQ3Jq2hUyHvOV1eM_BGZelk';

export const defaultMapConfig = {
  center: { lat: 40.7128, lng: -74.0060 }, // New York City as default
  zoom: 12,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#242f3e' }]
    }
  ]
};