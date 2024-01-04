const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")({
  ...server,
  cors: {
    origin: ["http://localhost:5173" || process.env.ALLOWED_PATH],
  },
});

io.on("connection", (socket) => {
  io.emit("hello", { message: "hello from server" });
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data);
  });
});

module.exports = io;
