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
  const weatherHours = [...hour, ...tomorrowHours];
  weatherHours.filter(
    (hour) => hour.time_epoch * 1000 >= new Date().getTime()
  ).length = 24;
  const next = forecastday.map((forecast, index) => {
    if (index > 0) {
      return forecast;
    }
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
    //next,
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
      'X-RapidAPI-Host': `${process.env.RAPIDAPI_HOST}`,
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    },
  };
  const weatherRes = await fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${
      city ? city : 'Buenos%20Aires'
    }&days=${process.env.RAPIDAPI_DAYS}`,
    options
  );
  const weatherData = await weatherRes.json();
  return parseWeatherData(weatherData);
};
export const getLocalWeatherData = () => {
  const weatherData = require('../forecast.sample.json');
  return parseWeatherData(weatherData);
};
