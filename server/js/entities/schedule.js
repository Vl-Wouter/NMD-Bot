import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';

const handleGetSchedule = async (intent) => {
  const {value} = intent;
  return {
    message: "Het lessenrooster is te vinden op mijnrooster.arteveldehogeschool.be",
    link: "https://mijnrooster.arteveldehogeschool.be",
    linkText: "Klik hier om het lessenrooster te bekijken"
  }
}

export default handleGetSchedule;