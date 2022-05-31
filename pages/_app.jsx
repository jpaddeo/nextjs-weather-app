import 'swiper/css';

import '../styles/globals.css';

import { WeatherContextProvider } from '@/contexts/WeatherContext';
import { SettingsContextProvider } from '@/contexts/SettingsContext';

function WeatherApp({ Component, pageProps }) {
  return (
    <WeatherContextProvider>
      <SettingsContextProvider>
        <Component {...pageProps} />
      </SettingsContextProvider>
    </WeatherContextProvider>
  );
}

export default WeatherApp;
