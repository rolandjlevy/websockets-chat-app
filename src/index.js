const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();
app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log('Listening on port', port);
});

// Socket setup on server
const io = socket(server);

// listen for connection event
io.on('connection', (socket) => {
  // socket variable connects client to the server
  console.log('socket made connection. Socket ID:', socket.id);
  // listen for chat
  socket.on('chat', (data) => {
    // emit event to send data out to all sockets
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    // broadcast event to send data out to all sockets
    socket.broadcast.emit('typing', data);
  });
});