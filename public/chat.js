// make connection

const serverAddress = 'http://localhost:4000';
const socket = io.connect(serverAddress); // this event will be heard on the server