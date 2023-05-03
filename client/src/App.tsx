import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [showPopup, setShowPopup] = useState(true);

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
      {showPopup && (
        <Popup
          longitude={2.294694}
          latitude={48.858093}
          anchor="bottom"
          closeButton={false}
          style={{ opacity: "95%" }}
          onClose={() => setShowPopup(false)}
          focusAfterOpen={false}
        >
          <div className="w-64 h-64 flex flex-col justify-around text-[14px]">
            <label className="label">장소</label>
            <h4>에펠탑</h4>
            <label className="label">리뷰</label>
            <p>아름다운 장소. 사랑해!</p>
            <label className="label">별점</label>
            <div className="flex space-x-0.5 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <label className="label">정보</label>
            <span>
              작성자: <b>mason</b>
            </span>
            <span className="text-[12px]">
              작성시간: <b>1시간 전</b>
            </span>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
