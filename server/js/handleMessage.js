import handleGreeting from './entities/greeting';
import handleGetPerson from './entities/person';
import handleWeather from './entities/weather';
import handleGetSchedule from './entities/schedule';
import handleGetStudyGuide from './entities/studyGuide';
import handleExplain from './entities/explain';

// Initialize active intent
let activeIntent = null;

/**
 * Get primary or active intent from entitylist
 * @param {Object[]} entities
 */
const getPrimaryIntent = (entities) => {
  if (activeIntent) {
    return activeIntent;
  }
  if (entities.intent && activeIntent == null) {
    return entities.intent[0].value;
  }
  return null;
};

/**
 * Handles a message based on intents and builds a response
 * @param {Object} request
 */
const handleMessage = async ({ entities }) => {
  if (entities) {
    if (getPrimaryIntent(entities)) {
      const primary = getPrimaryIntent(entities);
      let response = {};
      switch (primary) {
        case 'default_greeting':
          response = await handleGreeting(primary);
          break;
        case 'prequel_greeting':
          response = await handleGreeting(primary);
          break;
        case 'get_person':
          response = await handleGetPerson(primary, entities);
          break;
        case 'get_temperature':
          response = await handleWeather(primary, entities);
          break;
        case 'get_schedule':
          response = await handleGetSchedule(primary);
          break;
        case 'get_study_guide':
          response = await handleGetStudyGuide(primary);
          break;
        case 'explain_NMD':
          response = await handleExplain(primary);
          break;
        case 'explain_undefined':
          response = await handleExplain(primary);
          break;
        default:
          response = {
            message: 'Can you please repeat that?',
            image: null,
            activeIntent: null,
          };
      }
      activeIntent = response.activeIntent;
      return response;
    }
  }
  return {
    message: 'Woah buddy, text only please... 😠',
  };
};

// old handleMessage, for temporary reference
// in the current version wit will always return the 'intent' entity, with potentially
// an additional entity (e.g. 'name' or 'age')
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
