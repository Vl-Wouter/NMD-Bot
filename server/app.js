import { Wit, log, interactive } from 'node-wit';
import express from 'express';
import consola from 'consola';
import config from './config';
import handleMessage from './js/handleMessage';
import messageHandler from './js/messageHandler';
import BotResponse from './js/response';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const client = new Wit({
  accessToken: config.wit.serverToken,
});

/**
 * Post route for own client
 * ! Replaced by sockets
 */
app.post('/app', async (req, res) => {
  consola.info("Message received from client");
  const { message } = req.body;
  try {
    const intent = await client.message(message);
    const { message: replyMessage, image, link, linkText } = await handleMessage(intent);
    consola.success("Replied to client with message")
    res.json(new BotResponse(replyMessage, image, link, linkText));
  } catch (error) {
    consola.fatal(error);
  }
});

app.get("/", (req, res) => res.send("HALLOOOOOOOOOO"));

export {app, client};