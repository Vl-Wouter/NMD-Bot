import config from '../../config';

const handleWeather = async (intent, entities) => {
  if ('datetime' in entities) {
    const time = entities.datetime[0].value;
    const response = await fetch(`https://api.darksky.net/forecast/${config.weather.token}/${config.baselocation.lat},${config.baselocation.long},${(new Date(time).getTime()) / 1000}?lang=nl&exclude=currently,flags,minutely,hourly&units=si`);
    const data = await response.json();
    const [weather] = data.daily.data;
    return {
      message: `Het weer voor ${(new Date(time)).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })} op de campus is: ${weather.summary} De temperaturen liggen tussen ${weather.temperatureMin} en ${weather.temperatureMax} graden.`,
      activeIntent: null,
    };
  }
  return {
    message: 'Voor welke datum wil je het weer weten? 🤔',
    activeIntent: intent,
  };
};

export default handleWeather;
