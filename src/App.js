import { Route, Routes } from "react-router-dom";
import MainRoute from "./components/Pages/MainRoute";

function App() {
  return (
    <Routes>
      <Route path="*" element={<MainRoute />} />
    </Routes>
  );
}

export default App;
