const parseWeatherData = (data) => {
  const { location, current, forecast } = data;
  const {
    temp_c,
    temp_f,
    humidity,
    wind_kph,
    wind_mph,
    uv,
    feelslike_c,
    feelslike_f,
    condition,
    is_day,
  } = current;
  const { forecastday } = forecast;
  const todayForecast = forecastday[0];
  const { astro, hour } = todayForecast;
  const { sunrise, sunset, moonrise, moonset } = astro;
  const tomorrowForecast = forecastday[1];
  const { hour: tomorrowHours } = tomorrowForecast;
  const weatherHoursAll = [...hour, ...tomorrowHours];
  const weatherHours = weatherHoursAll.filter(
    (hour) => hour.time_epoch * 1000 >= new Date().getTime()
  );
  if (weatherHours.length > 24) {
    weatherHours.length = 24;
  }
  const nexts = forecastday
    .filter((_, index) => index > 0)
    .map((forecast) => {
      return {
        date: forecast.date,
        dateEpoch: forecast.date_epoch,
        icon: {
          code: forecast.day.condition.code,
          url: `https://${forecast.day.condition.icon}`,
        },
        minTemperature: {
          F: forecast.day.mintemp_f,
          C: forecast.day.mintemp_c,
        },
        maxTemperature: {
          F: forecast.day.maxtemp_f,
          C: forecast.day.maxtemp_c,
        },
      };
    });

  return {
    today: {
      location: {
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        localtime: location.localtime,
        localtimeEpoch: location.localtime_epoch,
      },
      icon: {
        code: condition.code,
        url: `https://${condition.icon}`,
      },
      temperature: {
        F: temp_f,
        C: temp_c,
      },
      feelsLike: {
        F: feelslike_f,
        C: feelslike_c,
      },
      sunrise,
      sunset,
      moonrise,
      moonset,
      humidity,
      uv,
      isDay: is_day,
      wind: {
        KMH: wind_kph,
        MPH: wind_mph,
      },
      hours: weatherHours.map((hour) => ({
        time: hour.time,
        timeEpoch: hour.time_epoch,
        temperature: {
          F: hour.temp_f,
          C: hour.temp_c,
        },
        icon: {
          url: `https://${hour.condition.icon}`,
          code: hour.condition.code,
        },
      })),
    },
    nexts,
  };
};
export const getWeatherConditionsData = async () => {
  const weatherConditionsRes = await fetch(
    `https://www.weatherapi.com/docs/weather_conditions.json`
  );
  const weatherConditions = await weatherConditionsRes.json();
  return weatherConditions;
};

export const getWeatherData = async (city) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': `${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}`,
      'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
    },
  };
  const weatherRes = await fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${
      city ? city : 'Buenos%20Aires'
    }&days=${process.env.NEXT_PUBLIC_RAPIDAPI_DAYS}`,
    options
  );
  const weatherData = await weatherRes.json();
  return parseWeatherData(weatherData);
};
export const getLocalWeatherData = () => {
  const weatherData = require('../forecast.sample.json');
  return parseWeatherData(weatherData);
};
