import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	inRoom: null,
	gameMaster: false,
	uuid: null
};

export const header = createSlice({
	name: "Header",
	initialState: initialState,
	reducers: {
		initHeaderState: (state, data) => {
			return { ...state, uuid: data.payload.uuid, inRoom: data.payload.inRoom, gameMaster: data.payload.gameMaster };
		},

		updateGameMaster: (state, data) => {
			const newMaster = state.uuid === data.payload;
			return { ...state, gameMaster: newMaster };
		},
	},
});

export const { initHeaderState, updateGameMaster } = header.actions;

export default header.reducer;
