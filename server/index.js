import { app, client } from './app';
import http from 'http';
import socket from 'socket.io';
import config from './config';
import handleMessage from './js/handleMessage';
/**
 * Setup and run server
 */
consola.info("Starting server...");

const PORT = config.serverPort || 8000;
const server = http.createServer(app);
const io = socket(server);


// Socket io handling
io.on('connection', (socket) => {
  consola.info('A user connected');
  socket.on('message', async (msg) => {
    const intents = await client.message(msg);
    const reply = await handleMessage(intents);
    socket.emit('reply', reply);
  })
  socket.on('disconnect', () => {
    consola.info('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})