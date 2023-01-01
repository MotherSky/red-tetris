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

					const roomData = Rooms.rooms[roomName];
					const player = roomData.players[userUUID].getPlayer();
					// [x] task - send data as soon as the player join the room to init the state in the front-end
					player.gameMaster = Rooms.rooms[roomName].host === userUUID;
					socket.emit("initState", player);
					socket.to(roomName).emit("playerJoinedTheRoom", player);
				} else {
					throw new Error("missing params");
				}

				//[ ] task - game start emit
				socket.on("startGame", async (data, cb) => {
					const roomMaster = Rooms.rooms[roomName].players[userUUID].isRoomMaster();

					console.log({ roomMaster });
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
					const newRoomData = await Rooms.playerLeave(roomName, userUUID);
					// [ ] task - to check the host update
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
