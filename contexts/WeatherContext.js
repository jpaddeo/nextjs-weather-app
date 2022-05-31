import { createContext, useReducer, useEffect } from 'react';

import useStorage from '@/hooks/useStorage';

const WeatherContext = createContext();

import WeatherReducers, { ACTIONS } from './reducers/WeatherReducers';

export const WeatherContextProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const intialSettings = {
    location: getItem('weather.location') || null,
  };

  const [state, dispatch] = useReducer(WeatherReducers, intialSettings);

  const { location } = state;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        updateLocation(latitude, longitude);
      });
    }
  }, []);

  const updateLocation = (latitude, longitude) => {
    const cLocation = { latitude, longitude };
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_LOCATION,
      payload: cLocation,
    });
    setItem('weather.location', cLocation);
  };

  const clearWeatherContext = () => {
    removeItem('weather.location');
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        updateLocation(latitude, longitude);
      });
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        location,
        updateLocation,
        clearWeatherContext,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
