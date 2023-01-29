import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../Slice/HeaderSlice";
import gameReducer from "../Slice/GameSlice";
import spectatorsReducer from "../Slice/SpectatorsSlice";

const store = configureStore({
  reducer: {
    header: headerReducer,
    game: gameReducer,
    spectators: spectatorsReducer,
  },
});

export default store;
