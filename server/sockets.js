const socketio = require("socket.io");
const Rooms = require("./modules/room");

module.exports = {
  startSocketServer: function (server) {
    let io = socketio(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", async (socket) => {
      try {
        var { userUUID, roomName, userName } = socket.handshake.query;

        if (userUUID && roomName && userName) {
          console.info("connect user", {
            userUUID,
            roomName,
            userName,
            socket_id: socket.id,
          });
          await Rooms.joinRoom(roomName, userUUID, userName, io);

          //join rooms (uuid and gameRoom)
          socket.join(userUUID);
          socket.join(roomName);

          const roomData = Rooms.rooms[roomName];
          const player = roomData.players[userUUID].getPlayer();
          player.gameMaster = Rooms.rooms[roomName].host === userUUID;
          const currPlayersList = await Rooms.getRoomPlayers(
            roomName,
            userUUID
          );

          //init the players list for the player joined
          socket.emit("initSpectatorList", currPlayersList);
          //init state for the player joined
          socket.emit("initState", player);
          //emeit to the room new user joined
          socket.to(roomName).emit("playerJoinedTheRoom", player);
        } else {
          throw new Error("missing params");
        }

        // [x] task - game start emit
        socket.on("startGame", async (data, cb) => {
          if (Rooms.rooms[roomName].host !== userUUID) {
            cb({
              success: false,
              message: "You are not the master of the room",
            });
            return;
          }
          if (Rooms.rooms[roomName].interval) {
            cb({ success: false, message: "the game already started" });
            return;
          }
          Rooms.gameStart(roomName, 1270);
          cb({ success: true, message: "game is sterted" });
        });

        socket.on("goLeft", async () => {
          Rooms.rooms[roomName].players[userUUID].moveLeft();
          socket.emit(
            "moveLeft",
            Rooms.rooms[roomName].players[userUUID].getPlayer()
          );
        });

        socket.on("goDown", async () => {
          let roomData = Rooms.rooms[roomName];
          let player = roomData.players[userUUID].getPlayer();

          // [x] check for game winner and stop the game
          await Rooms.checkForWinner(roomName, userUUID);

          // [x] generate more tetros for the players if one of the players reatch the compilte hes tetros
          if (
            player.generatedTetrosIndexer ===
            roomData.genaratedTetros.length - 2
          ) {
            await Rooms.pushRandoTetros(roomName);
          }

          // [x] add line (n -1) for other users
          const data = await roomData.players[userUUID].moveDown();
          if (data.comlitedLines) {
            await Rooms.pushLineToPlayersBoard(
              data.inRoom,
              data.uuid,
              data.comlitedLines
            );
            roomData.players[userUUID].comlitedLines = 0;
          }

          socket.emit("moveDown", data);
        });

        socket.on("goRight", async () => {
          Rooms.rooms[roomName].players[userUUID].moveRight();
          socket.emit(
            "moveRight",
            Rooms.rooms[roomName].players[userUUID].getPlayer()
          );
        });

        socket.on("rotate", async () => {
          Rooms.rooms[roomName].players[userUUID].rotate();
          socket.emit(
            "moveRotate",
            Rooms.rooms[roomName].players[userUUID].getPlayer()
          );
        });

        socket.on("chat", async (data) => {
          socket.to(roomName).emit("emox", { emoji: data, uuid: userUUID });
        });

        socket.on("forceDisconnect", function () {
          console.log(`forceDisconnect ===> [${userUUID} | ${userName}]`);
          socket.disconnect();
        });

        socket.on("disconnect", async () => {
          console.log(`disconnect user [${userUUID} | ${userName}]`);
          socket.to(roomName).emit("playerLeave", userUUID);
          const newRoomData = await Rooms.playerLeave(roomName, userUUID);
          // [x] task - to check the host update
          socket.to(roomName).emit("hostUpdate", newRoomData.host);
          socket.leave(userUUID);
          socket.leave(roomName);
        });
      } catch (error) {
        console.error(error.message);
        socket.emit("game-error", error.message);
      }
    });
    return io;
  },
};
