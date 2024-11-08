import React from "react";
import MapComponent from "./MapComponent";
import NavBar from "../../components/NavBar";

const Map = () => {
  return (
    <div>
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white">
        쓰레기 지도
      </div>
      <MapComponent />
      <NavBar />
    </div>
  );
};

export default Map;
