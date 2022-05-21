import { createContext, useReducer, useEffect } from 'react';

import useStorage from '@/hooks/useStorage';

const SettingContext = createContext();

import SettingsReducers, { ACTIONS } from './reducers/SettingsReducers';

export const SettingContextProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const intialSettings = {
    temperature: getItem('settings.temperature') || 'celsius',
    speed: getItem('settings.speed') || 'k/h',
    currentLocation: getItem('settings.currentLocation') || null,
  };

  const [state, dispatch] = useReducer(SettingsReducers, intialSettings);

  const { temperature, speed, currentLocation } = state;

  const updateTemperature = (temp) => {
    dispatch({
      type: ACTIONS.UPDATE_TEMPERATURE,
      temperature: temp,
    });
    setItem('settings.temperature', temp);
  };

  const updateSpeed = (speed) => {
    dispatch({
      type: ACTIONS.UPDATE_SPEED,
      speed: speed,
    });
    setItem('settings.speed', speed);
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
    removeItem('settings.temperature');
    removeItem('settings.speed');
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
        temperature,
        speed,
        currentLocation,
        updateTemperature,
        updateSpeed,
        updateCurrentLocation,
        clearSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
