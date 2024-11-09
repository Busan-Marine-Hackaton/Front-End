import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [userCoords, setUserCoords] = useState(null); // 현재 위치를 저장할 상태
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState([]);
  let currentInfoWindow = null;

  useEffect(() => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
      }
    );

    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:8080/location");
        const result = await response.json();
        setLocations(result.data);
      } catch (error) {
        console.error("위치 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchLocations();
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const loadNaverMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.naver.maps.LatLng(userCoords.lat, userCoords.lng),
      zoom: 10,
      logoControl: false,
      scaleControl: false,
    };

    const naverMap = new window.naver.maps.Map(mapContainer, mapOptions);
    setMap(naverMap);

    // 기본 마커를 현재 위치에 추가, 최상위 레벨로 설정
    const userMarker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(userCoords.lat, userCoords.lng),
      map: naverMap,
      title: "현재 위치",
      zIndex: 1000,
    });
  };

  useEffect(() => {
    if (userCoords && !map) {
      if (!window.naver) {
        const script = document.createElement("script");
        script.src =
          "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0gn7d1pje1";
        script.onload = loadNaverMap;
        document.head.appendChild(script);
      } else {
        loadNaverMap();
      }
    }
  }, [map, userCoords]); // userCoords가 설정되었을 때 초기화

  useEffect(() => {
    if (map && locations.length > 0) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });

      const newMarkers = [];

      locations.forEach((location) => {
        const centerLat = (location.startX + location.endX) / 2;
        const centerLng = (location.startY + location.endY) / 2;
        const centerLatLng = new window.naver.maps.LatLng(centerLat, centerLng);

        const radius = calculateDistance(
          location.startX,
          location.startY,
          centerLat,
          centerLng
        );

        const markerElement = document.createElement("div");
        markerElement.style.width = "50px";
        markerElement.style.height = "50px";
        markerElement.style.borderRadius = "50%";
        markerElement.style.backgroundColor = "#FF0000";
        markerElement.style.display = "flex";
        markerElement.style.justifyContent = "center";
        markerElement.style.alignItems = "center";
        markerElement.style.overflow = "hidden";

        const image = document.createElement("img");
        image.src = "/trash.png";
        image.style.width = "30px";
        image.style.height = "30px";
        markerElement.appendChild(image);

        const marker = new window.naver.maps.Marker({
          position: centerLatLng,
          map: map,
          icon: {
            content: markerElement,
            anchor: new window.naver.maps.Point(25, 25),
          },
        });

        const circle = new window.naver.maps.Circle({
          map: map,
          center: centerLatLng,
          radius: radius,
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          strokeColor: "#FF0000",
          strokeOpacity: 0.6,
          strokeWeight: 2,
        });

        let trashLevel = "적음";
        if (location.winterCondition === "HIGH") trashLevel = "많음";
        else if (location.winterCondition === "MEDIUM") trashLevel = "중간";

        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="width:150px;text-align:center;padding:10px;">
              <p>쓰레기량: ${trashLevel}</p>
              <button 
                style="padding:5px 10px;border:none;border-radius:5px;background-color:#4a688d;color:white;cursor:pointer;"
                onclick="window.location.href='/qr'"
              >
               쓰레기 수거하기
              </button>
            </div>
          `,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          if (currentInfoWindow) {
            currentInfoWindow.close();
          }
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });

        newMarkers.push(marker, circle);
      });

      setMarkers(newMarkers);

      const trashBinLocations = [
        { lat: 35.106, lng: 129.0362 },
        { lat: 35.1058, lng: 129.0347 },
        { lat: 35.1049, lng: 129.0355 },
      ];

      trashBinLocations.forEach((location) => {
        const trashBinElement = document.createElement("div");
        trashBinElement.style.width = "40px";
        trashBinElement.style.height = "40px";
        trashBinElement.style.borderRadius = "50%";
        trashBinElement.style.backgroundColor = "#228B22";
        trashBinElement.style.display = "flex";
        trashBinElement.style.justifyContent = "center";
        trashBinElement.style.alignItems = "center";

        const trashBinImage = document.createElement("img");
        trashBinImage.src = "/wastebasket.png";
        trashBinImage.style.width = "25px";
        trashBinImage.style.height = "25px";
        trashBinElement.appendChild(trashBinImage);

        const trashBinMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(location.lat, location.lng),
          map: map,
          icon: {
            content: trashBinElement,
            anchor: new window.naver.maps.Point(20, 20),
          },
        });
      });

      window.naver.maps.Event.addListener(map, "click", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
          currentInfoWindow = null;
        }
      });
    }
  }, [locations, map, userCoords]); // userCoords 변경될 때마다 마커와 위치 업데이트

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <button
        onClick={() => {
          if (map) {
            map.setCenter(
              new window.naver.maps.LatLng(userCoords.lat, userCoords.lng)
            );
          }
        }}
        style={{
          position: "absolute",
          top: "100px",
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
