import Image from 'next/image';

import { useSettings } from '@/hooks/useSettings';

const HourCard = ({ hour }) => {
  const { temperatureUnit } = useSettings();
  const { time, temperature, icon } = hour;
  const { url: iconUrl } = icon;
  const [pDate, pTime] = time.split(' ');

  return (
    <div className='flex flex-col items-center space-y-1 rounded-lg bg-white text-sm text-black shadow-md'>
      <span className='font-semibold'>{pTime}</span>
      <div className='relative h-6 w-6'>
        <Image src={iconUrl} layout='fill' objectFit='contain' />
      </div>
      <span>
        {temperature[temperatureUnit]}&deg;{temperatureUnit}
      </span>
    </div>
  );
};

export default HourCard;
