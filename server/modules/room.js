/**
 * room interface
 *
 * name             // room name
 * host             // master of the room
 * players[]        // list of players in the room [player interface]
 * gameStart        // game started or not [boolean]
 * locked           // room has password [boolean]
 * password			// room password if it's locked
 * genaratedTetros  // array of tetis to play with
 * interval         // game interval
 */

const RandomTetros = require("../utils/generateTetros");
const { checkPlayersExist } = require("../utils/playerTools");
const { Player } = require("./player");

const Rooms = class {
	constructor() {
		this.rooms = {};
	}

	createRoom = async (roomName, userUUID, userName, io, locked) => {
		try {
			this.rooms[roomName] = {
				host: userUUID,
				players: {},
				interval: null,
				locked,
				genaratedTetros: RandomTetros(8),
				socket: io,
			};
			this.rooms[roomName].players[userUUID] = new Player(userUUID, userName, roomName, io, this.rooms[roomName].genaratedTetros);
		} catch (error) {
			console.log("createRoom catch error", error);
		}
	};

	joinRoom = async (roomName, userUUID, userName, io, locked = false) => {
		try {
			if (!this.rooms[roomName]) {
				this.createRoom(roomName, userUUID, userName, io, locked);
			} else {
				if (locked) {
					//TODO -- check locked rooms to ask for password
				}
				//check room nb players
				if (Object.keys(this.rooms[roomName].players).length === 4) {
					throw new Error("This room is full");
				}
				//check player duplication
				if (checkPlayersExist(this.rooms[roomName].players, userName)) {
					throw new Error("There is a player with the same user name in the room");
				}
				this.rooms[roomName].players[userUUID] = new Player(userUUID, userName, roomName, io, this.rooms[roomName].genaratedTetros);
			}
		} catch (err) {
			throw err;
		}
	};

	playerLeave = async (roomName, userUUID) => {
		try {
			const room = this.rooms[roomName];
			if (room && room?.players !== {}) {
				// remove player from players list
				delete room.players[userUUID];

				// remove from the host if the current player is the host
				if (room.host === userUUID) {
					room.host = null;
				}

				//destroy the room if the current player is the last player in the room
				if (!Object.keys(room.players).length) {
					room.interval = null;
					this.destroyRoom(roomName);
				} else {
					room.host = Object.keys(room.players)[0];
				}
			}
			return room
		} catch (err) {
			throw err;
		}
	};

	getRoom(name) {
		return this.rooms[name];
	}

	destroyRoom(name) {
		delete this.rooms[name];
	}

	gameStart(name, speed) {
		console.log(Object.keys(this.rooms[name].players));
		//TODO -- check if the host is the emitter
		this.rooms[name].interval = setInterval(() => {
			let players = [];
			for (const [key, value] of Object.entries(this.rooms[name].players)) {
				value.moveDown();
				const playerState = value.getPlayer();
				players.push(playerState);
				//generate more tetros for the players if one of the players reatch the compilte hes tetros
				if (value.generatedTetrosIndexer === this.rooms[name].genaratedTetros.length - 2) {
					this.pushRandoTetros(name);
				}
				this.rooms[name].socket.to(key).emit("moveDown", playerState);
			}
		}, speed);
	}

	pushRandoTetros(roomName) {
		this.rooms[roomName].genaratedTetros = [...this.rooms[roomName].genaratedTetros, ...RandomTetros(8)];
		for (const [key, value] of Object.entries(this.rooms[roomName].players)) {
			value.updateGeneratedTetros(this.rooms[roomName].genaratedTetros);
		}
	}

	isRoomMaster = (uuid, roomName) => {
		return this.rooms[roomName].host === uuid
	};
};

module.exports = new Rooms();
