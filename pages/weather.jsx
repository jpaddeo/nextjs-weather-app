import { useState } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MapIcon } from '@heroicons/react/outline';

import Header from '@/components/Header';
import DetailCard from '@/components/DetailCard';

import { useTranslation } from '@/hooks/useTranslation';

const Weather = ({ weatherData }) => {
  const { location, current, forecast } = weatherData;
  const { name: city, country } = location;

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (ev) => {
    ev.preventDefault();
  };

  const setIP = (e) => {
    console.log('IP, e');
  };
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-800 py-10'>
      <div className='bg-gray-100 m-auto flex min-h-full w-3/4 rounded-3xl shadow-lg'>
        <div className='form-container'>
          <div className='flex items-center justify-center'>
            <h3 className='my-auto mr-auto rounded-md bg-white bg-opacity-30 py-1 px-3 text-xl font-bold text-pink-800 shadow-md'>
              miduweather
            </h3>
            <div className='flex rounded-lg bg-gray-600 bg-opacity-30 p-2 text-gray-100'>
              <MapIcon className='h-6 w-6' />
              <div className='text-right'>
                <p className='ml-2 text-sm font-semibold'>{city}</p>
              </div>
            </div>
          </div>
          <div className='flex h-full flex-col items-center justify-center'>
            <h1 className='text-2xl text-white'>
              The miduhackaton Weather Forecast App
            </h1>
            <hr className='my-5 h-1 w-1/4 rounded-full bg-white' />
            <form
              noValidate
              onSubmit={handleSubmit}
              className='flex w-full justify-center'
            >
              <input
                type='text'
                className='relative w-2/3 rounded-xl bg-gray-300 bg-opacity-60 py-2 px-3 text-white placeholder-gray-200'
                onChange={handleChange}
                required
              />
              <button type='submit' className='z-10'>
                <SearchIcon
                  className='z-10 h-6 w-6 cursor-pointer text-white'
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(setIP);
                  }}
                />
              </button>
            </form>
          </div>
        </div>
        <div className='w-2/4 p-5'>
          <Header />
          <div className='my-10 flex flex-col'>
            {weatherData.length === 0 ? (
              <div className='container mb-auto flex h-1/3 items-center justify-center p-4'>
                <h1 className='text-4xl font-bold uppercase text-gray-300'>
                  No data yet
                </h1>
              </div>
            ) : (
              <>
                <h1 className='mt-auto mb-4 text-5xl text-gray-800'>Today</h1>
                <DetailCard current={current} />
                <h1 className='mb-4 mt-10 text-3xl text-gray-600'>
                  More On {city}
                </h1>
                <ul className='gird-cols-2 grid gap-2'>
                  {/*
                    {weatherData.days.map((day, index) => {
                        if(index > 0) {
                            return <SummaryCard key={index} weather={day} />
                        }
                    })}
                    */}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const weatherData = require('../forecast.sample.json');

  return {
    props: {
      weatherData,
    },
  };
}

export default Weather;
