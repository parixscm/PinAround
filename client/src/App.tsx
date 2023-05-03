import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { Pin } from "./typings";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function App() {
  const [currentUser, setCurrentUser] = useState("jin0e");
  const [pins, setPins] = useState<Pin[] | null>(null);
  const [currentPinId, setCurrentPinId] = useState<string | null>(null);

  useEffect(() => {
    const getAllPins = async () => {
      try {
        const response = await axios.get<Pin[]>("/pins");
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPins();
  }, []);

  console.log(currentPinId);

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
      {pins?.map((pin, idx) => (
        <div key={idx}>
          <Marker
            anchor="center"
            longitude={pin.long}
            latitude={pin.lat}
            onClick={() => setCurrentPinId(pin._id)}
          >
            <FaMapMarkerAlt
              size={"1.8rem"}
              className={
                pin.username === `${currentUser}`
                  ? "text-[#eb2f06]"
                  : "text-purple-500"
              }
            />
          </Marker>
          {pin._id === currentPinId && (
            <Popup
              className="w-64 opacity-90"
              longitude={pin.long}
              latitude={pin.lat}
              anchor="top-left"
              focusAfterOpen={false}
              closeOnClick={false}
              onClose={() => setCurrentPinId(null)}
            >
              <div className="w-full h-64 flex flex-col justify-around text-[14px]">
                <label className="label">장소</label>
                <h4>
                  <b>{pin.place}</b>
                </h4>
                <label className="label">리뷰</label>
                <p>{pin.review}</p>
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
                  작성자: <b>{pin.username}</b>
                </span>
                <span className="text-[12px]">
                  작성시간: {moment(pin.createdAt).fromNow()}
                </span>
              </div>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default App;
