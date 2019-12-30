import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';

const handleGreeting = async (intents) => {
  const [primary] = intents;
  if (primary.value === 'prequel_greeting') {
    const response = await fetch("https://www.reddit.com/r/PrequelMemes.json");
    const data = await response.json();
    const posts = filterImages(data.data.children);
    return {
      message: "General Kenobi!",
      image: posts[Math.floor(Math.random() * posts.length - 1)].data.url,
    }
  }
  return {
    message: "Hello!",
  }
}

export default handleGreeting;