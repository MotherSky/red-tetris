import GamePage from "./components/Pages/GamePage";
import HomePage from "./components/Pages/HomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
