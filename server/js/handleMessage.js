import handleGreeting from './entities/greeting';
import { handleGetPerson, handleGetRandomPerson } from './entities/person';
import handleWeather from './entities/weather';
import handleGetSchedule from './entities/schedule';
import handleGetStudyGuide from './entities/studyGuide';
import handleExplain from './entities/explain';
import handleContact from './entities/contact';
import { detectFromString, getRandom } from './helpers';
import responses from './data/responses.json';
import handleLanguage from './entities/language';

// Initialize active intent

/**
 * Get primary or active intent from entitylist
 * @param {Object[]} entities
 */
const getPrimaryIntent = (entities, session) => {
  if (session && session.active_conversation) {
    return session.active_conversation;
  }
  if (entities.intent) {
    return {
      intent: entities.intent[0].value,
      language: null,
    };
  }
  return null;
};

/**
 * Handles a message based on intents and builds a response
 * @param {String} message
 */
const handleMessage = async (message, client, session) => {
  try {
    const { entities } = await client.message(message);
    let language = session && session.language ? session.language : detectFromString(message);
    if (entities) {
      if (getPrimaryIntent(entities, session)) {
        const { intent, language: activeLang } = getPrimaryIntent(entities, session);
        if (activeLang) language = activeLang;
        let response = {};
        switch (intent) {
          case 'default_greeting':
            response = await handleGreeting(intent, language);
            break;
          case 'prequel_greeting':
            response = await handleGreeting(intent, language);
            break;
          case 'get_person':
            response = await handleGetPerson(entities, language);
            break;
          case 'get_random_person':
            response = await handleGetRandomPerson(language);
            break;
          case 'get_contact':
            response = await handleContact(entities, language);
            break;
          case 'get_temperature':
            response = await handleWeather(intent, entities, language);
            break;
          case 'get_schedule':
            response = await handleGetSchedule(intent);
            break;
          case 'get_study_guide':
            response = await handleGetStudyGuide(intent);
            break;
          case 'explain_NMD':
            response = await handleExplain(intent);
            break;
          case 'explain_undefined':
            response = await handleExplain(intent);
            break;
          case 'set_language':
            response = await handleLanguage(entities, language);
            break;
          default:
            response = {
              message: getRandom(responses.error.unknown[language]),
              image: null,
              session: {
                active_conversation: null,
              },
            };
        }
        if (session && response.session) {
          Object.entries(response.session).forEach(([key, value]) => {
            session[key] = value;
            session.save();
          });
        }
        if (!session && response.session) {
          response = {
            message: 'Sessions are not supported for this client.',
          };
        }
        const { session: replySession, ...reply } = response;
        return reply;
      }
    }
    return {
      message: getRandom(responses.error.unknown[language]),
    };
  } catch (err) {
    console.log(err);
    return {
      message: err.message,
    };
  }
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
