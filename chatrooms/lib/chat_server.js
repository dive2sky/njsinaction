var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);

  io.sockets.on('connection', function (socket) {

    console.log('a user connected');

    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });

  });
};
