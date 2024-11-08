import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

function Ranking() {
  const [userRank, setUserRank] = useState({ rank: 10, points: 1400 }); // 예시 데이터
  const [rankings, setRankings] = useState([]);
  const [imageData, setImageData] = useState(null); // 이미지 데이터를 저장할 상태

  // 실제 사람 이름 목록
  const names = [
    "홍길동",
    "김철수",
    "이영희",
    "박지민",
    "최민수",
    "이수진",
    "정재훈",
    "김하늘",
    "조민준",
    "이서현",
    "김지연",
    "이재원",
    "박상훈",
    "정우성",
    "최강희",
    "한지민",
    "김남길",
    "송중기",
    "이효리",
    "윤아",
  ];

  useEffect(() => {
    const generateRankings = () => {
      const ranks = [];
      for (let i = 1; i <= 50; i++) {
        const randomIndex = Math.floor(Math.random() * names.length); // 이름 배열에서 랜덤 인덱스 선택
        ranks.push({
          rank: i,
          name: names[randomIndex],
          points: 1500 - i * 10,
        });
      }
      setRankings(ranks);
    };
    generateRankings();
  }, []);

  const handleScreenshot = () => {
    const element = document.getElementById("ranking-capture");
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      setImageData(image); // 캡처한 이미지를 상태에 저장
      downloadImage(image); // 이미지 다운로드
    });
  };

  const downloadImage = (imageData) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "ranking-screenshot.png"; // 다운로드할 파일 이름
    link.click();
  };

  const shareImage = () => {
    if (!imageData) {
      alert("먼저 스크린샷을 찍어주세요."); // 이미지 데이터가 없을 때 경고
      return;
    }

    const shareData = {
      title: "나의 랭킹 스크린샷",
      text: "해양쓰레기 수거 활동에 참여하세요!",
      url: imageData,
    };

    navigator
      .share(shareData)
      .then(() => {
        console.log("공유 성공");
      })
      .catch((error) => {
        console.error("공유 실패:", error);
      });
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
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 w-full bg-[#4a688d] text-white">
          <span className="text-[18px]">{userRank.rank}위</span>
          <span className="text-[18px]">{userRank.points} pts</span>
        </div>
        <h2 className="text-[24px] font-bold mt-5">랭킹</h2>
        <ul className="w-full">
          {rankings.map((user) => (
            <li
              key={user.rank}
              className="flex items-center justify-between px-5 py-3 border-b border-gray-200"
            >
              <span className="text-[18px]">{user.rank}위</span>
              <span className="text-[18px]">{user.name}</span>
              <span className="text-[18px]">{user.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleScreenshot}
        className="p-2 mt-5 text-white bg-[#4a688d] rounded"
      >
        스크린샷 찍기
      </button>
      <NavBar />
    </div>
  );
}

export default Ranking;
