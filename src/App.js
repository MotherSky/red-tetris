import { Route, Routes } from "react-router-dom";
import MainRoute from "./Router/MainRoute";
import { Provider } from "react-redux";
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
