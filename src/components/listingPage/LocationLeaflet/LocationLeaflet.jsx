import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapPlaceholder from "./MapPlaceholder";

export default function LocationLeaflet({ position, location }) {
  return (
    <div className="h-52 w-full overflow-x-hidden lg:h-[400px]">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        placeholder={<MapPlaceholder location={location} />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
