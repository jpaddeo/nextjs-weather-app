import { useRouter } from 'next/router';

import { StarIcon, HomeIcon, AdjustmentsIcon } from '@heroicons/react/outline';

export default function BottomNavBar() {
  const router = useRouter();
  const routerPath = router.asPath;

  return (
    <nav className='fixed bottom-0 flex w-1/2 overflow-x-auto border bg-white'>
      <a href='/index_2' className='navbaritem'>
        <HomeIcon
          className={`h-6 w-6 ${
            routerPath === '/' || routerPath === '/index'
              ? 'text-orange-500'
              : 'text-gray-500'
          }  `}
        />
      </a>

      <a href='/favourites' className='navbaritem'>
        <StarIcon
          className={`h-6 w-6 ${
            routerPath === '/favourites' ? 'text-orange-500' : 'text-gray-500'
          }  `}
        />
      </a>

      <a href='/settings' className='navbaritem'>
        <AdjustmentsIcon
          className={`h-6 w-6 ${
            routerPath === '/settings' ? 'text-orange-500' : 'text-gray-500'
          }  `}
        />
      </a>
    </nav>
  );
}
