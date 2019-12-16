import Response from './response';

const handleMessage = ({entities}) => {
  if(entities) {
    const entityKeys = Object.keys(entities);
    switch(entityKeys[0]) {
      case "greeting":
        return new Response("Hello there!");
      default:
        return new Response("I wonder what my future response would be...")
    }
  }
  return new Response("Can you repeat that, please?");
}

export default handleMessage;