import { useState, useEffect } from 'react';

import TodayCard from '@/components/TodayCard';
import ForecastCard from '@/components/ForecastCard';
import Layout from '@/components/Layout';

import { getWeatherData, getLocalWeatherData } from '@/services/weather';

export default function Index() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState('London');

  useEffect(() => {
    const fetchData = async () => {
      const dataFromService = await getWeatherData(city);
      console.log(dataFromService);
      setWeatherData(dataFromService);
    };
    fetchData().catch((err) => {
      console.error(err);
    });
  }, [city]);

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
