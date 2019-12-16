import handleMessage from '../js/handleMessage';
import { Wit } from 'node-wit';
import config from '../config';
import consola from 'consola';
import BotResponse from '../js/response';

require("babel-polyfill");

const client = new Wit({
  accessToken: config.wit.serverToken,
});

test('Replies to "Hello"', async () => {
  const data = await client.message("Hello");
  const reply = handleMessage(data);
  expect(reply).toBeInstanceOf(BotResponse);
  expect(reply.code).toBe(200);
});

test('Replies to "Hello there"', async () => {
  const data = await client.message("Hello there");
  const reply = handleMessage(data);
  expect(reply).toBeInstanceOf(BotResponse);
  expect(reply.code).toBe(200);
  expect(reply.image).not.toBeNull();
})

test('Asks to repeat when not understanding', async () => {
  const data = await client.message("This is not understandable.");
  const reply = handleMessage(data);
  expect(reply).toBeInstanceOf(BotResponse);
  expect(reply.code).toBe(404);
});

// test('Replies to "Hello there"', () => {
//   client
//     .message("Hello there")
//     .then(data => {
//       const reply = handleMessage(data);
//       expect(reply).toBeInstanceOf(BotResponse);
//       expect(reply.code).toBe(200);
//       expect(reply.image).not.toBeNull()
//       expect(reply.message).toBe("General Kenobi!");
//     })
//     .catch(error => {
//       consola.error(error);
//     })
// })