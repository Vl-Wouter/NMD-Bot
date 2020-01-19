import config from '../../config';
import responses from '../data/responses.json';
import { getRandom, fillString } from '../helpers';

const handleWeather = async (intent, entities, language) => {
console.log(intent, entities, language);

  try {
    if ('datetime' in entities) {
      const time = entities.datetime[0].value;
      const response = await fetch(`https://api.darksky.net/forecast/${config.weather.token}/${config.baselocation.lat},${config.baselocation.long},${(new Date(time).getTime()) / 1000}?lang=${language}&exclude=currently,flags,minutely,hourly&units=si`);
      const data = await response.json();
      const [weather] = data.daily.data;
      return {
        message: fillString(getRandom(responses.get_temperature.replies[language]), [
          (new Date(time)).toLocaleDateString(language, { weekday: 'long', day: 'numeric', month: 'long' }),
          weather.summary,
          weather.temperatureMin,
          weather.temperatureMax,
        ]),
        session: {
          active_conversation: null,
        },
      };
    }
    return {
      message: getRandom(responses.get_temperature.questions[language]),
      session: {
        active_conversation: {
          intent,
          language,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
      session: {
        active_conversation: null,
      },
    };
  }
};

export default handleWeather;
