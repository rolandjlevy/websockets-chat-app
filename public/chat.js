// make connection

const serverAddress = 'http://localhost:4000';
// this event will be heard on the server
const socket = io.connect(serverAddress);

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

$('#send').addEventListener('click', (e) => {
  // emit data down the socket to the server
  const data = {
    message: $('#message').value,
    handle: $('#handle').value,
    id: socket.id
  };
  socket.emit('chat', data);
});

const buttonState = { handle: false, message: false }
const buttonEnabled = () => Object.values(buttonState).every(n => !Boolean(n));

$('#message').addEventListener('keyup', (e) => {
  socket.emit('typing', $('#handle').value);
  buttonState['message'] = e.target.value.length;
  $('#send').disabled = buttonEnabled();
});

$('#handle').addEventListener('keyup', (e) => {
  buttonState['handle'] = e.target.value.length;
  $('#send').disabled = buttonEnabled();
});

// Listen for events
socket.on('chat', (data) => {
  const person = data.id === socket.id ? ' self' : '';
  $('#output').innerHTML += `<p class="${person}"><strong>${data.handle}</strong>: ${data.message}</p>`;
  $('#feedback').innerHTML = '';
});

// Listen for events
socket.on('typing', (data) => {
  $('#feedback').innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});