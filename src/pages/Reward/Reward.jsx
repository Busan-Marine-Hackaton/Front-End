import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore"; // Zustand 스토어에서 데이터 가져오기

function Reward() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // 포인트 획득 메시지
  const enterpriseId = useStore((state) => state.enterpriseId); // 스토어에서 enterpriseId 가져오기

  useEffect(() => {
    const addPoints = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/enterprise/${enterpriseId}/addPoints?points=5`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (response.ok && result.code === 200) {
          setMessage("5 포인트 획득");
        } else {
          setMessage("포인트 획득에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("서버 오류가 발생했습니다.");
      }
    };

    if (enterpriseId) {
      addPoints();
    } else {
      setMessage("기업 ID가 없습니다.");
    }
  }, [enterpriseId]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 상단 바 */}
      <div className="flex items-center justify-center h-16 text-xl font-bold text-white bg-[#4a688d]">
        보상획득
      </div>

      {/* 중앙 포인트 획득 메시지 */}
      <div className="flex items-center justify-center flex-grow text-2xl text-[#4a688d]">
        {message}
      </div>

      {/* 네비게이션 위 버튼들 */}
      <div className="w-full flex justify-center mb-4 space-x-4 fixed bottom-[100px]">
        <button
          onClick={() => navigate("/ranking")}
          className="px-4 py-2 text-white bg-[#4a688d] rounded-lg hover:bg-blue-800"
        >
          순위 보러 가기
        </button>
        <button
          onClick={() => navigate("/map")}
          className="px-4 py-2 text-white bg-[#4a688d] rounded-lg hover:bg-blue-800"
        >
          맵으로 가기
        </button>
      </div>

      {/* 네비게이션 바 */}
      <NavBar />
    </div>
  );
}

export default Reward;
