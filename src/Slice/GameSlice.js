import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../utils/utils";

//FIXME -- issue in init state
let initialState = defaultState();

export const gameSlice = createSlice({
	name: "Game",
	initialState: initialState,
	reducers: {
		initState: (state, data) => {
			let newState = {
				...state,
				grid: data.payload.grid.playground,
				shape: data.payload.shape,
				rotation: data.payload.rotation,
				x: data.payload.x,
				y: data.payload.y,
				nextShape: data.payload.nextShape,
				score: data.payload.score,
				speed: 1000,
				isRunning: data.payload.isRunning,
				gameOver: data.payload.gameOver,
				uuid: data.payload.uuid,
				username: data.payload.username,
				playersList: [],
				inRoom: data.payload.inRoom,
				gameMaster: data.payload.gameMaster,
			};
			state = newState;
			return state;
		},

		rotate: (state, data) => {
			const newState = {
				...state,
				grid: data.payload.grid.playground,
				shape: data.payload.shape,
				rotation: data.payload.rotation,
				x: data.payload.x,
				y: data.payload.y,
				nextShape: data.payload.nextShape,
				score: data.payload.score,
				speed: 1000,
				isRunning: data.payload.isRunning,
				gameOver: data.payload.gameOver,
				uuid: data.payload.uuid,
				username: data.payload.username,
			};
			state = newState;
			return state;
		},

		moveRight: (state, data) => {
			const newState = {
				...state,
				grid: data.payload.grid.playground,
				shape: data.payload.shape,
				rotation: data.payload.rotation,
				x: data.payload.x,
				y: data.payload.y,
				nextShape: data.payload.nextShape,
				score: data.payload.score,
				speed: 1000,
				isRunning: data.payload.isRunning,
				gameOver: data.payload.gameOver,
				uuid: data.payload.uuid,
				username: data.payload.username,
			};
			state = newState;
			return state;
		},

		moveLeft: (state, data) => {
			const newState = {
				...state,
				grid: data.payload.grid.playground,
				shape: data.payload.shape,
				rotation: data.payload.rotation,
				x: data.payload.x,
				y: data.payload.y,
				nextShape: data.payload.nextShape,
				score: data.payload.score,
				speed: 1000,
				isRunning: data.payload.isRunning,
				gameOver: data.payload.gameOver,
				uuid: data.payload.uuid,
				username: data.payload.username,
			};
			state = newState;
			return state;
		},

		moveDown: (state, data) => {
			const newState = {
				...state,
				grid: data.payload.grid.playground,
				shape: data.payload.shape,
				rotation: data.payload.rotation,
				x: data.payload.x,
				y: data.payload.y,
				nextShape: data.payload.nextShape,
				score: data.payload.score,
				speed: 1000,
				isRunning: data.payload.isRunning,
				gameOver: data.payload.gameOver,
				uuid: data.payload.uuid,
				username: data.payload.username,
			};
			state = newState;
			return state;
		},

		resume: (state) => {
			return { ...state, isRunning: true };
		},

		pause: (state) => {
			return { ...state, isRunning: false };
		},

		restart: () => {
			return defaultState();
		},

		playerJoinedTheRoom: (state, data) => {
			const players = [...state.playersList];
			const newPlayer = data.payload;
			players.push(newPlayer);
			return { ...state, playersList: players };
		},

		onCollision: (state, data) => {
			const array = [...state.playersList];
			let index = array.findIndex((e) => e.uuid === data.payload.uuid);
			if (index >= 0) {
				array[index] = data.payload;
			}

			return { ...state, playersList: array };
		},

		updateGameMaster: (state, data) => {
			const newMaster = state.uuid === data.payload;

			console.log(state.uuid, data.payload, newMaster);
			return { ...state, gameMaster: newMaster };
		},
	},
});

export const { moveRight, moveLeft, moveDown, rotate, pause, resume, restart, initState, onCollision, playerJoinedTheRoom, updateGameMaster } = gameSlice.actions;

export default gameSlice.reducer;
