import Head from 'next/head';

export default function Home({ weatherData }) {
  console.log(weatherData);
  const { current, location } = weatherData;
  const {
    condition,
    feelslike_c,
    humidity,
    temp_c,
    wind_kph,
    wind_dir,
    is_day,
    vis_km,
  } = current;
  const { name, country, localtime, tz_id } = location;
  return (
    <div className='bg-gray-400'>
      <Head>
        <title>miduweather</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen items-center justify-center'>
        <div className='flex w-full max-w-xs flex-col rounded bg-white p-4 shadow-lg'>
          <div className='text-xl font-bold'>{name}</div>
          <div className='text-sm text-gray-500'>{country}</div>
          <div className='mt-6 inline-flex h-24 w-24 items-center justify-center self-center rounded-lg text-6xl text-indigo-400'>
            <svg
              className='h-32 w-32'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
              ></path>
            </svg>
          </div>
          <div className='mt-6 flex flex-row items-center justify-center'>
            <div className='text-6xl font-medium'>{temp_c}°</div>
            <div className='ml-6 flex flex-col items-center'>
              <div>{condition.text}</div>
              <div className='mt-1'>
                <span className='text-sm'>
                  <i className='far fa-long-arrow-up'></i>
                </span>
                <span className='text-sm font-light text-gray-500'>28°C</span>
              </div>
              <div>
                <span className='text-sm'>
                  <i className='far fa-long-arrow-down'></i>
                </span>
                <span className='text-sm font-light text-gray-500'>20°C</span>
              </div>
            </div>
          </div>
          <div className='mt-6 flex flex-row justify-between'>
            <div className='flex flex-col items-center'>
              <div className='text-sm font-medium'>Wind</div>
              <div className='text-sm text-gray-500'>{wind_kph}k/h</div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='text-sm font-medium'>Humidity</div>
              <div className='text-sm text-gray-500'>{humidity}%</div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='text-sm font-medium'>Visibility</div>
              <div className='text-sm text-gray-500'>{vis_km}km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { city } = query;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': `${process.env.RAPIDAPI_HOST}`,
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    },
  };
  const weahterRes = await fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${
      city ? city : 'Buenos%20Aires'
    }&days=${process.env.RAPIDAPI_DAYS}`,
    options
  );
  const weatherData = await weahterRes.json();
  return {
    props: {
      weatherData,
    },
  };
}