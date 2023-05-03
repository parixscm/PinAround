import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function App() {
  return (
    <Map
      initialViewState={{
        longitude: 2.294694,
        latitude: 48.858093,
        zoom: 4,
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={2.294694} latitude={48.85809} anchor="center">
        <FaMapMarkerAlt size={"1.8rem"} color="#eb2f06" />
      </Marker>
    </Map>
  );
}

export default App;
