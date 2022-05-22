import { useContext } from 'react';

import SettingsContext from '@/contexts/SettingsContext';

export default function TemperatureUnitSelector() {
  const { temperatureUnit, updateTemperatureUnit } =
    useContext(SettingsContext);
  return (
    <div className='flex flex-row justify-center space-x-2'>
      <span
        className={`relative mt-3 text-2xl ${
          temperatureUnit !== 'F' ? 'cursor-pointer opacity-40' : ''
        }`}
        onClick={() => updateTemperatureUnit('F')}
      >
        &deg;F
      </span>
      <span
        className={`relative mt-3 text-2xl ${
          temperatureUnit !== 'C' ? 'cursor-pointer opacity-40' : ''
        }`}
        onClick={() => updateTemperatureUnit('C')}
      >
        &deg;C
      </span>
    </div>
  );
}
