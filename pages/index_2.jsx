import Head from 'next/head';

import TodayCard from '@/components/TodayCard';
import ForecastCard from '@/components/ForecastCard';
import Layout from '@/components/Layout';
import { getLocalWeatherData } from '@/services/weather';

export default function Index2({ weatherData }) {
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

export async function getServerSideProps(context) {
  const weatherData = await getLocalWeatherData();
  return {
    props: {
      weatherData,
    },
  };
}
