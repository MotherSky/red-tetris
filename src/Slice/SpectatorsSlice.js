import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  playersList: [],
};

export const Spectators = createSlice({
  name: "Spectators",
  initialState: initialState,
  reducers: {
    getSpectatorsList: (state, data) => {
      const players = [...state.playersList];
      for (let i = 0; i < data?.payload.length; i++) {
        const element = data.payload[i];
        players.push(element);
      }
      return { ...state, playersList: players };
    },
    cleanBoards: (state, data) => {
      state.playersList = [];
      for (let i = 0; i < data?.payload.length; i++) {
        const element = data.payload[i];
        state.playersList.push(element);
      }
    },
    pushSpectators: (state, data) => {
      const players = [...state.playersList];
      const newPlayer = data.payload;
      players.push(newPlayer);
      return { ...state, playersList: players };
    },
    deletePlayer: (state, data) => {
      const array = [...state.playersList];
      let index = array.findIndex((e) => e.uuid === data.payload);
      if (index >= 0) {
        array.splice(index, 1);
      }
      return { ...state, playersList: array };
    },
    onCollision: (state, data) => {
      const array = [...state.playersList];
      //console.log(array);
      let index = array.findIndex((e) => e.uuid === data.payload.uuid);
      if (index >= 0) {
        array[index] = data.payload;
        array[index].shape =
          data.payload.generatedTetros[data.payload.generatedTetrosIndexer - 1];
      }

      return { ...state, playersList: array };
    },
    showEmoji: (state, data) => {
      const array = [...state.playersList];
      let index = array.findIndex((e) => e.uuid === data.payload.uuid);
      if (index >= 0) {
        array[index].emoji = data.payload.emoji;
      }
      // console.log("showEmoji specslice: ", data.payload.emoji);
    },
    hideEmoji: (state, data) => {
      const array = [...state.playersList];
      let index = array.findIndex((e) => e.uuid === data.payload);
      if (index >= 0) {
        array[index].emoji = undefined;
      }
      // console.log("hideEmoji specslice: ");
    },
  },
});

export const {
  pushSpectators,
  onCollision,
  getSpectatorsList,
  cleanBoards,
  deletePlayer,
  showEmoji,
  hideEmoji,
} = Spectators.actions;

export default Spectators.reducer;
