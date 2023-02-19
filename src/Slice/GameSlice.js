import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../utils/utils";
import gameSound from "./tetris.mp3";
const audio = new Audio(gameSound);
audio.loop = true;

//FIXME -- issue in init state
let initialState = defaultState();
// eslint-disable-next-line react-hooks/rules-of-hooks

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
        gameOver: data.payload.gameOver,
        uuid: data.payload.uuid,
        username: data.payload.username,
        lines: data.payload.lines,
        winner: undefined,
        emoji: undefined,
        gameStart: false,
        mute: false,
      };
      state = newState;
      return state;
    },

    update: (state, data) => {
      const newState = {
        ...state,
        grid: data.payload.grid.playground,
        shape: data.payload.shape,
        rotation: data.payload.rotation,
        x: data.payload.x,
        y: data.payload.y,
        nextShape: data.payload.nextShape,
        score: data.payload.score,
        gameOver: data.payload.gameOver,
        uuid: data.payload.uuid,
        username: data.payload.username,
        lines: data.payload.lines,
      };
      state = newState;

      if (data.payload.gameOver || data.payload.winner) {
        audio.pause();
      }
      return state;
    },

    restart: () => {
      return defaultState();
    },

    gameWinner: (state, data) => {
      return { ...state, winner: data.payload };
    },

    gameStarted: (state) => {
      return { ...state, gameStart: true };
    },

    audioPlay: (state) => {
      // eslint-disable-next-line no-unused-vars
      var playPromise = audio.play();
      // console.log(playPromise);
      return { ...state, mute: false };
    },

    audioStop: (state) => {
      audio.pause();
      return { ...state, mute: true };
    },
  },
});

export const {
  initState,
  update,
  gameWinner,
  gameStarted,
  audioPlay,
  audioStop,
  restart,
} = gameSlice.actions;

export default gameSlice.reducer;
