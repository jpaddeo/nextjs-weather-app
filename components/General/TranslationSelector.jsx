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
        className='transform rounded-md border-2 border-solid border-white bg-transparent p-1 text-sm font-semibold uppercase text-white transition duration-100 hover:scale-105 hover:opacity-80 lg:text-xl'
      >
        {locales?.map((locale) => (
          <option
            key={locale}
            value={locale}
            className='bg-gray-700 font-bold text-white'
          >
            {locale}
          </option>
        ))}
      </select>
    </nav>
  );
}
