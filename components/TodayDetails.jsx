import { useMemo } from 'react';

import { BiWind } from 'react-icons/bi';
import { IoWaterOutline } from 'react-icons/io5';
import { BsSun } from 'react-icons/bs';
import { RiTempHotLine } from 'react-icons/ri';

import SpeedUnitSelector from '@/components/General/SpeedUnitSelector';
import DetailCard from '@/components/General/DetailCard';

import { useTranslation } from '@/hooks/useTranslation';
import { useSettings } from '@/hooks/useSettings';

export default function TodayDetails({ weatherData }) {
  const i18n = useTranslation();
  const { speedUnit, temperatureUnit } = useSettings();
  const { wind, humidity, uv, feelsLike } = weatherData.today;

  const CARDS = useMemo(
    () => [
      {
        id: 1,
        Icon: <BiWind className='h-6 w-6 text-white' />,
        Selector: <SpeedUnitSelector />,
        title: i18n.WIND,
        value: wind[speedUnit],
      },
      {
        id: 2,
        Icon: <IoWaterOutline className='h-6 w-6 text-white' />,
        title: i18n.HUMIDITY,
        value: `${humidity}%`,
      },
      {
        id: 3,
        Icon: <BsSun className='h-6 w-6 text-white' />,
        title: i18n.UV,
        value: uv,
      },
      {
        id: 4,
        Icon: <RiTempHotLine className='h-6 w-6 text-white' />,
        title: i18n.FEELS_LIKE,
        value: `${feelsLike[temperatureUnit]}°`,
      },
    ],
    [i18n, wind, speedUnit, uv, feelsLike, temperatureUnit]
  );

  return (
    <div className='grid w-3/4 grid-cols-4 gap-2'>
      {CARDS.map((card) => (
        <DetailCard
          key={card.id}
          Icon={card.Icon}
          Selector={card.Selector}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
}
