import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  errorMsg: null
}

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
  },
});

export const {
  initError,
  onError
} = Uislice.actions;

export default Uislice.reducer;
