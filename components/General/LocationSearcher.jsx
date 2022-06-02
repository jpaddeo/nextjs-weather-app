import { useState } from 'react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { useTranslation } from '@/hooks/useTranslation';

export default function LocationSearcher() {
  const [locationSearch, setLocationSearch] = useState('');
  const i18n = useTranslation();

  const handleChange = (address) => {
    setLocationSearch(address);
  };

  const handleSelection = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={locationSearch}
      onChange={handleChange}
      onSelect={handleSelection}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: i18n.SEARCH_PLACES,
              className:
                'bg-secondary w-full rounded-lg border border-gray-500 p-2',
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div className='uppercase animate-pulse'>{i18n.LOADING}</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
