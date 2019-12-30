import BotResponse from './response';
import handleGreeting from './entities/greeting';
import consola from 'consola';

const handleMessage = async ({entities}) => {
  if(entities) {
    const entityKeys = Object.keys(entities);
    switch(entityKeys[0]) {
      case "greeting":
        const response = await handleGreeting(entities["greeting"]);
        return response;
        break;
      default:
        return {
          message: "Can you please repeat that?",
          image: null,
        }
    }
  }
  return {
    message: "Woah buddy, text only please...",
  }
}

export default handleMessage;