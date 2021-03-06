import { useSettings } from '@/hooks/useSettings';

export default function SpeedUnitSelector() {
  const { speedUnit, updateSpeedUnit } = useSettings();
  return (
    <div className='flex flex-col justify-center text-xs font-semibold uppercase'>
      <span
        className={`${speedUnit !== 'MPH' ? 'cursor-pointer opacity-40' : ''}`}
        onClick={() => updateSpeedUnit('MPH')}
      >
        m/h
      </span>
      <span
        className={`${speedUnit !== 'KMH' ? 'cursor-pointer opacity-40' : ''}`}
        onClick={() => updateSpeedUnit('KMH')}
      >
        km/h
      </span>
    </div>
  );
}
