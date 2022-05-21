import { createContext, useReducer, useEffect } from 'react';

import useStorage from '@/hooks/useStorage';

const SettingContext = createContext();

import SettingsReducers, { ACTIONS } from './reducers/SettingsReducers';

export const SettingContextProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const intialSettings = {
    temperatureUnit: getItem('settings.temperatureUnit') || 'C',
    speedUnit: getItem('settings.speedUnit') || 'KMH',
    currentLocation: getItem('settings.currentLocation') || null,
  };

  const [state, dispatch] = useReducer(SettingsReducers, intialSettings);

  const { temperatureUnit, speedUnit, currentLocation } = state;

  const updateTemperatureUnit = (temperatureUnit) => {
    dispatch({
      type: ACTIONS.UPDATE_TEMPERATURE_UNIT,
      temperatureUnit,
    });
    setItem('settings.temperatureUnit', temperatureUnit);
  };

  const updateSpeedUnit = (speedUnit) => {
    dispatch({
      type: ACTIONS.UPDATE_SPEED_UNIT,
      speedUnit,
    });
    setItem('settings.speedUnit', speedUnit);
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
  }, [updateCurrentLocation]);

  return (
    <SettingContext.Provider
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
    </SettingContext.Provider>
  );
};

export default SettingContext;
