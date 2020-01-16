import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';

const handleGetSchedule = async (intent) => {
  const {value} = intent;

  return {
    message: "Klik hier om jouw lessenrooster te bekijken",
    link: "https://mijnrooster.arteveldehogeschool.be"
  }
}

export default handleGetSchedule;