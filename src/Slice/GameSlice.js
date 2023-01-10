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
				lines: data.payload.lines,
				playersList: [],
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
				lines: data.payload.lines,
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
				lines: data.payload.lines,
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
				lines: data.payload.lines,
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
				lines: data.payload.lines,
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

	},
});

export const { moveRight, moveLeft, moveDown, rotate, pause, resume, restart, initState } = gameSlice.actions;

export default gameSlice.reducer;
