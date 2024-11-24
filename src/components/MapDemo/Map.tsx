import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';
import { MapPin, Map as MapIcon, Navigation, Pencil } from 'lucide-react';
import { PinWidget } from './PinWidget';
import { CustomerForm } from './CustomerForm';
import { AssignTerritoryModal } from './AssignTerritoryModal';
import { LocationSearch } from './LocationSearch';
import { ComebackForm } from './ComebackForm';

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 45.5017,
  lng: -73.5673
};

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showComebackForm, setShowComebackForm] = useState(false);
  const [showTerritoryModal, setShowTerritoryModal] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<google.maps.Polygon | null>(null);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBn1qguY8gUoQ3Jq2hUyHvOV1eM_BGZelk",
    libraries
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newPos);
          if (map) {
            map.panTo(newPos);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (selectedPin && e.latLng) {
      const position = e.latLng.toJSON();
      setSelectedPosition(position);
      
      switch (selectedPin) {
        case 'sales':
          setShowCustomerForm(true);
          break;
        case 'comeback':
          setShowComebackForm(true);
          break;
        case 'not-home':
        case 'not-interested':
          // Just place the pin without a form
          // Add your pin placement logic here
          setSelectedPin(null);
          break;
      }
    }
  }, [selectedPin]);

  const handleCenterOnUser = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(15);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative h-screen">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={userLocation}
        onLoad={setMap}
        onClick={onMapClick}
        options={{
          mapTypeId: 'satellite',
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
          }
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-20 left-2 space-y-2">
          <button
            onClick={() => setShowTerritoryModal(true)}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
            title="Draw Territory"
          >
            <Pencil className="w-5 h-5" />
          </button>
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
                map.setZoom(15);
              }
              setShowLocationSearch(false);
            }}
          />
        )}

        {/* Drawing Manager for Territories */}
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
      </GoogleMap>
    </div>
  );
};