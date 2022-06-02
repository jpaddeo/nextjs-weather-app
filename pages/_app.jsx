import 'swiper/css';

import '../styles/globals.css';

import Script from 'next/script';

import { WeatherContextProvider } from '@/contexts/WeatherContext';
import { SettingsContextProvider } from '@/contexts/SettingsContext';

function WeatherApp({ Component, pageProps }) {
  return (
    <WeatherContextProvider>
      <SettingsContextProvider>
        <Script
          src='https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places'
          strategy='beforeInteractive'
        />
        <Component {...pageProps} />
      </SettingsContextProvider>
    </WeatherContextProvider>
  );
}

export default WeatherApp;
