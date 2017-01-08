var canvas, context, socket, numUsers = 0, messages = [];

function init() {
  canvas = document.getElementById("chatDisplay");
  context = canvas.getContext("2d");
  socket = io.connect();

  socket.on("number of users", function(users) {
    numUsers = users;
    repaint();
  });

  socket.on("new message" function(message){
    messages.push(message);
    repaint();
  });

  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, false);

}

function repaint() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillText("Users online: " + numUsers,10,10);

  var i;
  for(i = 0; i < messages.length; i++) {
    context.fillText(messages[i], 50, canvas.height - 50 - 30 * i);
  }
}
