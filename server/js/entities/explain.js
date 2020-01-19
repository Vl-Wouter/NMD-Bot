import responses from '../data/responses.json';
import { fillString } from '../helpers';

const handleExplain = async (intent, language) => {
  if (intent === 'explain_NMD') {
    return {
      message: responses.explain_nmd.get_explain_nmd[language],
      image: {
        url: 'https://i.imgur.com/mL1SCAQ.jpg',
        text: 'NMD',
        is_accessory: true,
      },
      link: {
        url: 'https://www.arteveldehogeschool.be/opleidingen/bachelor/grafische-en-digitale-media/new-media-development-multimediaproductie',
        text: responses.explain_nmd.explain_nmd_link[language],
      },
      activeIntent: null,
    };
  } if (intent === 'explain_undefined') {
    return {
      message: responses.explain_undefined.get_explain_undefined[language],
      image: {
        url: 'https://i.imgur.com/tqDiRbD.jpg',
        text: 'Undefined logo',
        is_accessory: true,
      },
      link: {
        url: 'https://undefinednmd.gdm.gent/',
        text: responses.explain_undefined.explain_undefined_link[language],
      },
      activeIntent: null,
    };
  }
  return {
    message: responses.error.unknown[language],
    activeIntent: null,
  };
};

export default handleExplain;
