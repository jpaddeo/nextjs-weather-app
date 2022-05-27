import { useMemo, useContext } from 'react';

import { BiWind } from 'react-icons/bi';
import { IoWaterOutline } from 'react-icons/io5';
import { BsSun } from 'react-icons/bs';

import SettingsContext from '@/contexts/SettingsContext';

import SpeedUnitSelector from '@/components/General/SpeedUnitSelector';
import DetailCard from '@/components/General/DetailCard';

import { useTranslation } from '@/hooks/useTranslation';

export default function TodayDetails({ weatherData }) {
  const i18n = useTranslation();
  const { speedUnit } = useContext(SettingsContext);
  const { wind, humidity, uv } = weatherData.today;

  const CARDS = useMemo(
    () => [
      {
        Icon: <BiWind className='h-6 w-6 text-black' />,
        Selector: <SpeedUnitSelector />,
        title: i18n.WIND,
        value: wind[speedUnit],
      },
      {
        Icon: <IoWaterOutline className='h-6 w-6 text-black' />,
        title: i18n.HUMIDITY,
        value: `${humidity}%`,
      },
      {
        Icon: <BsSun className='h-6 w-6 text-black' />,
        title: i18n.UV,
        value: uv,
      },
    ],
    [i18n, wind, speedUnit]
  );

  return (
    <div className='grid grid-cols-2 gap-2'>
      {CARDS.map((card) => (
        <DetailCard
          Icon={card.Icon}
          Selector={card.Selector}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
}
