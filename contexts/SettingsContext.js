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
    theme: getItem('theme') || 'light',
  };

  const [state, dispatch] = useReducer(SettingsReducers, intialSettings);

  const { temperatureUnit, speedUnit, currentLocation, theme } = state;

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
      payload: cLocation,
    });
    setItem('settings.currentLocation', cLocation);
  };
  const updateTheme = (theme) => {
    dispatch({
      type: ACTIONS.UPDATE_THEME,
      payload: theme,
    });
    setItem('theme', theme);
  };

  const clearSettings = () => {
    removeItem('settings.temperatureUnit');
    removeItem('settings.speedUnit');
    removeItem('settings.currentLocation');
    setTheme('theme', 'light');
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
        theme,
        updateTemperatureUnit,
        updateSpeedUnit,
        updateCurrentLocation,
        updateTheme,
        clearSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
