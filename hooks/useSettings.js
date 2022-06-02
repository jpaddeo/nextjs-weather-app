import { useContext } from 'react';

import SettingsContext from '@/contexts/SettingsContext';

export const useSettings = () => {
  const {
    temperatureUnit,
    speedUnit,
    theme,
    locationSelectorOpen,
    updateTemperatureUnit,
    updateSpeedUnit,
    updateTheme,
    updateLocationSelectorOpen,
    clearSettings,
  } = useContext(SettingsContext);

  return {
    temperatureUnit,
    speedUnit,
    theme,
    locationSelectorOpen,
    updateTemperatureUnit,
    updateSpeedUnit,
    updateTheme,
    updateLocationSelectorOpen,
    clearSettings,
  };
};
