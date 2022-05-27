import { useRouter } from 'next/router';

export default function TranslationSelector({ className }) {
  const router = useRouter();
  const { locales, locale, pathname, asPath, query } = router;

  const changeLocale = (nextLocale) => {
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <nav className={className}>
      <select
        defaultValue={locale}
        onChange={(ev) => changeLocale(ev.target.value)}
        className='transform rounded-md border-2 border-solid border-slate-600 bg-transparent p-1 text-sm font-semibold uppercase text-slate-600 transition duration-100 hover:scale-105 hover:opacity-80 dark:border-white dark:text-white lg:text-xl'
      >
        {locales?.map((locale) => (
          <option
            key={locale}
            value={locale}
            className='bg-gray-700 font-bold text-white dark:bg-gray-100 dark:text-slate-600'
          >
            {locale}
          </option>
        ))}
      </select>
    </nav>
  );
}
