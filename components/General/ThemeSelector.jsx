import { MoonIcon, SunIcon } from '@heroicons/react/outline';

import { useSettings } from '@/hooks/useSettings';

export default function ThemeSelector({ className = '' }) {
  const { theme, updateTheme } = useSettings();

  const handleDarkClick = () => {
    updateTheme('dark');
    document.documentElement.classList.add('dark');
  };

  const handleLightClick = () => {
    updateTheme('light');
    document.documentElement.classList.remove('dark');
  };

  return (
    <nav className={`${className} h-7 w-7 text-slate-600 dark:text-white`}>
      <MoonIcon
        className={`h-6 w-6 cursor-pointer ${theme === 'dark' ? 'hidden' : ''}`}
        onClick={handleDarkClick}
      />
      <SunIcon
        className={`h-7 w-7 cursor-pointer ${
          theme === 'light' ? 'hidden' : ''
        }`}
        onClick={handleLightClick}
      />
    </nav>
  );
}
