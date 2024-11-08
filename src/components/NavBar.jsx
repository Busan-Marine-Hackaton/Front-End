import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="h-[70px] w-full bottom-0 bg-[#4a688d] fixed flex justify-evenly items-center text-white">
      <button className="w-[70px]" onClick={() => navigate("/ranking")}>
        랭킹
      </button>
      <div className="h-[50px] w-[1px] bg-white"></div>
      <button className="w-[70px]" onClick={() => navigate("/map")}>
        쓰레기 지도
      </button>
      <div className="h-[50px] w-[1px] bg-white"></div>
      <button className="w-[70px]" onClick={() => navigate("/point")}>
        포인트
      </button>
    </div>
  );
}

export default NavBar;
