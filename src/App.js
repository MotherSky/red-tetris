import { Route, Routes } from "react-router-dom";
import MainRoute from "./Router/MainRoute";
// import { configureStore } from "@reduxjs/toolkit";
// import gameReducer from "./Slice/GameSlice";
import { Provider } from "react-redux";

// const playerStore = configureStore({ reducer: gameReducer });

import store from "./store";

function App() {
	return (
		<Routes>
			<Route
				path="*"
				element={
					<Provider store={store}>
						<MainRoute />
					</Provider>
				}
			/>
		</Routes>
	);
}

export default App;
