import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserPosition({ lat: latitude, lng: longitude });
            if (map) {
              map.setCenter(new window.naver.maps.LatLng(latitude, longitude));
            }
          },
          (error) => {
            console.error("현재 위치를 가져올 수 없습니다:", error);
          }
        );
      } else {
        alert("Geolocation을 지원하지 않는 브라우저입니다.");
      }
    };

    const loadNaverMap = () => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          userPosition.lat,
          userPosition.lng
        ),
        zoom: 13,
        logoControl: false,
        scaleControl: false,
      };

      const naverMap = new window.naver.maps.Map(mapContainer, mapOptions);
      setMap(naverMap);

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          userPosition.lat,
          userPosition.lng
        ),
        map: naverMap,
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">현재 위치</div>',
      });

      window.naver.maps.Event.addListener(marker, "click", function () {
        infoWindow.open(naverMap, marker);
      });

      const circle = new window.naver.maps.Circle({
        map: naverMap,
        center: new window.naver.maps.LatLng(
          userPosition.lat,
          userPosition.lng
        ),
        radius: 500, // 반경 500m
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeWeight: 2,
      });
    };

    // 네이버 지도 API 로드 - 이 부분은 최초 한번만 실행
    if (!window.naver) {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0gn7d1pje1";
      script.onload = loadNaverMap;
      document.head.appendChild(script);
    } else {
      loadNaverMap();
    }

    getCurrentLocation(); // 현재 위치 가져오기
  }, []); // 빈 배열로 설정하여 처음 한번만 실행

  const moveToCurrentLocation = () => {
    if (map && userPosition) {
      const newCenter = new window.naver.maps.LatLng(
        userPosition.lat,
        userPosition.lng
      );
      map.setCenter(newCenter);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <button
        onClick={moveToCurrentLocation}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#4a688d",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        현재 위치로 이동
      </button>
    </div>
  );
};

export default MapComponent;
