import { createContext, useReducer, useEffect } from 'react';

import { useStorage } from '@/hooks/useStorage';

const SettingsContext = createContext();

import SettingsReducers, { ACTIONS } from './reducers/SettingsReducers';

export const SettingsContextProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const intialSettings = {
    temperatureUnit: getItem('settings.temperatureUnit') || 'C',
    speedUnit: getItem('settings.speedUnit') || 'KMH',
    theme: getItem('settings.theme') || 'light',
    locationSelectorOpen: false,
  };

  const [state, dispatch] = useReducer(SettingsReducers, intialSettings);

  const { temperatureUnit, speedUnit, theme, locationSelectorOpen } = state;

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

  const updateTheme = (theme) => {
    dispatch({
      type: ACTIONS.UPDATE_THEME,
      payload: theme,
    });
    setItem('settings.theme', theme);
  };

  const updateLocationSelectorOpen = (locationSelectorOpen) => {
    dispatch({
      type: ACTIONS.UPDATE_LOCATION_SELECTOR_OPEN,
      payload: locationSelectorOpen,
    });
  };

  const clearSettings = () => {
    removeItem('settings.temperatureUnit');
    removeItem('settings.speedUnit');
    removeItem('settings.theme');
  };

  return (
    <SettingsContext.Provider
      value={{
        temperatureUnit,
        speedUnit,
        theme,
        locationSelectorOpen,
        updateTemperatureUnit,
        updateSpeedUnit,
        updateTheme,
        updateLocationSelectorOpen,
        clearSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
