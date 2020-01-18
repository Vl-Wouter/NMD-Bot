import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';
import consola from 'consola';
import { app, client } from './app';
import config from './config';
import handleMessage from './js/handleMessage';
/**
 * Setup and run server
 */
consola.info('Starting server...');

const PORT = config.serverPort || 8000;
const server = http.createServer(app);
const io = socket(server);

// Socket io handling
io.on('connection', (socket) => {
  consola.info('A user connected');
  socket.emit('reply', {
    message: 'Hey! Ik ben NMD-Bot. Als je iets wil weten over NMD, Undefined of de campus moet je het maar vragen 😄. If it is easier for you, I can also answer some questions in English',
  });
  socket.on('message', async (msg) => {
    const reply = await handleMessage(msg, client);
    socket.emit('reply', reply);
  });
  socket.on('disconnect', () => {
    consola.info('user disconnected');
  });
});

server.listen(PORT, () => {
  consola.ready(`Listening on ${PORT}`);
});

// connect to mongodb
mongoose.connect(config.db.token);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', consola.error.bind(console, 'MongoDB connection error:'));
