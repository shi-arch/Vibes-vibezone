const io = require('socket.io-client');

let socketInstance = null;

function getSocketInstance() {
  if (!socketInstance) {
    debugger
    socketInstance = io('http://localhost:3000'); // Replace with your server URL
    socketInstance.on('connect', () => {
      console.log('Connected to server');
    });
  }
  return socketInstance;
}

module.exports = getSocketInstance;