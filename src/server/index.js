var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);


app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  
  socket.on('chat msg', function (msg) {
    console.dir("message:" + JSON.stringify(msg))
    io.emit("chat msg", msg);
  })
  
  socket.on("user name", function(user) {
    console.log("user name" + JSON.stringify(user));
    io.emit("user name", user);
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
