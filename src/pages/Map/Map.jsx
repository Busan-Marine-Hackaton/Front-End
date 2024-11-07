import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";

function Map() {
  const position = [51.505, -0.09];
  return (
    <div className="w-full h-[100vh] bg-[#e7f0f1] flex flex-col items-center">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
