/// <reference types="vite/client" />

interface Window {
  google?: {
    maps: any;
  };
}

declare module 'google.maps' {
  export interface MapMouseEvent {
    latLng?: google.maps.LatLng;
  }
}