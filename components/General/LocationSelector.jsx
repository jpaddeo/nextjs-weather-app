import Link from 'next/link';

import { FiMap } from 'react-icons/fi';
import { BiCurrentLocation } from 'react-icons/bi';

import { useSettings } from '@/hooks/useSettings';
import { useTranslation } from '@/hooks/useTranslation';

import LocationSearcher from '@/components/General/LocationSearcher';

export default function LocationSelector() {
  const { locationSelectorOpen, updateLocationSelectorOpen } = useSettings();
  const i18n = useTranslation();

  if (!locationSelectorOpen) return null;

  return (
    <div className='absolute top-0 left-0 z-[9990] h-full w-full bg-white bg-opacity-50'>
      <span
        className='absolute top-0 left-0 z-[9991] flex h-full w-full cursor-pointer'
        onClick={() => updateLocationSelectorOpen(false)}
      />
      <div className='absolute inset-0 z-[9999] mx-auto my-auto h-3/4 w-5/6'>
        <div className='absolute flex h-full w-full flex-col items-center justify-start gap-2 rounded-xl bg-white py-2 opacity-80'>
          <h1 className='text-xl font-bold uppercase'>
            {i18n.SEARCH_SELECT_CITY}
          </h1>
          <div className='flex w-full flex-row items-center justify-center gap-2 px-2'>
            <LocationSearcher />
            <button
              className='w-fit rounded-lg border border-gray-500 bg-gray-500 p-2'
              onClick={() => console.log('Current Position')}
            >
              <BiCurrentLocation className='h-6 w-6' />
            </button>
            <Link href={'/map'}>
              <a className='w-fit rounded-lg border border-gray-500 bg-gray-500 p-2'>
                <FiMap className='h-6 w-6' />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
