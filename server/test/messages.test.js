import request from 'supertest';
import { app } from '../app';
import BotResponse from '../js/response';

require('babel-polyfill');

describe('Send a message', () => {
  it('Should reply to "Hello"', async (done) => {
    await request(app)
      .post('/app')
      .send({
        message: 'Hello!',
      })
      .expect((response) => {
        const { body } = response;
        expect(body).toBeInstanceOf(Object);
        expect(body.message).toBe('Hello!');
        expect(body.image).toBeNull();
        done();
      });
  });
  it('Should send a prequel meme reply to "Hello there"', async (done) => {
    await request(app)
      .post('/app')
      .send({
        message: 'Hello there!',
      })
      .expect((response) => {
        const { body } = response;
        expect(body).toBeInstanceOf(Object);
        expect(body.message).toBe('General Kenobi!');
        expect(body.image).not.toBeNull();
        done();
      });
  });
  it('Asks to repeat when sending an unknown message', async (done) => {
    await request(app)
      .post('/app')
      .send({
        message: "These aren't the droids you're looking for.",
      })
      .expect((response) => {
        const { body } = response;
        expect(body).toBeInstanceOf(Object);
        expect(body.message).toBe('Woah buddy, text only please...');
        done();
      });
  });
});
