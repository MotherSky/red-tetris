const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("init-game", (username, room) => {
    console.log(username, room);
  });

  socket.emit("send-game", "This is the game object");
});
