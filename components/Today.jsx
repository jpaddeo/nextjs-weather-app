import { useContext, useEffect } from 'react';

import Image from 'next/image';

import { useTranslation } from '@/hooks/useTranslation';
import { ExternalLinkIcon } from '@heroicons/react/outline';

import SettingsContext from '@/contexts/SettingsContext';

function Today({ weatherData }) {
  const i18n = useTranslation();
  const { temperatureUnit, speedUnit, updateTheme } =
    useContext(SettingsContext);

  const { location, icon, temperature, feelsLike, sunrise, sunset, isDay } =
    weatherData.today;
  const { url: iconUrl } = icon;
  const { localtime, name, lat, lon } = location;

  useEffect(() => {
    updateTheme(isDay ? 'light' : 'dark');
  }, [isDay]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='flex items-center justify-center text-4xl text-slate-600 dark:text-white'>
        {name}
        <a
          href={`https://maps.google.com/?q=${lat},${lon}`}
          noreferrer='true'
          noopener='true'
          target='_blank'
          className='ml-2 text-gray-400'
        >
          <ExternalLinkIcon className='h-4 w-4' />
        </a>
      </p>
      <div className='flex items-center justify-center gap-2'>
        <div className='relative h-16 w-16'>
          <Image src={iconUrl} layout='fill' />
        </div>
        <h2 className='flex items-center justify-center gap-2 text-4xl text-slate-600 dark:text-white'>
          {temperature[temperatureUnit]}&deg;
        </h2>
      </div>
      <div className='flex flex-col items-center justify-between gap-2 text-sm uppercase md:flex-row'>
        <p className='text-slate-600 dark:text-white'>
          {i18n.SENSACION_TERMICA} {feelsLike[temperatureUnit]}&deg;
          {temperatureUnit}
        </p>
        <hr className='h-1 w-1 rounded-full bg-white text-white' />
        <p className='text-slate-600 dark:text-white'>
          {new Intl.DateTimeFormat().format(new Date(localtime))}
        </p>
        <hr className='h-1 w-1 rounded-full bg-white text-white' />
        <p className='text-slate-600 dark:text-white'>
          {i18n.SUNRISE} {sunrise}
        </p>
        <hr className='h-1 w-1 rounded-full bg-white text-white' />
        <p className='text-slate-600 dark:text-white'>
          {i18n.SUNSET} {sunset}
        </p>
      </div>
    </div>
  );
}

export default Today;
