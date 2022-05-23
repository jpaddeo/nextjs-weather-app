import { useState } from 'react';

import useStorage from '@/hooks/useStorage';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export default function ThemeSelector({ className = '' }) {
  const { getItem, setItem } = useStorage();
  const [theme, setTheme] = useState(getItem('theme') || 'light');

  const handleDarkClick = () => {
    setTheme('dark');
    setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  };

  const handleLightClick = () => {
    setTheme('light');
    setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  };

  return (
    <nav className={`${className} text-white h-7 w-7`}>
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
