import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";

function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [realId, setRealId] = useState("");
  const [password, setPassword] = useState("");

  const setStoreName = useStore((state) => state.setName);
  const setStoreRealId = useStore((state) => state.setRealId);
  const setEnterpriseId = useStore((state) => state.setEnterpriseId);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/enterprise?name=${encodeURIComponent(
          name
        )}&realId=${encodeURIComponent(realId)}&password=${encodeURIComponent(
          password
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.code === 200) {
        setStoreName(name); // 이름 저장
        setStoreRealId(realId); // 기업 아이디 저장
        setEnterpriseId(result.data); // 응답의 기업 아이디 저장
        console.log(name);
        console.log(realId);
        console.log(result.data);
        navigate("/");
      } else {
        console.log(name, realId, password);
        alert("가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

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
          <div className="text-[36px]">가입하기</div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>기업명</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="기업명"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>아이디</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="아이디"
              value={realId}
              onChange={(e) => setRealId(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>비밀번호</label>
            <input
              placeholder="비밀번호"
              type="password"
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-[50%] px-[12px] py-[12px] border-2 border-white rounded-[30px]"
            onClick={handleSubmit}
          >
            가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
