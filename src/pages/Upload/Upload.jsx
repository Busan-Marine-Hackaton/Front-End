import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white">
        쓰레기 사진 업로드
      </div>
      <div className="fixed bottom-[70px] flex flex-col items-center">
        <img src="/image.png" className="mb-[60px] w-[270px] h-[300px]" />
        <button className="bg-[#88ccf1] mb-[40px] px-[0px] py-[100px] rounded-[100%] text-[20px] text-white">
          사진 추가
        </button>
        <button
          className="bg-[#88ccf1] mb-[40px] px-[100px] py-[16px] rounded-[30px] text-[20px] text-white"
          onClick={() => navigate("/map")}
        >
          제출
        </button>
      </div>
      <NavBar />
    </div>
  );
}

export default Upload;
