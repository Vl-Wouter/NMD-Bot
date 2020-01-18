import { filterImages, getRandom } from '../helpers';
import responses from '../data/responses.json';

const handleGreeting = async (intent, language) => {
  try {
    if (intent === 'prequel_greeting') {
      const response = await fetch('https://www.reddit.com/r/PrequelMemes.json');
      const data = await response.json();
      const posts = filterImages(data.data.children);
      return {
        message: getRandom(responses.prequel_greeting),
        image: {
          url: posts[Math.floor(Math.random() * posts.length - 1)].data.url,
          text: 'Prequel meme',
          is_accessory: false,
        },
      };
    }
    return {
      message: getRandom(responses.default_greeting[language]),
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export default handleGreeting;
