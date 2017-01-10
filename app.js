//Library imports and server variables
var io = require("socket.io"),
    express = require("express"),
    app = express(),
    socket,
    numUsers = 0;

function init() {
  app.use(express.static('public'));

  var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log('Server running at port %s', port);
  });

  socket = io(server);

  setListeners();
}

function setListeners() {
  socket.on("connection", function(client) {
    numUsers++;
    socket.sockets.emit("number of users", numUsers);

    client.on("new message", function(message) {
      socket.sockets.emit("new message", message);
    });

    client.on("disconnect", function() {
      numUsers--;
      socket.sockets.emit("number of users", numUsers);
    });

  });
}

init();
