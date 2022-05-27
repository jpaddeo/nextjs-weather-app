import { useContext } from 'react';

import SettingsContext from '@/contexts/SettingsContext';

export default function TemperatureUnitSelector() {
  const { temperatureUnit, updateTemperatureUnit } =
    useContext(SettingsContext);
  return (
    <div className='flex flex-row justify-center space-x-2 text-slate-600 dark:text-white'>
      <span
        className={`relative text-xl ${
          temperatureUnit !== 'C'
            ? 'cursor-pointer opacity-80'
            : 'border-b-2 border-solid border-slate-600 dark:border-white'
        }`}
        onClick={() => updateTemperatureUnit('C')}
      >
        &deg;C
      </span>
      <span
        className={`relative text-xl ${
          temperatureUnit !== 'F'
            ? 'cursor-pointer opacity-80'
            : 'border-b-2 border-solid border-slate-600 dark:border-white'
        }`}
        onClick={() => updateTemperatureUnit('F')}
      >
        &deg;F
      </span>
    </div>
  );
}
