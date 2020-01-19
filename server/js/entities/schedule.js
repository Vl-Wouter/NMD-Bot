import responses from '../data/responses.json';
import { fillString } from '../helpers';

const handleGetSchedule = async (language) => ({
  message: responses.schedule.get_schedule[language],
  link: {
    url: 'https://mijnrooster.arteveldehogeschool.be',
    text: responses.schedule.schedule_link[language],
  },
  activeIntent: null,
});

export default handleGetSchedule;
