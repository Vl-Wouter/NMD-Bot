import { app, client } from './app';
import http from 'http';
import socket from 'socket.io';
import mongoose from 'mongoose';
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
  socket.emit('reply', {
    message: "Hi there! I'm NMD-Bot. Welcome to my app!"
  })
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

// connect to mongodb
mongoose.connect(process.env.MONGODB_STRING);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));