import { Route, Routes } from "react-router-dom";
import "./reset.css";
import Main from "./pages/Main";
import Map from "./pages/Map";
import Upload from "./pages/Upload";
import Ranking from "./pages/Ranking";
import Loading from "./pages/Loading";
import Qr from "./pages/Qr";
import Reward from "./pages/Reward/Reward";
import UserInfo from "./pages/UserInfo";
import Join from "./pages/Join";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<Map />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/qr" element={<Qr />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/reward" element={<Reward />} />
      <Route path="/userInfo" element={<UserInfo />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}

export default App;
