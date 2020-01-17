import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';

const handleGetStudyGuide = async (intent) => {
  const {value} = intent;
  return {
    message: "Een opleidingsgids, coming right up!",
    link: "https://www.arteveldehogeschool.be/sites/default/files/gdm_1920_web.pdf",
    linkText: "Klik hier voor de opleidingsgids"
  }
}

export default handleGetStudyGuide;