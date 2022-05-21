import { useContext } from 'react';

import SettingContext from '@/contexts/SettingsContext';
import Layout from '@/components/Layout';

export default function Settings() {
  const { temperatureUit, updateTemperatureUnit, speedUnit, updateSpeedUnit } =
    useContext(SettingContext);

  const handleChangeTemperatureUnit = (e) => {
    updateTemperatureUnit(e.target.value);
  };
  const handleChangeSpeedUnit = (e) => {
    updateSpeedUnit(e.target.value);
  };
  return (
    <Layout>
      <h1>Settings</h1>
      <input
        name='temperatureUnit'
        value={temperatureUit}
        onChange={handleChangeTemperatureUnit}
      />
      <input
        name='speedUnit'
        value={speedUnit}
        onChange={handleChangeSpeedUnit}
      />
    </Layout>
  );
}
