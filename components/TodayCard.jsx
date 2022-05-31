import { useContext, useEffect } from 'react';

import Image from 'next/image';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { Swiper, SwiperSlide } from 'swiper/react';

import { BiWind } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { IoWaterOutline } from 'react-icons/io5';

import { motion } from 'framer-motion';

import SettingsContext from '@/contexts/SettingsContext';

import { useTranslation } from '@/hooks/useTranslation';

import HourCard from '@/components/HourCard';
import TemperatureUnitSelector from '@/components/General/TemperatureUnitSelector';
import SpeedUnitSelector from '@/components/General/SpeedUnitSelector';

const TodayCard = ({ weatherData }) => {
  const i18n = useTranslation();
  const { temperatureUnit, speedUnit, updateTheme } =
    useContext(SettingsContext);

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
    isDay,
  } = weatherData.today;
  const { url: iconUrl } = icon;
  const { localtime, name, country, lat, lon } = location;

  useEffect(() => {
    updateTheme(isDay ? 'light' : 'dark');
  }, [isDay]);

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        className='flex text-white'
      >
        <h1 className='text-8xl font-thin'>{temperature[temperatureUnit]}</h1>
        <TemperatureUnitSelector />
      </motion.div>
      <div className='flex flex-col space-x-1'>
        <p className='flex items-center justify-center text-gray-400'>
          {name}, {country}
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
        <div className='flex items-center justify-between space-x-2 text-sm uppercase'>
          <p className=' text-gray-400'>
            {i18n.FEELS_LIKE} {feelsLike[temperatureUnit]}&deg;
            {temperatureUnit}
          </p>
          <hr className='h-1 w-1 rounded-full bg-white text-white' />
          <p className=' text-gray-400'>
            {i18n.SUNSET} {sunset}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
          <BiWind className='h-6 w-6 text-black' />
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xs uppercase text-gray-400'>{i18n.WIND}</span>
            <div className='flex flex-row items-center space-x-1'>
              <span className='font-semibold text-gray-800'>
                {wind[speedUnit]}
              </span>
              <SpeedUnitSelector />
            </div>
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

      <div className='flex w-1/2 overflow-y-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-700'>
        {hours.map((hour) => (
          <div
            key={hour.timeEpoch}
            className='mr-2 flex flex-col items-center rounded-md bg-gray-600 p-2 text-white'
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
};

export default TodayCard;
