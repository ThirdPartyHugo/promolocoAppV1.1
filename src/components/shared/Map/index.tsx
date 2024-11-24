import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager, Marker } from '@react-google-maps/api';
import { MapPin, Map as MapIcon, Navigation, Pencil } from 'lucide-react';
import { PinWidget } from './PinWidget';
import { CustomerForm } from './CustomerForm';
import { AssignTerritoryModal } from './AssignTerritoryModal';
import { LocationSearch } from './LocationSearch';
import { ComebackForm } from './ComebackForm';

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 45.5017,
  lng: -73.5673
};

interface MapProps {
  apiKey: string;
  role: 'admin' | 'teamLeader' | 'salesman';
}

interface Pin {
  id: string;
  position: google.maps.LatLngLiteral;
  type: string;
  color: string;
}

const pinColors = {
  'sales': '#16A34A',
  'not-home': '#EAB308',
  'not-interested': '#DC2626',
  'comeback': '#2563EB'
};

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000, // Increased timeout to 10 seconds
  maximumAge: 1000 // Allow cached positions up to 1 second old
};

export const Map: React.FC<MapProps> = ({ apiKey, role }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showComebackForm, setShowComebackForm] = useState(false);
  const [showTerritoryModal, setShowTerritoryModal] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<google.maps.Polygon | null>(null);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries
  });

  const handleLocationError = (error: GeolocationPositionError) => {
    let errorMessage = 'Unable to get location: ';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage += 'Location permission denied';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage += 'Location information unavailable';
        break;
      case error.TIMEOUT:
        errorMessage += 'Location request timed out';
        break;
      default:
        errorMessage += 'Unknown error occurred';
    }
    setLocationError(errorMessage);
    console.warn(errorMessage);
  };

  const updateUserLocation = (position: GeolocationPosition) => {
    const newPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    setUserLocation(newPos);
    setLocationError(null);

    if (map && !selectedPosition) {
      map.panTo(newPos);
    }
  };

  // Set up location tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      updateUserLocation,
      handleLocationError,
      geolocationOptions
    );

    // Set up continuous tracking with retry logic
    const setupWatchPosition = () => {
      const id = navigator.geolocation.watchPosition(
        updateUserLocation,
        (error) => {
          handleLocationError(error);
          // Retry after error
          if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            setTimeout(setupWatchPosition, 5000);
          }
        },
        geolocationOptions
      );
      setWatchId(id);
    };

    setupWatchPosition();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [map]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (selectedPin && e.latLng) {
      const position = e.latLng.toJSON();
      setSelectedPosition(position);
      
      const newPin: Pin = {
        id: Date.now().toString(),
        position,
        type: selectedPin,
        color: pinColors[selectedPin as keyof typeof pinColors]
      };

      setPins(prev => [...prev, newPin]);
      
      switch (selectedPin) {
        case 'sales':
          setShowCustomerForm(true);
          break;
        case 'comeback':
          setShowComebackForm(true);
          break;
        case 'not-home':
        case 'not-interested':
          setSelectedPin(null);
          break;
      }
    }
  }, [selectedPin]);

  const handleCenterOnUser = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(18);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={userLocation}
        onLoad={setMap}
        onClick={onMapClick}
        options={{
          mapTypeId: 'satellite',
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
          },
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: true
        }}
      >
        {/* User Location Marker */}
        <Marker
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4F46E5',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          }}
        />

        {/* Pin Markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={pin.position}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: pin.color,
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
            }}
          />
        ))}

        {/* Map Controls */}
        <div className="absolute top-20 left-2 space-y-2">
          {(role === 'admin' || role === 'teamLeader') && (
            <button
              onClick={() => setShowTerritoryModal(true)}
              className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
              title="Draw Territory"
            >
              <Pencil className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setShowLocationSearch(true)}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
            title="Search Location"
          >
            <MapIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleCenterOnUser}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
            title="My Location"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Pin Selection Widget */}
        <div className="absolute top-4 right-4">
          <PinWidget 
            selectedPin={selectedPin}
            onSelectPin={setSelectedPin}
          />
        </div>

        {/* Forms and Modals */}
        {showCustomerForm && selectedPosition && (
          <CustomerForm
            position={selectedPosition}
            onClose={() => {
              setShowCustomerForm(false);
              setSelectedPosition(null);
              setSelectedPin(null);
            }}
            onSubmit={(data) => {
              console.log('Customer data:', data);
              setShowCustomerForm(false);
              setSelectedPosition(null);
              setSelectedPin(null);
            }}
          />
        )}

        {showComebackForm && selectedPosition && (
          <ComebackForm
            position={selectedPosition}
            onClose={() => {
              setShowComebackForm(false);
              setSelectedPosition(null);
              setSelectedPin(null);
            }}
            onSubmit={(notes) => {
              console.log('Comeback notes:', notes);
              setShowComebackForm(false);
              setSelectedPosition(null);
              setSelectedPin(null);
            }}
          />
        )}

        {showTerritoryModal && (
          <AssignTerritoryModal
            onClose={() => setShowTerritoryModal(false)}
            onAssign={(salesmanId, color) => {
              console.log('Territory assigned:', { salesmanId, color });
              setShowTerritoryModal(false);
            }}
          />
        )}

        {showLocationSearch && (
          <LocationSearch
            onClose={() => setShowLocationSearch(false)}
            onSelectLocation={(location) => {
              if (map) {
                map.panTo(location);
                map.setZoom(18);
              }
              setShowLocationSearch(false);
            }}
          />
        )}

        {/* Drawing Manager for Territories */}
        {(role === 'admin' || role === 'teamLeader') && (
          <DrawingManager
            onPolygonComplete={(polygon) => {
              setSelectedTerritory(polygon);
              setShowTerritoryModal(true);
            }}
            options={{
              drawingControl: false,
              polygonOptions: {
                fillColor: '#FF0000',
                fillOpacity: 0.2,
                strokeWeight: 2,
                clickable: true,
                editable: true,
                zIndex: 1
              }
            }}
          />
        )}

        {/* Location Error Toast */}
        {locationError && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
            {locationError}
          </div>
        )}
      </GoogleMap>
    </div>
  );
};