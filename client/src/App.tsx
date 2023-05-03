import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { Pins } from "./typings";

function App() {
  const [pins, setPins] = useState<Pins[] | null>(null);

  useEffect(() => {
    const getAllPins = async () => {
      try {
        const response = await axios.get<Pins[]>("/pins");
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPins();
  }, []);

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
          <Marker longitude={pin.long} latitude={pin.lat} anchor="center">
            <FaMapMarkerAlt size={"1.8rem"} color="#eb2f06" />
          </Marker>

          <Popup
            longitude={pin.long}
            latitude={pin.lat}
            anchor="bottom"
            closeButton={false}
            focusAfterOpen={false}
          >
            <div className="w-64 h-64 flex flex-col justify-around text-[14px]">
              <label className="label">장소</label>
              <h4>{pin.place}</h4>
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
                작성시간: <b>{moment(pin.createdAt).fromNow()}</b>
              </span>
            </div>
          </Popup>
        </div>
      ))}
    </Map>
  );
}

export default App;
