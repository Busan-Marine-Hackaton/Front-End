import React from "react";
import MapComponent from "./MapComponent";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white">
        쓰레기 지도
      </div>
      <MapComponent />
      <div className="bottom-[90px] fixed flex w-full justify-center items-center">
        <button
          onClick={() => navigate("/upload")}
          className="bg-[#4a688d] text-center px-[20px] py-[10px] rounded-lg text-white"
        >
          제보하러 가기
        </button>
      </div>
      <NavBar />
    </div>
  );
};

export default Map;
