import { useContext } from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';

import SettingsContext from '@/contexts/SettingsContext';

export default function ThemeSelector({ className = '' }) {
  const { theme, updateTheme } = useContext(SettingsContext);

  const handleDarkClick = () => {
    updateTheme('dark');
    document.documentElement.classList.add('dark');
  };

  const handleLightClick = () => {
    updateTheme('light');
    document.documentElement.classList.remove('dark');
  };

  return (
    <nav className={`${className} h-7 w-7 text-white`}>
      <MoonIcon
        className='h-6 w-6 cursor-pointer'
        onClick={handleDarkClick}
        hidden={theme === 'dark'}
      />
      <SunIcon
        className='h-7 w-7 cursor-pointer'
        onClick={handleLightClick}
        hidden={theme === 'light'}
      />
    </nav>
  );
}
