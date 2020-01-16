import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';

const handleGetSchedule = async (intent) => {
  const [primary] = intent;

  return {
    message: "Jouw lessenrooster is terug te vinden op mijnrooster.arteveldehogeschool.be",
  }
}

export default handleGetSchedule;