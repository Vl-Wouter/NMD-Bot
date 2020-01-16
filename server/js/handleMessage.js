import BotResponse from './response';
import handleGreeting from './entities/greeting';
import handleGetPerson from './entities/getPerson';
import handleGetSchedule from './entities/getSchedule';
import consola from 'consola';

const handleMessage = async ({entities}) => {
  if(entities) {
    if("intent" in entities ){   
      let response = {};
      switch(entities["intent"][0].value) {
        case "greeting":          
          response = await handleGreeting(entities["intent"]);
          return response;
          break;
        case "prequel_greeting":          
          response = await handleGreeting(entities["intent"]);
          return response;
          break;
        case "get_person":
          response = await handleGetPerson(entities["person_name"]);
          return response;
          break;
        case "get_schedule":
          response = await handleGetSchedule(entities["intent"]);
          return response;
          break;
        default:
          return {
            message: "Can you please repeat that?",
            image: null,
          }
      }
    }
  }
  return {
    message: "Woah buddy, text only please...",
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