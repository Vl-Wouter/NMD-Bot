import consola from 'consola';
import BotResponse from '../response';
import filterImages from '../helpers/filterImages';

const handleGetStudyGuide = async (intent) => {
  const { value } = intent;
  return {
    message: 'Een opleidingsgids, coming right up!',
    link: {
      url: 'https://www.arteveldehogeschool.be/sites/default/files/gdm_1920_web.pdf',
      text: 'Klik hier voor de opleidingsgids',
    },
    activeIntent: null,
  };
};

export default handleGetStudyGuide;
