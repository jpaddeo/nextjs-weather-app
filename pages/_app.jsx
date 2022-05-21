import 'swiper/css';

import '../styles/globals.css';

import { SettingContextProvider } from '@/contexts/SettingsContext';

function WeatherApp({ Component, pageProps }) {
  return (
    <SettingContextProvider>
      <Component {...pageProps} />
    </SettingContextProvider>
  );
}

export default WeatherApp;
