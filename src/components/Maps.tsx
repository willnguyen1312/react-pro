import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Maps.css";
import "leaflet/dist/leaflet.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

// Importing images from locally stored assets to address a bug
// in CodeSandbox: https://github.com/codesandbox/codesandbox-client/issues/3845

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
});

// When importing into your own app outside of CodeSandbox, you can import directly
// from the leaflet package like below
//
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

const zoom = 12;

export function FlightMaps() {
    return (
        <MapContainer
            className="w-40 h-40"
            center={[38.9072, -77.0369]}
            zoom={zoom}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[38.9072, -77.0369]}>
                <Popup>Hello, Washington, DC</Popup>
            </Marker>
        </MapContainer>
    );
}
