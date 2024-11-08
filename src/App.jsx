import { Route, Routes } from "react-router-dom";
import "./reset.css";
import Main from "./pages/Main";
import Map from "./pages/Map";
import Upload from "./pages/Upload";
import Point from "./pages/Point";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<Map />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/point" element={<Point />} />
    </Routes>
  );
}

export default App;
