import BotResponse from "./response";

class MessageHandler {
  static detectIntents = (entities) => {
    const entityKeys = Object.keys(entities)
    if(entityKeys.length == 0) return null;
    const entityArray = []
    entityKeys.forEach(key => {
      entityArray.push({
        name: entityKeys[0],
        value: entities[entityKeys[0]]
      })
    })
    return entityArray;
  }

  static detectPrimaryIntentType = (intents) => {
    return intents[0].value;
  }

  static handleMessage = async ({entities}) => {
    if(!entities) return BotResponse.messageResponse("Nothing here...");
    const intents = this.detectIntents(entities);
    if(!intents) return BotResponse.messageResponse("Can you repeat that please?");
    console.log(entities, intents)

  }
}

export default MessageHandler;