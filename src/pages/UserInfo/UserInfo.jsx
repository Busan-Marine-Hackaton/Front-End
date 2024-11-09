import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import useStore from "../../stores/useStore";

function UserInfo() {
  const { name, enterpriseId, setName, setEnterpriseId } = useStore();
  const [userInfo, setUserInfo] = useState({ ranking: null, point: null });

  useEffect(() => {
    const fetchUserRanking = async () => {
      if (enterpriseId) {
        try {
          const response = await fetch(
            `http://localhost:8080/enterprise/${enterpriseId}/ranking`
          );
          const result = await response.json();
          if (result.code === 200) {
            setUserInfo(result.data);
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchUserRanking();
  }, [enterpriseId]);

  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white">
        내 정보
      </div>

      <div className="flex flex-col items-center w-full max-w-[600px] bg-white rounded-[10px] mt-[100px] p-5 shadow-lg">
        <h2 className="text-[24px] font-bold mb-4">
          소속: {name || "부산대학교"}
        </h2>
        {userInfo.ranking !== null && userInfo.point !== null ? (
          <>
            <p className="text-[18px]">내 소속 랭킹: {userInfo.ranking}위</p>
            <p className="text-[18px]">포인트: {userInfo.point} pts</p>
          </>
        ) : (
          <p className="text-[18px]">정보를 불러오는 중...</p>
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default UserInfo;
