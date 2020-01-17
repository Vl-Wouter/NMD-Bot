import { Wit, log, interactive } from 'node-wit';
import express from 'express';
import bodyParser from 'body-parser';
import consola from 'consola';
import { createEventAdapter } from '@slack/events-api';
import { WebClient } from '@slack/web-api';
import config from './config';
import handleMessage from './js/handleMessage';
import BotResponse from './js/response';
import Messenger from './js/messenger';
import slackHandler from './js/slackHandler';


const app = express();
const slackEvents = createEventAdapter(config.slack.signing_secret);
const slackWeb = new WebClient(config.slack.token);
app.use('/slack/events', slackEvents.expressMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fb messenger specific code
const messenger = new Messenger();
app.use(bodyParser.json({ verify: messenger.verifyRequestSignature }));

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

// Facebook webhook setup
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe'
    && req.query['hub.verify_token'] === messenger.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// Facebook message handler
app.post('/webhook', (req, res) => {
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && !event.message.is_echo) {
          const sender = event.sender.id;
          const { text, attachments } = event.message;
          if (attachments) {
            messenger.fbMessage(sender, 'Heel leuk dat je me bijlagen doorstuurt, maar ik weet niet wat ik hier mee moet doen 🤔');
          } else if (text) {
            client.message(text)
              .then((intent) => handleMessage(intent))
              .then((handledMessage) => {
                const { message: replyMessage, image, link } = handledMessage;
                if (image && link) {
                // reply with message and image+button combo
                  messenger.fbMessage(sender, replyMessage);
                  messenger.fbInfoCard(sender, replyMessage, image, link);
                } else {
                  if (link) {
                    messenger.fbLinkMessage(sender, replyMessage, link);
                  } else {
                    messenger.fbMessage(sender, replyMessage);
                  }
                  if (image) {
                    messenger.fbImageMessage(sender, image);
                  }
                }
              });
          }
        }
      });
    });
  }
  res.sendStatus(200);
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
