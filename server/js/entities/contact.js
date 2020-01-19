import responses from '../data/responses.json';
import { fillString } from '../helpers';

const handleContact = async (language) => ({
  message: responses.contact.get_contact[language],
  link: {
    url: 'https://mijnrooster.arteveldehogeschool.be',
    text: responses.contact.contact_link[language],
  },
  activeIntent: null,
});
  
export default handleContact;