// make connection

const serverAddress = 'http://localhost:4000';
// this event will be heard on the server
const socket = io.connect(serverAddress);

const $ = (el) => document.querySelector(el);

$('#send').addEventListener('click', (e) => {
  // emit data down the socket to the server
  const data = {
    message: $('#message').value,
    handle: $('#handle').value
  };
  socket.emit('chat', data);
});

$('#message').addEventListener('keypress', (e) => {
  socket.emit('typing', $('#handle').value);
});

// Listen for events
socket.on('chat', (data) => {
  $('#output').innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`;
  $('#feedback').innerHTML = '';
});

// Listen for events
socket.on('typing', (data) => {
  $('#feedback').innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});