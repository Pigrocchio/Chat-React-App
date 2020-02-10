var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const express = require("express");
const path = require("path");
const PORT =
  process.env.PORT || 3001


app.use(express.static(path.join(__dirname, "../../build")));

app.get("/", (req, res, next) => res.sendFile(__dirname + "./index.html"));

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

http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`);
});
