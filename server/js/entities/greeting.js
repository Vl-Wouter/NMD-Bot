import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';
// const getPrequel = async () => {
//   try {
//     const response = await fetch('https://www.reddit.com/r/PrequelMemes.json')
//     const data = await response.json();
//     const imagePosts = filterImages(data.data.children);
//     const index = Math.floor(Math.random() * imagePosts.length - 1);
//     return new BotResponse("General Kenobi!", imagePosts[index].data.url);
//   } catch (error) {
//     consola.fatal(error);
//   }
// }

// const handleGreeting = async (entities) => {
//   const entity = entities[0].value;
//   switch (entity) {
//     case "prequel_greeting":
//       return await getPrequel();
//     default:
//       return new BotResponse("Hi there, I'm NMD-Bot. The bottiest bot that ever botted!")
//   }
// }

const handleGreeting = (intents) => {
  const primaryIntent = intents[0].value;
  if (primaryIntent === "prequel_greeting") {
    return fetch("https://www.reddit.com/r/PrequelMemes.json")
      .then(response => response.json())
      .then(json => {
        const posts = filterImages(json.data.children);
        return new BotResponse("General Kenobi!", posts[Math.floor(Math.random() * posts.length - 1)]);
      })
      .catch(error => consola.error(error));
  }
  return new BotResponse("Hello!");
}

export default handleGreeting;