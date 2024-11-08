import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [showAffiliationInput, setShowAffiliationInput] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-[32px] mt-[72px]">환영합니다!</h2>
        <h1 className="text-[60px] z-[20]">줍장</h1>
      </div>
      <div className="bg-[#4a688d] w-full h-[680px] bottom-0 fixed rounded-t-xl flex justify-center">
        <img
          className="absolute -top-[150px] h-[300px] w-[400px] z-10"
          src="/dolphin.png"
        />
        <div className="mt-[60px] ml-[40px] mr-[40px] text-white flex flex-col justify-center items-center gap-[16px] w-full">
          <div className="text-[36px]">사용자 인증</div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <div className="flex items-center gap-[8px]">
              <label>소속</label>
              <button
                onClick={() => setShowAffiliationInput(!showAffiliationInput)}
                className={`w-[40px] h-[24px] rounded-full ${
                  showAffiliationInput ? "bg-green-500" : "bg-gray-300"
                } flex items-center px-[4px] transition-colors`}
              >
                <div
                  className={`w-[16px] h-[16px] bg-white rounded-full transform ${
                    showAffiliationInput ? "translate-x-[16px]" : ""
                  } transition-transform`}
                ></div>
              </button>
            </div>
            {showAffiliationInput && (
              <input
                className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
                placeholder="부산시청"
              ></input>
            )}
          </div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>이름</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="홍길동"
            ></input>
          </div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>아이디</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="busan"
            ></input>
          </div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>비밀번호</label>
            <input
              placeholder="password"
              type="password"
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
            ></input>
          </div>

          <button
            className="w-[50%] px-[12px] py-[12px] border-2 border-white rounded-[30px]"
            onClick={() => navigate("/map")}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
