import BotResponse from './response';
import handleGreeting from './entities/greeting';
import handleGetPerson from './entities/getPerson';
import consola from 'consola';

// Get primary intent from the entities
const getPrimaryIntent = (entities) => {
  if (Object.values(entities).length > 0) {
    return {
      entity: Object.entries(entities)[0][0],
      intent: Object.entries(entities)[0][1][0]
    };
  }
  return false
}

const handleMessage = async ({entities}) => {
  if(entities) {
    if(getPrimaryIntent(entities).entity){  
      let primary = getPrimaryIntent(entities);
      let response = {};
      switch(primary.intent.value) {
        case "default_greeting":          
          response = await handleGreeting(primary.intent);
          return response;
        case "prequel_greeting":          
          response = await handleGreeting(primary.intent);
          return response;
        case "get_person":
          response = await handleGetPerson(primary.intent);
          return response;
        default:
          return {
            message: "Can you please repeat that?",
            image: null,
          }
      }
    }
  }
  return {
    message: "Woah buddy, text only please... 😠",
  }
}

//old handleMessage, for temporary reference
//in the current version wit will always return the 'intent' entity, with potentially
//an additional entity (e.g. 'name' or 'age')
/*
const handleMessage = async ({entities}) => {
  if(entities) {
    const entityKeys = Object.keys(entities);
    console.log("entities");
    console.log(entityKeys);
    switch(entityKeys[0]) {
      case "greeting":
        const response = await handleGreeting(entities["greeting"]);
        console.log(response);
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
*/

export default handleMessage;