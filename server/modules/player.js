/**
 * player interface
 *
 * name                 // player name
 * uuid                 // player id [join to sockets]
 * socket				// call by address to user sockets
 * score                // score of the player
 * lines                // lines he complited
 * tetrArrayIndexer     // index of the tetris reatch from the random generated array
 * shape  				// current index of shape
 * nextShape			// next index of shape
 * grid                 // grid [grid interface]
 * inRoom               // current room name the player in
 * gameOver				// player lost
 * winner				// winner of the game	
 */

const { Grid } = require("./grid");
const { shapes } = require("../utils/shapes");

const Player = class {
	constructor(user_uuid, username, inRoom, socket, generatedTetros) {
		this.uuid = user_uuid;
		this.socket = socket;
		this.username = username;
		this.inRoom = inRoom;
		this.grid = new Grid(20, 10);
		this.score = 0;
		this.comlitedLines = 0
		this.lines = 0;
		this.rotation = 0;
		this.x = 4;
		this.y = -4;
		this.gameOver = false;
		this.winner = false;
		this.generatedTetros = generatedTetros;
		this.generatedTetrosIndexer = 0;
		this.shape = this.generatedTetros[this.generatedTetrosIndexer];
		this.nextShape = this.generatedTetros[this.generatedTetrosIndexer + 1];
	}

	getPlayer = () => {
		return {
			uuid: this.uuid,
			username: this.username,
			inRoom: this.inRoom,
			grid: this.grid,
			score: this.score,
			lines: this.lines,
			shape: this.shape,
			nextShape: this.nextShape,
			rotation: this.rotation,
			x: this.x,
			y: this.y,
			gameOver: this.gameOver,
			generatedTetros: this.generatedTetros,
			generatedTetrosIndexer: this.generatedTetrosIndexer,
			comlitedLines: this.comlitedLines,
			winner: this.winner
		};
	};

	updateGeneratedTetros(array) {
		this.generatedTetros = array;
	}

	possibleMove = (shape, grid, x, y, rotation) => {
		const currentShape = shapes[shape][rotation];
		// console.log(currentShape);
		for (let row = 0; row < currentShape.length; row++) {
			for (let col = 0; col < currentShape[row].length; col++) {
				if (currentShape[row][col] !== 0) {
					const proposedX = col + x;
					const proposedY = row + y;
					if ((proposedY < 0) & (x === 4)) {
						continue;
					}
					const possibleRow = grid[proposedY];
					if (possibleRow) {
						if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
							return false;
						}
					} else {
						return false;
					}
				}
			}
		}
		return true;
	};

	addBlockToGrid = (shape, grid, x, y, rotation) => {
		// At this point the game is not over
		let blockOffGrid = false;
		const block = shapes[shape][rotation];
		const newGrid = [...grid];
		for (let row = 0; row < block.length; row++) {
			for (let col = 0; col < block[row].length; col++) {
				if (block[row][col]) {
					const yIndex = row + y;
					// If the yIndex is less than 0 part of the block
					// is off the top of the screen and the game is over
					if (yIndex < 0) {
						blockOffGrid = true;
					} else {
						newGrid[row + y][col + x] = shape;
					}
				}
			}
		}
		// Return both the newGrid and the gameOver bool
		return { grid: newGrid, gameOver: blockOffGrid };
	};

	// Checks for completed rows and scores points
	checkRows = (grid) => {
		// Points increase for each row completed
		// i.e. 40 points for completing one row, 100 points for two rows
		const points = [0, 40, 100, 300, 1200];
		let completedRows = 0;
		for (let row = 0; row < grid.length; row++) {
			// No empty cells means it can't find a 0, so the row must be complete!
			if (grid[row].indexOf(0) === -1 && grid[row].indexOf(8) === -1) {
				completedRows += 1;
				// Remove the row and add a new empty one at the top
				grid.splice(row, 1);
				grid.unshift(Array(10).fill(0));
			}
		}

		return { score: points[completedRows], completedRows };
	};

	nextRotation = (shape, rotation) => {
		return (rotation + 1) % shapes[shape].length;
	};

	rotate = () => {
		const newRotation = this.nextRotation(this.shape, this.rotation);
		if (this.possibleMove(this.shape, this.grid.playground, this.x, this.y, newRotation)) {
			this.rotation = newRotation;
		}
	};

	moveRight = () => {
		if (this.possibleMove(this.shape, this.grid.playground, this.x + 1, this.y, this.rotation)) {
			this.x += 1;
		}
	};

	moveLeft = () => {
		if (this.possibleMove(this.shape, this.grid.playground, this.x - 1, this.y, this.rotation)) {
			this.x -= 1;
		}
	};

	moveDown = () => {
		// Get the next potential Y position
		const maybeY = this.y + 1;

		// Check if the current block can move here
		if (this.possibleMove(this.shape, this.grid.playground, this.x, maybeY, this.rotation)) {
			// If so move down don't place the block
			this.y = maybeY;
			return this.getPlayer();
		}
		// If not place the block
		// (this returns an object with a grid and gameover bool)
		const ret = this.addBlockToGrid(this.shape, this.grid.playground, this.x, this.y, this.rotation);
		const newGrid = ret.grid;
		const gameOver = ret.gameOver;

		if (gameOver) {
			// Game Over
			this.shape = 0;
			this.grid.playground = newGrid;
			this.gameOver = true;
			const player = this.getPlayer();
			this.socket.to(this.inRoom).emit("playerTetroCollision", player);
			return player;
		}
		// reset somethings to start a new shape/block
		this.generatedTetrosIndexer += 1;
		this.shape = this.generatedTetros[this.generatedTetrosIndexer];
		this.nextShape = this.generatedTetros[this.generatedTetrosIndexer + 1];
		this.grid.playground = newGrid;
		const chechRow = this.checkRows(newGrid)
		this.comlitedLines = chechRow.completedRows
		this.lines += chechRow.completedRows
		this.score = this.score + chechRow.score;
		this.socket.to(this.inRoom).emit("playerTetroCollision", this.getPlayer());
		this.rotation = 0;
		this.x = 4;
		this.y = -4;
		
		return this.getPlayer();
	};

	pushLines(numberOfLines) {
		for (let i = 0; i < numberOfLines; i++) {
			const emptyLine = this.grid.playground[0].every((val) => val === 0);
			if (emptyLine) {
				this.grid.playground.shift();
				// [x] - add random line for the solid part (for more chnages)
				this.grid.playground.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
			}
		}
	}

	setWinner() {
		this.winner = true
		const player = this.getPlayer()
		return player
	}
};

exports.Player = Player;
