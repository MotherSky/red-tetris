import { createSlice } from "@reduxjs/toolkit";
import {
  defaultState,
  nextRotation,
  possibleMove,
  addBlockToGrid,
  checkRows,
} from "../utils/utils";

const initialState = defaultState();

export const gameSlice = createSlice({
  name: "Game",
  initialState: initialState,
  reducers: {
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (possibleMove(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation };
      }
      return state;
    },

    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (possibleMove(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 };
      }
      return state;
    },

    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (possibleMove(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 };
      }
      return state;
    },

    moveDown: (state) => {
      let { shape, grid, x, y, rotation, nextShape, score, isRunning } = state;
      // Get the next potential Y position
      const maybeY = y + 1;

      // Check if the current block can move here
      if (possibleMove(shape, grid, x, maybeY, rotation)) {
        // If so move down don't place the block
        return { ...state, y: maybeY };
      }
      // If not place the block
      // (this returns an object with a grid and gameover bool)
      const ret = addBlockToGrid(shape, grid, x, y, rotation);
      const newGrid = ret.grid;
      const gameOver = ret.gameOver;

      if (gameOver) {
        // Game Over
        const newState = { ...state };
        newState.shape = 0;
        newState.grid = newGrid;
        return { ...state, gameOver: true };
      }

      // reset somethings to start a new shape/block
      state.shape = nextShape;
      ({ rotation, x, y, nextShape } = defaultState());
      // newState.grid = newGrid;
      // newState.shape = nextShape;
      // newState.score = score;
      // newState.isRunning = isRunning;
      state.grid = newGrid;
      state.rotation = rotation;
      state.x = x;
      state.y = y;
      state.nextShape = nextShape;
      state.score = score + checkRows(newGrid);
      // console.log(newState);
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

export const { moveRight, moveLeft, moveDown, rotate, pause, resume, restart } =
  gameSlice.actions;

export default gameSlice.reducer;
