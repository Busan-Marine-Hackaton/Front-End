function NavBar() {
  return (
    <div className="h-[70px] w-full bottom-0 bg-[#4a688d] fixed flex justify-evenly items-center text-white">
      <button className="w-[70px]">랭킹</button>
      <div className="h-[50px] w-[1px] bg-white"></div>
      <button className="w-[70px]">쓰레기 지도</button>
      <div className="h-[50px] w-[1px] bg-white"></div>
      <button className="w-[70px]">포인트</button>
    </div>
  );
}

export default NavBar;
