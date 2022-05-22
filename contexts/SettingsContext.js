import { createContext, useReducer, useEffect } from 'react';

import useStorage from '@/hooks/useStorage';

const SettingsContext = createContext();

import SettingsReducers, { ACTIONS } from './reducers/SettingsReducers';

export const SettingsContextProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const intialSettings = {
    temperatureUnit: getItem('settings.temperatureUnit') || 'C',
    speedUnit: getItem('settings.speedUnit') || 'KMH',
    currentLocation: getItem('settings.currentLocation') || null,
  };

  const [state, dispatch] = useReducer(SettingsReducers, intialSettings);

  const { temperatureUnit, speedUnit, currentLocation } = state;

  const updateTemperatureUnit = (temperature) => {
    dispatch({
      type: ACTIONS.UPDATE_TEMPERATURE_UNIT,
      payload: temperature,
    });
    setItem('settings.temperatureUnit', temperature);
  };

  const updateSpeedUnit = (speed) => {
    dispatch({
      type: ACTIONS.UPDATE_SPEED_UNIT,
      payload: speed,
    });
    setItem('settings.speedUnit', speed);
  };

  const updateCurrentLocation = (latitude, longitude) => {
    const cLocation = { latitude, longitude };
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_LOCATION,
      currentLocation: cLocation,
    });
    setItem('settings.currentLocation', cLocation);
  };

  const clearSettings = () => {
    removeItem('settings.temperatureUnit');
    removeItem('settings.speedUnit');
    removeItem('settings.currentLocation');
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        updateCurrentLocation(latitude, longitude);
      });
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        temperatureUnit,
        speedUnit,
        currentLocation,
        updateTemperatureUnit,
        updateSpeedUnit,
        updateCurrentLocation,
        clearSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
