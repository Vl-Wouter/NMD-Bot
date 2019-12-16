import { Wit, log, interactive } from 'node-wit';
import express from 'express';
import consola from 'consola';
import config from './config';
import handleMessage from './js/handleMessage';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const client = new Wit({
  accessToken: config.wit.serverToken,
});

/**
 * Post route for own client
 */
app.post('/app', (req, res) => {
  consola.info("Message received from client");
  const { message } = req.body;
  client
    .message(message)
    .then(data => {
      const reply = handleMessage(data);
      res.json(reply);
      consola.success("Replied to message: " + reply.message);
    })
    .catch(error => consola.error(error));
});

app.get("/", (req, res) => res.send("HALLOOOOOOOOOO"));

/**
 * Set port and run application
 */
consola.info("Starting server...")
const PORT = config.serverPort || 8000;
app.listen(PORT,  () => {
  consola.start(`Server started on port: ${PORT}`);
});