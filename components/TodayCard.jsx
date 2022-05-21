import { useContext } from 'react';

import Image from 'next/image';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { Swiper, SwiperSlide } from 'swiper/react';

import { BiWind } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { IoWaterOutline } from 'react-icons/io5';

import SettingsContext from '@/contexts/SettingsContext';

import { useTranslation } from '@/hooks/useTranslation';

import HourCard from '@/components/HourCard';

const TodayCard = ({ weatherData }) => {
  const i18n = useTranslation();
  const { temperatureUnit, speedUnit } = useContext(SettingsContext);

  const {
    location,
    icon,
    temperature,
    feelsLike,
    sunrise,
    sunset,
    uv,
    wind,
    hours,
    humidity,
  } = weatherData.today;
  const { url: iconUrl } = icon;
  const { localtime, name, country, lat, lon } = location;

  return (
    <div className='flex flex-col items-center justify-center space-y-2 px-4 py-2'>
      <div className='flex items-center justify-center space-x-2'>
        <div className='relative h-12 w-12'>
          <Image src={iconUrl} layout='fill' objectFit='contain' />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-semibold uppercase text-white'>
            {i18n.TODAY}
          </h1>
          <span className='text-xs text-gray-400'>
            {new Intl.DateTimeFormat().format(new Date(localtime))}
          </span>
        </div>
      </div>
      <div className='flex text-white'>
        <h1 className='text-8xl font-thin'>{temperature[temperatureUnit]}</h1>
        <span className='relative mt-3 text-2xl'>&deg;{temperatureUnit}</span>
      </div>
      <div className='flex flex-col space-x-1'>
        <p className='flex items-center justify-center text-gray-400'>
          {name}, {country}
          <a
            href={`https://maps.google.com/?q=${lat},${lon}`}
            noreferrer
            noopener='true'
            target='_blank'
            className='ml-2 text-gray-400'
          >
            <ExternalLinkIcon className='h-4 w-4' />
          </a>
        </p>
        <div className='flex items-center justify-between space-x-2 text-sm uppercase'>
          <p className=' text-gray-400'>
            {i18n.SENSACION_TERMICA} {feelsLike[temperatureUnit]}&deg;
            {temperatureUnit}
          </p>
          <hr className='h-1 w-1 rounded-full bg-white text-white' />
          <p className=' text-gray-400'>
            {i18n.SUNSET} {sunset}
          </p>
        </div>
      </div>
      <div className='grid w-full grid-flow-col grid-rows-3 gap-4'>
        <div className='row-span-3'>
          <div className='flex h-full w-full flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
            <BiWind className='h-6 w-7 text-black' />
            <div className='flex flex-col items-center justify-center'>
              <span className='uppercase text-gray-400'>{i18n.WIND}</span>
              <span className='font-semibold text-gray-800'>
                {wind[speedUnit]} {speedUnit}
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-2'>02</div>
        <div className='col-span-2 row-span-2'>03</div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
          <BiWind className='h-6 w-6 text-black' />
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xs uppercase text-gray-400'>{i18n.WIND}</span>
            <span className='font-semibold text-gray-800'>
              {wind[speedUnit]} {speedUnit}
            </span>
          </div>
        </div>
        <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
          <IoWaterOutline className='h-6 w-6 text-black' />
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xs uppercase text-gray-400'>
              {i18n.HUMIDITY}
            </span>
            <span className='font-semibold text-gray-800'>{humidity}%</span>
          </div>
        </div>
        <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
          <BsSun className='h-6 w-6 text-black' />
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xs uppercase text-gray-400'>{i18n.UV}</span>
            <span className='font-semibold text-gray-800'>{uv}</span>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        className='h-full w-full px-2'
      >
        {hours.map((hour) => (
          <SwiperSlide key={hour.timeEpoch}>
            <HourCard hour={hour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TodayCard;
