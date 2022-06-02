import Image from 'next/image';
import { useRouter } from 'next/router';

import TemperatureBadge from '@/components/General/TemperatureBadge';
import { useSettings } from '@/hooks/useSettings';

function NextDays({ weatherData }) {
  const { temperatureUnit } = useSettings();
  const nexts = weatherData.nexts;

  const { locale } = useRouter();

  return (
    <div className='w-3/4 scroll-px-40 rounded-md bg-slate-500'>
      <div className='flex flex-col items-center justify-center gap-2 p-5'>
        {nexts.map((next) => (
          <div
            key={next.dateEpoch}
            className='mx-auto flex w-full items-center justify-between space-x-2 p-2 text-white'
          >
            <div className='w-1/4'>
              <span className='uppercase'>
                {new Intl.DateTimeFormat(locale || 'default', {
                  weekday: 'long',
                }).format(new Date(next.date))}
              </span>
            </div>
            <span className='relative h-8 w-8'>
              <Image src={next.icon.url} layout='fill' objectFit='contain' />
            </span>
            <TemperatureBadge
              temperature={next.minTemperature[temperatureUnit]}
              type='min'
            />
            <TemperatureBadge
              temperature={next.maxTemperature[temperatureUnit]}
              type='max'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextDays;
