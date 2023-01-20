import { createSlice } from "@reduxjs/toolkit";
import gameSound from "./tetris.mp3";
const audio = new Audio(gameSound);
audio.loop = true;

let initialState = {
  errorMsg: null,
  mute: false,
  userData: undefined,
};

export const Uislice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setUserData(state, data) {
      return { ...state, userData: data.payload };
    },
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

export const { initError, onError, audioPlay, audioStop, setUserData } =
  Uislice.actions;

export default Uislice.reducer;
