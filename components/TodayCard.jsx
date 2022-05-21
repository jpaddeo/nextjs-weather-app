import Image from 'next/image';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { Swiper, SwiperSlide } from 'swiper/react';

import { BiWind } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { IoWaterOutline } from 'react-icons/io5';

import { useTranslation } from '@/hooks/useTranslation';
import HourCard from '@/components/HourCard';

const TodayCard = ({
  todayWeatherData,
  todayLocationData,
  todayForecast,
  tomorrowForecast,
}) => {
  const i18n = useTranslation();

  const {
    temp_c,
    temp_f,
    humidity,
    wind_kph,
    wind_mph,
    uv,
    feelslike_c,
    feelslike_f,
    condition,
  } = todayWeatherData;
  const { name, country, lat, lon } = todayLocationData;
  const { astro, hour } = todayForecast;
  const { hour: tomorrowHours } = tomorrowForecast;
  const { sunrise, sunset } = astro;

  console.log(
    hour.filter(
      (hourData) => hourData.time_epoch * 1000 >= new Date().getTime()
    )
  );
  return (
    <div className='flex flex-col items-center justify-center space-y-2 px-4 py-2'>
      <div className='flex items-center justify-center space-x-2'>
        <div className='relative h-12 w-12'>
          <Image
            src={`https://${condition.icon}`}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-semibold uppercase text-white'>
            {i18n.TODAY}
          </h1>
          <span className='text-xs text-gray-400'>Sat, 3 Aug</span>
        </div>
      </div>
      <div className='flex text-white'>
        <h1 className='text-8xl font-thin'>{temp_c}</h1>
        <span className='relative mt-3 text-2xl'>&deg;C</span>
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
            {i18n.SENSACION_TERMICA} {feelslike_c}&deg;C
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
                {wind_kph} k/h
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
            <span className='font-semibold text-gray-800'>{wind_kph} k/h</span>
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
            <span className='font-semibold text-gray-800'>{uv}%</span>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={10}
        spaceBetween={10}
        className='h-full w-full px-2'
      >
        {hour
          .filter(
            (hourData) => hourData.time_epoch * 1000 >= new Date().getTime()
          )
          .concat(tomorrowHours)
          .map((hourData, index) => (
            <SwiperSlide key={index}>
              <HourCard hourData={hourData} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TodayCard;
