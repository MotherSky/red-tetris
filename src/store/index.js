import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../Slice/Header";
import gameReducer from "../Slice/GameSlice";
import spectatorsReducer from '../Slice/Spectators'

const store = configureStore({
	reducer: {
		header: headerReducer,
		game: gameReducer,
        spectators: spectatorsReducer
	},
});

export default store;
