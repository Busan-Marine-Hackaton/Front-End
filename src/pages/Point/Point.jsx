import NavBar from "../../components/NavBar";

function Point() {
  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white ">
        포인트
      </div>
      <div className="mt-[200px]">문희상님 포인트입니다.</div>
      <div className="mt-[20px] text-[32px]">1200 pts</div>
      <div className="px-[20px] bg-white w-full flex justify-center items-center mt-[20px]">
        <img src="/barcode.png" className=" w-[320px]" />
      </div>
      <NavBar />
    </div>
  );
}

export default Point;
