import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import html2canvas from "html2canvas";
import useStore from "../../stores/useStore";

function Ranking() {
  const { name, enterpriseId } = useStore(); // zustand에서 name과 enterpriseId 가져옴
  const [userRank, setUserRank] = useState(null); // 내 순위 데이터
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // 상위 15개 랭킹 데이터 가져오기
    const fetchRankings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/enterprise/ranking"
        );
        const result = await response.json();
        if (result.code === 200) {
          const topRankings = result.data.slice(0, 15);
          setRankings(topRankings);
        } else {
          console.error("데이터를 가져오는 중 오류 발생:", result.message);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    // 내 순위 데이터 가져오기
    const fetchUserRank = async () => {
      if (enterpriseId) {
        try {
          const response = await fetch(
            `http://localhost:8080/enterprise/${enterpriseId}/ranking`
          );
          const result = await response.json();
          if (result.code === 200) {
            setUserRank(result.data);
          } else {
            console.error(
              "내 순위 데이터를 가져오는 중 오류 발생:",
              result.message
            );
          }
        } catch (error) {
          console.error("내 순위 데이터를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchRankings();
    fetchUserRank();
  }, [enterpriseId]);

  const handleScreenshot = async () => {
    const element = document.getElementById("ranking-capture");
    const canvas = await html2canvas(element);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "ranking-screenshot.png", {
          type: "image/png",
        });
        shareImage(file);
      }
    });
  };

  const shareImage = (file) => {
    const shareData = {
      title: "나의 랭킹 스크린샷",
      text: "해양쓰레기 수거 활동에 참여하세요!",
      files: [file],
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("공유 성공"))
        .catch((error) => console.error("공유 실패:", error));
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white ">
        월별 랭킹
      </div>
      <div
        id="ranking-capture"
        className="flex flex-col items-center w-full max-w-[600px] bg-white rounded-[10px] mt-[100px] h-[70vh] overflow-y-scroll shadow-lg"
      >
        <h2 className="text-[24px] font-bold mt-5">내 순위</h2>
        {userRank ? (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 w-full bg-[#4a688d] text-white">
            <span className="text-[18px]">{userRank.ranking}위</span>
            <span className="text-[18px]">{name || "부산대학교"}</span>
            <span className="text-[18px]">{userRank.point} pts</span>
          </div>
        ) : (
          <p>내 순위 정보를 불러오는 중...</p>
        )}
        <h2 className="text-[24px] font-bold mt-5">랭킹</h2>
        <ul className="w-full">
          {rankings.map((institution, index) => (
            <li
              key={institution.id || index}
              className={`flex items-center justify-between px-5 py-3 ${
                index >= 10 ? "border-t border-gray-200" : ""
              }`}
            >
              <span className="text-[18px]">{index + 1}위</span>
              <span className="text-[18px]">{institution.name}</span>
              <span className="text-[18px]">{institution.point} pts</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleScreenshot}
        className="p-2 mt-5 text-white bg-[#4a688d] rounded"
      >
        스크린샷 찍고 공유하기
      </button>
      <NavBar />
    </div>
  );
}

export default Ranking;
