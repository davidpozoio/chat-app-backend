const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")({
  ...server,
  cors: {
    origin: [process.env.ALLOWED_PATH || "http://localhost:5173"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Chat App</h1>");
});

io.on("connection", (socket) => {
  io.emit("hello", { message: "hello from server" });
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data);
  });
});

module.exports = io;
