import { useState, useEffect, useContext } from 'react';

import SettingsContext from '@/contexts/SettingsContext';

import TodayCard from '@/components/TodayCard';
import Layout from '@/components/Layout';

import { getWeatherData, getLocalWeatherData } from '@/services/weather';

export default function Index() {
  const [weatherData, setWeatherData] = useState();
  const { currentLocation, updateCurrentLocation } =
    useContext(SettingsContext);

  useEffect(() => {
    const fetchData = async () => {
      const dataFromService = await getWeatherData(
        Object.values(currentLocation).join(',')
      );
      setWeatherData(dataFromService);
    };
    fetchData().catch((err) => {
      console.error(err);
    });
  }, [currentLocation]);

  if (!weatherData) return <span>Loading...</span>;

  return (
    <Layout>
      <TodayCard weatherData={weatherData} />
      {/*}
      {forecast.forecastday.map((forecast, index) => {
        if (index > 0) {
          return <ForecastCard key={index} forecast={forecast} />;
        }
      })}
      */}
    </Layout>
  );
}

/*
export async function getServerSideProps(context) {
  const weatherData = await getLocalWeatherData();
  return {
    props: {
      weatherData,
    },
  };
}
*/
