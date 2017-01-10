var socket;//, messages = [];

function init() {
  socket = io.connect();

  socket.on("number of users", function(users) {
    document.getElementById("users").innerHTML = users;
  });

  socket.on("new message", function(message){
    var messageDiv = document.getElementById("messages");
    messageDiv.innerHTML = document.getElementById("messages").innerHTML + "<p>" + message + "</p>";
    messageDiv.scrollTop = messageDiv.scrollHeight;
  });
}

function send() {
  if(document.getElementById("input").value!="") {
    socket.emit("new message", document.getElementById("input").value);
    console.log("sending");
  }

  document.getElementById("input").value = "";
}
