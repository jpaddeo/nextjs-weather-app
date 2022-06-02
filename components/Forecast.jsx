import Image from 'next/image';

import { useSettings } from '@/hooks/useSettings';

function Forecast({ weatherData }) {
  const { temperatureUnit } = useSettings();
  const { hours } = weatherData.today;

  return (
    <div className='scrollbar-thumb-rounded-md w-3/4 scroll-px-40 overflow-y-hidden rounded-md bg-slate-500 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-700'>
      <div className='flex items-center gap-2 p-5'>
        {hours.map((hour) => (
          <div
            key={hour.timeEpoch}
            className='flex flex-col items-center rounded-md p-2 text-white'
          >
            <span className='text-center text-sm'>
              {Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }).format(hour.timeEpoch * 1000)}
            </span>
            <div className='relative h-10 w-10'>
              <Image src={hour.icon.url} layout='fill' />
            </div>
            <p>
              {hour.temperature[temperatureUnit]}&deg;{temperatureUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Forecast;
