import { useState, useContext, useEffect } from 'react';

import SettingsContext from '@/contexts/SettingsContext';

import Layout from '@/components/Layout';

import { useTranslation } from '@/hooks/useTranslation';

import { getWeatherData } from '@/services/weather';

import Today from '@/components/Today';
import Forecast from '@/components/Forecast';
import NextDays from '@/components/NextDays';
import TodayDetails from '@/components/TodayDetails';

import WeatherContext from '@/contexts/WeatherContext';

export default function IndexN() {
  const [weatherData, setWeatherData] = useState();
  const { location, updateLocation } = useContext(WeatherContext);
  const i18n = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const dataFromService = await getWeatherData(
        Object.values(location).join(',')
      );
      setWeatherData(dataFromService);
    };
    fetchData().catch((err) => {
      console.error(err);
    });
  }, [location]);

  if (!weatherData) {
    return (
      <Layout>
        <h1 className='dark:text-white'>{i18n.LOADING}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Today weatherData={weatherData} />
      <Forecast weatherData={weatherData} />
      <NextDays weatherData={weatherData} />
      <TodayDetails weatherData={weatherData} />
    </Layout>
  );
}
