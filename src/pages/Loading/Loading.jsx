import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/reward"); // Reward 페이지의 경로에 맞게 수정
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <ClipLoader color="#4a688d" size={60} />
        <p className="mt-4 text-lg text-black">QR 인식중</p>
      </div>
    </div>
  );
}

export default Loading;
