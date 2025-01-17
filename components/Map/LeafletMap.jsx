import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically import Leaflet components to avoid SSR issues
const Map = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

function LeafletMap() {
  const [position, setPosition] = useState([10.056403690212132, 76.35339319377448]);
  const [zoom, setZoom] = useState(11);
  const markerRef = useRef(null);

  const hqCoord = [10.056403690212132, 76.35339319377448];
  const boCoord = [40.260334, -76.882865];

  const travel = (locationTo) => {
    setPosition(locationTo === "bo" ? boCoord : hqCoord);
    setZoom(locationTo === "bo" ? 7 : 11);
  };

  useEffect(() => {
    if (markerRef.current) {
      setTimeout(() => {
        markerRef.current.openPopup();
      }, 2800);
    }
  }, []);

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  return (
    <div style={{ display: "flex", width: "100%", marginTop: "20px", paddingTop: "20px" }}>
      <div style={{ width: "100%" }}>
        <Map center={position} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          />
          <Marker
            position={hqCoord}
            icon={defaultIcon}
            eventHandlers={{ click: () => travel("bo") }}
            ref={markerRef}
          >
            <Popup>
              <div>
                <svg x="0px" y="0px" viewBox="0 0 60 60" fill="#000">
                  <polygon points="3,50 11,50 11,14.3 3,18.5" />
                  <polygon points="39,24.8 39,18.6 56,33.1 56,31.6 35.6,10.4 19,18.2 19,23.3 14,25.5 14,50 21,50 21,22 25,22 25,50 56,50 56,47.9 39,47 39,42.7 56,45.2 56,43.5 39,39.8 39,35.6 56,40.5 56,38.8 39,33.4 39,27.7 56,36.4 56,34.6" />
                </svg>
                <div>
                  <span>
                    <br />
                    Kerala Startup Mission<br />
                    Kalamassery, Kochi.<br />
                  </span>
                  <hr />
                  <a href="https://www.google.com/maps/place/Kerala+Startup+Mission/@10.0561449,76.3508183,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080c04e2534d9f:0x57a3a39e6b6b4514!8m2!3d10.0561396!4d76.3533932!16s%2Fg%2F1hc1wx315?entry=ttu" onClick={() => travel("bo")}>To Conference</a>
                </div>
              </div>
            </Popup>
          </Marker>
          <Marker position={boCoord} icon={defaultIcon} eventHandlers={{ click: () => travel("hq") }} />
        </Map>
      </div>
    </div>
  );
}

export default LeafletMap;