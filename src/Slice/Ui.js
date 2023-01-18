import { createSlice } from "@reduxjs/toolkit";
import gameSound from "./tetris.mp3";
const audio = new Audio(gameSound);
audio.loop = true;

let initialState = {
  errorMsg: null,
  mute: false,
};

export const Uislice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    initError: (state) => {
      return { ...state, errorMsg: null };
    },
    onError: (state, data) => {
      return { ...state, errorMsg: data.payload };
    },
    audioPlay: (state) => {
      audio.play();
      return { ...state, mute: false };
    },
    audioStop: (state) => {
      audio.pause();
      return { ...state, mute: true };
    },
  },
});

export const { initError, onError, audioPlay, audioStop } = Uislice.actions;

export default Uislice.reducer;
