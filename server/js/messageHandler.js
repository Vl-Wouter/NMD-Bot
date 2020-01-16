import client from '../app';

const getPrimaryEntity = (entities) => {
  if (!entities) return null;
  return Object.values(en)
}

export const messageHandler = (message) => {
  const entities = client.message(msg);

}

//! This is outdated: use handleMessage.js

// class MessageHandler {
//   static detectIntents = (entities) => {
//     const entityKeys = Object.keys(entities)
//     if(entityKeys.length == 0) return null;
//     const entityArray = []
//     entityKeys.forEach(key => {
//       entityArray.push({
//         name: entityKeys[0],
//         value: entities[entityKeys[0]]
//       })
//     })
//     return entityArray;
//   }

//   static detectPrimaryIntentType = (intents) => {
//     return intents[0].value;
//   }

//   static handleMessage = async ({entities}) => {
//     // if(!entities) return {message: "No entities found"}
//     // const intents = this.detectIntents(entities);
//     // if(!intents) return {message: "No intents found"};
//     // const primaryType = this.detectPrimaryIntentType(intents)[0].value;
//     if (entities && "intent" in entities) {

//     }

//     return {
    
//     }
//   }
// }

// export default MessageHandler;