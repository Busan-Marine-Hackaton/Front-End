import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

function Qr() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/loading"); // 로딩 페이지의 경로로 변경
    }, 1000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리
  }, [navigate]);

  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white ">
        QR 인증
      </div>
      <div className="mt-[200px]">부산대학교</div>
      <div className="mt-[20px] text-[32px]">QR코드</div>
      <div className="px-[20px] bg-white w-full flex justify-center items-center mt-[20px]">
        <img src="/qr.webp" className=" w-[320px]" />
      </div>
      <NavBar />
    </div>
  );
}

export default Qr;
