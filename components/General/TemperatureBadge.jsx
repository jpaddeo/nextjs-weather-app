import { FaTemperatureLow, FaTemperatureHigh } from 'react-icons/fa';

export default function TemperatureBadge({ temperature, type = 'max' }) {
  return (
    <strong
      className={`inline-flex opacity-80 ${
        type === 'min' ? 'bg-blue-400' : 'bg-red-400'
      } items-center space-x-2 rounded-full px-4 py-2`}
    >
      <span className='text-xs font-medium'>{temperature}&deg;</span>
      {type === 'min' ? (
        <FaTemperatureLow className='h-4 w-4' />
      ) : (
        <FaTemperatureHigh className='h-4 w-4' />
      )}
    </strong>
  );
}
