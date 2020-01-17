import { Wit, log, interactive } from 'node-wit';
import express from 'express';
import consola from 'consola';
import { createEventAdapter } from '@slack/events-api';
import { WebClient } from '@slack/web-api';
import config from './config';
import handleMessage from './js/handleMessage';
import slackHandler from './js/slackHandler';

const app = express();
const slackEvents = createEventAdapter(config.slack.signing_secret);
const slackWeb = new WebClient(config.slack.token);
app.use('/slack/events', slackEvents.expressMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Wit({
  accessToken: config.wit.serverToken,
});

/**
 * Post route for own client
 * ! Replaced by sockets
 */
app.post('/app', async (req, res) => {
  consola.info('Message received from client');
  const { message } = req.body;
  try {
    const intent = await client.message(message);
    const {
      message: replyMessage, image, link, linkText,
    } = await handleMessage(intent);
    consola.success('Replied to client with message');
    res.json(new BotResponse(replyMessage, image, link, linkText));
  } catch (error) {
    consola.fatal(error);
  }
});

/**
 * Slack integration route
 */
slackEvents.on('app_mention', async (event) => {
  const reply = await slackHandler(client, event);
  console.log(reply);
  slackWeb.chat.postMessage({
    channel: event.channel,
    blocks: reply,
  });
});

app.get('/', (req, res) => res.send('HALLOOOOOOOOOO'));

export { app, client };
