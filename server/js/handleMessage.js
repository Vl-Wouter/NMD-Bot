import BotResponse from './response';
import handleGreeting from './entities/greeting';
import consola from 'consola';

const handleMessage = ({entities}) => {
  if(entities) {
    const entityKeys = Object.keys(entities);
    switch(entityKeys[0]) {
      case "greeting":
        return handleGreeting(entities["greeting"]);
      default:
        return new BotResponse("I wonder what my future response would be...", null, 404)
    }
  }
  return new BotResponse("Can you repeat that, please?", null, 404);
}

export default handleMessage;