import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // 파일을 서버로 업로드하거나 다른 처리를 추가할 수 있습니다.
      console.log("File ready for upload:", selectedFile);
      navigate("/map");
    } else {
      alert("파일을 먼저 선택해주세요.");
    }
  };

  // 모바일 기기 감지
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <div className="bg-[#4a688d] fixed top-0 w-full h-[70px] z-10 flex justify-center items-center text-[36px] text-white">
        쓰레기 사진 업로드
      </div>
      <div className="fixed bottom-[70px] flex flex-col items-center">
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="mb-[60px] w-[270px] h-[300px] object-cover"
          />
        ) : (
          <img
            src="/image.png"
            className="mb-[60px] w-[270px] h-[300px]"
            alt="Preview"
          />
        )}
        <input
          type="file"
          accept="image/*"
          capture={isMobile ? "environment" : undefined}
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-[#88ccf1] mb-[40px] px-[70px] py-[70px] rounded-[100%] text-[20px] text-white flex justify-center items-center cursor-pointer"
        >
          사진 추가
        </label>
        <button
          className="bg-[#88ccf1] mb-[40px] px-[100px] py-[16px] rounded-[30px] text-[20px] text-white"
          onClick={handleSubmit}
        >
          제출
        </button>
      </div>
      <NavBar />
    </div>
  );
}

export default Upload;
