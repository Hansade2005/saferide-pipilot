import React, { useState } from 'react';
import { Location } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LocationSelectorProps {
  label: string;
  value: Location | null;
  onChange: (location: Location) => void;
 onSearch: (query: string) => Promise<Location[]>;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ label, value, onChange, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      setLoading(true);
      try {
        const results = await onSearch(searchQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location: Location) => {
    onChange(location);
    setQuery(location.address);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Enter location"
          className="w-full"
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {suggestions.map((location, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSelect(location)}
            >
              {location.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;