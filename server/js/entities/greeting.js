import consola from 'consola';
import BotResponse from '../response';
import filterImages from '../helpers/filterImages';

const handleGreeting = async (intent) => {
  console.log(intent);
  if (intent === 'prequel_greeting') {
    const response = await fetch('https://www.reddit.com/r/PrequelMemes.json');
    const data = await response.json();
    const posts = filterImages(data.data.children);
    return {
      message: 'General Kenobi!',
      image: {
        url: posts[Math.floor(Math.random() * posts.length - 1)].data.url,
        text: 'Prequel meme',
        is_accessory: false,
      },
    };
  }
  return {
    message: 'Hello!',
  };
};

export default handleGreeting;
