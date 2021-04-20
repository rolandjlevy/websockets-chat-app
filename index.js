const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;

// environment variables
require('dotenv').config();

// static files
app.use(express.static('public'));

// App setup
const server = app.listen(port, () => {
  console.log('Listening on port', port)
});

// Socket setup on server
const io = socket(server);

// Set up socket.io on front end

// listen for connection event
io.on('connection', (socket) => {
  // socket variable connects client to the server
  console.log('socket made connection', socket);
});