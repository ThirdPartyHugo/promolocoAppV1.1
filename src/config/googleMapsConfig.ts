import { LoadScriptProps } from '@react-google-maps/api';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyBn1qguY8gUoQ3Jq2hUyHvOV1eM_BGZelk';

export const defaultMapOptions = {
  mapTypeId: 'satellite',
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

export const loadScriptOptions: LoadScriptProps = {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['drawing', 'places', 'geometry'],
  version: 'weekly',
  language: 'en',
  region: 'US',
};