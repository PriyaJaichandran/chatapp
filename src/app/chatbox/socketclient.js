var socket = io('http://localhost:8000');  // Server endpoint

socket.on('connect', connectUser);

socket.on('message', function (data) {
  console.log(data);
});

function connectUser (userId) {  // Called whenever a user signs in
  if (!userId) return;
  socket.emit('userConnected', userId);
}

function disconnectUser (userId) {  // Called whenever a user signs out
  if (!userId) return;
  socket.emit('userDisconnected', userId);
}