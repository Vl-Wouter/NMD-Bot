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
  let reply = null;
  try {
    const data = await client.message("Hello");
    reply = handleMessage(data);
  } catch (error) {
    consola.error(error);
  } finally {
    expect(reply).toBeInstanceOf(BotResponse);
    expect(reply.code).toBe(200);
  }
});

test('Replies to "Hello there"', async () => {
  let reply = null;
  try {
    const data = await client.message("Hello there");
    reply = handleMessage(data);

  } catch (error) {
    consola.error(error);
  } finally {
    expect(reply).toBeInstanceOf(BotResponse);
    expect(reply.code).toBe(200);
    expect(reply.image).not.toBeNull();
  }
})

test('Asks to repeat when not understanding', async () => {
  let reply = null;
  try {
    const data = await client.message("This is not understandable.");
    reply = handleMessage(data);
  } catch (error) {
    consola.error(error);
  } finally {
    expect(reply).toBeInstanceOf(BotResponse);
    expect(reply.code).toBe(404);
  }
});