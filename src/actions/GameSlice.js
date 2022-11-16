import { createSlice } from "@reduxjs/toolkit";
import {
  defaultState,
  nextRotation,
  possibleMove,
  addBlockToGrid,
  checkRows,
  randomShape,
} from "../utils/utils";

const initialState = defaultState();

export const gameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    rotate: ({ shape, grid, x, y, rotation }) => {
      const newRotation = nextRotation(shape, rotation);
      if (possibleMove(shape, grid, x, y, newRotation)) {
        rotation = newRotation;
      }
    },

    move_right: ({ shape, grid, x, y, rotation }) => {
      if (possibleMove(shape, grid, x + 1, y, rotation)) {
        x = x + 1;
      }
    },

    move_down: ({
      shape,
      grid,
      x,
      y,
      rotation,
      nextShape,
      score,
      isRunning,
      gameOver,
    }) => {
      const maybeY = y + 1;

      // Check if the current block can move here
      if (possibleMove(shape, grid, x, maybeY, rotation)) {
        // If so move down don't place the block
        y = maybeY;
      }

      // If not place the block
      // (this returns an object with a grid and gameover bool)
      const ret = addBlockToGrid(shape, grid, x, y, rotation);
      const newGrid = ret.grid;
      const isGameOver = ret.gameOver;

      if (isGameOver) {
        // Game Over
        //const newState = { ...state };
        shape = 0;
        grid = newGrid;
        gameOver = true;
      }

      // reset some things to start a new shape/block
      const newState = defaultState();
      grid = newGrid;
      shape = nextShape;
      x = newState.x;
      y = newState.y;
      rotation = newState.rotation;
      nextShape = newState.nextShape;

      // Score increases decrease interval
      score = score + checkRows(newGrid);
    },

    resume: ({ isRunning }) => {
      isRunning = true;
    },

    pause: ({ isRunning }) => {
      isRunning = false;
    },

    game_over: ({ gameOver }) => {
      gameOver = true;
    },

    restart: (state) => {
      state = defaultState();
    },
  },
});

export const {
  move_right,
  move_left,
  move_down,
  rotate,
  pause,
  resume,
  restart,
  game_over,
} = gameSlice.actions;
export default gameSlice.reducer;
