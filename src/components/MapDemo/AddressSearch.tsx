import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface AddressSearchProps {
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address']
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        onLocationSelect({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setSearchValue('');
      }
    });
  }, [onLocationSelect]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search address..."
        className="w-64 pl-10 pr-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
};