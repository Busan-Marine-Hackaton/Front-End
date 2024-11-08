import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// 마커 아이콘 설정 (기본 Leaflet 아이콘을 사용할 수도 있음)
const customIcon = new Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 38], // 아이콘 크기
  iconAnchor: [22, 38], // 아이콘의 고정점 (하단 중앙)
  popupAnchor: [-3, -38], // 팝업 위치
});

const MapComponent = () => {
  // 지도 중심 좌표 (서울)
  const center = [37.5665, 126.978];

  return (
    <div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        {/* 지도 타일 추가 (OpenStreetMap 사용) */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 마커 추가 */}
        <Marker position={center} icon={customIcon}>
          <Popup>서울의 중심입니다.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
