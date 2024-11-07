import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-[24px] mt-[72px]">환영합니다!</h2>
        <h1 className="text-[36px]">줍장</h1>
      </div>
      <div className="bg-[#4a688d] w-full h-[600px] bottom-0 fixed rounded-t-xl">
        <img className="absolute -top-[240px]" src="/dolphin.png" />
        <div className="mt-[60px] ml-[40px] mr-[40px] text-white flex flex-col justify-center items-center gap-[16px]">
          <div className="text-[36px] ">사용자 인증</div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>이름</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="홍길동"
            ></input>
          </div>
          <div className="flex flex-col text-[24px] gap-[8px] w-[100%]">
            <label>이메일</label>
            <input
              className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"
              placeholder="홍길동@korea.ac.kr"
            ></input>
          </div>
          <div className="flex flex-col text-[24px] gap-[8px]  w-[100%]">
            <label>비밀번호</label>
            <input className="px-[12px] py-[12px] rounded-[30px] text-[16px] text-black"></input>
          </div>

          <button
            className="w-[50%] px-[12px] py-[12px] border-solid rounded-[30px] border-white"
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
