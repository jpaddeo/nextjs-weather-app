import 'swiper/css';

import '../styles/globals.css';

import { SettingsContextProvider } from '@/contexts/SettingsContext';

function WeatherApp({ Component, pageProps }) {
  return (
    <SettingsContextProvider>
      <Component {...pageProps} />
    </SettingsContextProvider>
  );
}

export default WeatherApp;
