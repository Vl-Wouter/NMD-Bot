import responses from '../data/responses.json';
import { fillString } from '../helpers';

const handleGetStudyGuide = async (language) => ({
  message: responses.study_guide.get_study_guide[language],
  link: {
    url: 'https://www.arteveldehogeschool.be/sites/default/files/gdm_1920_web.pdf',
    text: responses.study_guide.study_guide_link[language],
  },
  activeIntent: null,
});

export default handleGetStudyGuide;
