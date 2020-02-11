const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = module.export = require("socket.io")(http);
const path = require("path");

const PORT = process.env.PORT || 5000


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

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
