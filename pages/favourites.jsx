import { useContext } from 'react';

import SettingContext from '@/contexts/SettingsContext';
import Layout from '@/components/Layout';

export default function Settings() {
  const { temperatureUnit, updateTemperatureUnit, speedUnit, updateSpeedUnit } =
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
        defaultValue={temperatureUnit}
        onChange={handleChangeTemperatureUnit}
      />
      <input
        name='speedUnit'
        defaultValue={speedUnit}
        onChange={handleChangeSpeedUnit}
      />
    </Layout>
  );
}
