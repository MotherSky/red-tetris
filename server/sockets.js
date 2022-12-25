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

				// FIXME - the duplicate username in the same room
				if (userUUID && roomName && userName) {
					console.info("connect user", { userUUID, roomName, userName, socket_id: socket.id });
					await Rooms.joinRoom(roomName, userUUID, userName, io);

					//join rooms (uuid and gameRoom)
					socket.join(userUUID);
					socket.join(roomName);
				} else {
					throw new Error("missing params");
				}

				socket.on("joinRoom", async (data, cb) => {
					let roomData = Rooms.rooms[roomName];
					let player = roomData.players[userUUID].getPlayer();
					cb(player);
				});

				//TODO game start emit
				socket.on("startGame", async (data, cb) => {
					Rooms.rooms[roomName].players[userUUID].isRoomMaster();

					// if (!Rooms.rooms[roomName].interval)
					// 	Rooms.gameStart(roomName, 1000)
				});

				socket.on("goLeft", async () => {
					Rooms.rooms[roomName].players[userUUID].moveLeft();
					socket.emit("moveLeft", Rooms.rooms[roomName].players[userUUID].getPlayer());
				});

				socket.on("goDown", async () => {
					let roomData = Rooms.rooms[roomName];
					let player = roomData.players[userUUID].getPlayer();
					//generate more tetros for the players if one of the players reatch the compilte hes tetros
					if (player.generatedTetrosIndexer === roomData.genaratedTetros.length - 2) {
						Rooms.pushRandoTetros(roomName);
					}
					roomData.players[userUUID].moveDown();
				});

				socket.on("goRight", async () => {
					Rooms.rooms[roomName].players[userUUID].moveRight();
					socket.emit("moveRight", Rooms.rooms[roomName].players[userUUID].getPlayer());
				});

				socket.on("rotate", async () => {
					Rooms.rooms[roomName].players[userUUID].rotate();
					socket.emit("moveRotate", Rooms.rooms[roomName].players[userUUID].getPlayer());
				});

				socket.on("disconnect", async () => {
					console.log(`disconnect user [${userUUID} | ${userName}]`);
					await Rooms.playerLeave(roomName, userUUID);
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
