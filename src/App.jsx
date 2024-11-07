import { Route, Routes } from "react-router-dom";
import "./reset.css";
import Main from "./pages/Main";
import Map from "./pages/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
}

export default App;
