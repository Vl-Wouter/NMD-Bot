import consola from 'consola';
import BotResponse from '../response';
import filterImages from '../helpers/filterImages';

const handleExplain = async (intent) => {
  const { value } = intent;
  if (value === 'explain_NMD') {
    return {
      message: 'NMD staat voor New Media Development. Het is een keuzetraject binnen de opleiding Grafische en Digitale Media bij de Arteveldehogeschool in Gent.',
      image: "https://i.imgur.com/mL1SCAQ.jpg",
      link: "https://www.arteveldehogeschool.be/opleidingen/bachelor/grafische-en-digitale-media/new-media-development-multimediaproductie",
      linkText: "Meer info over de opleiding"
    };
  } else if (value === 'explain_undefined'){
    return {
        message: 'Undefined NMD is een web agency bestaande uit derdejaarsstudenten New Media Development van de Arteveldehogeschool in Gent. Met de tagline We Build Digital Stuff werken we verschillende digitale projecten uit van beginschets tot eindproduct.',
        image: "https://i.imgur.com/tqDiRbD.jpg",
        link: "https://undefinednmd.gdm.gent/",
        linkText: "Meer info over Undefined vind je hier"
      };
  }
  return {
    message: 'Ik weet niet wat uit te leggen? Help?',
  };
};

export default handleExplain;
