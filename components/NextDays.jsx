import { useContext } from 'react';

import Image from 'next/image';

import SettingsContext from '@/contexts/SettingsContext';

function NextDays({ weatherData }) {
  const { temperatureUnit } = useContext(SettingsContext);
  const nexts = weatherData.nexts;

  // TODO: obtener locale de router e usar en Intl

  return (
    <div className='scrollbar-thumb-rounded-md w-3/4 scroll-px-40 overflow-y-hidden rounded-md bg-slate-500 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-700'>
      <div className='flex flex-col items-center justify-center gap-2 p-5'>
        {nexts.map((next) => (
          <div
            key={next.dateEpoch}
            className='mx-auto flex w-full items-center justify-between space-x-2 p-2'
          >
            <span>
              {new Intl.DateTimeFormat('default', { weekday: 'long' }).format(
                new Date(next.date)
              )}
            </span>
            <span className='relative h-8 w-8'>
              <Image src={next.icon.url} layout='fill' objectFit='contain' />
            </span>
            <span className='flex flex-row'>
              {next.minTemperature[temperatureUnit]}&deg; -{' '}
              {next.maxTemperature[temperatureUnit]}&deg;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextDays;
