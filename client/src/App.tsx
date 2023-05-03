import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { Pin, NewCoordinate, ViewState } from "./typings";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import mapboxgl from "mapbox-gl";

function App() {
  const [currentUser, setCurrentUser] = useState("jin0e");
  const [viewState, setViewState] = useState<ViewState | null>({
    longitude: 2.294694,
    latitude: 48.858093,
    zoom: 4,
  });
  const [pins, setPins] = useState<Pin[] | null>(null);
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);
  const [newCoordinate, setNewCoordinate] = useState<NewCoordinate | null>(
    null
  );

  // ✅ 핀 클릭
  const handleClickPin = (pin: Pin) => {
    setCurrentPin(pin);
    setViewState(prev => ({ ...prev!, longitude: pin.lng, latitude: pin.lat }));
    setNewCoordinate(null);
  };

  // ✅ 새로운 핀 추가
  const handleAddNewPin = (event: mapboxgl.MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setNewCoordinate({ lng, lat });
  };

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

  return (
    <Map
      {...viewState}
      cursor="pointer"
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={event => setViewState(event.viewState)}
      onDblClick={event => {
        handleAddNewPin(event);
        setCurrentPin(null);
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {pins?.map((pin, idx) => (
        <div key={idx}>
          <Marker
            anchor="center"
            longitude={pin.lng}
            latitude={pin.lat}
            onClick={() => handleClickPin(pin)}
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
          {pin._id === currentPin?._id && (
            <Popup
              className="w-64 opacity-90"
              longitude={pin.lng}
              latitude={pin.lat}
              anchor="top-left"
              focusAfterOpen={false}
              closeOnClick={false}
              onClose={() => setCurrentPin(null)}
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
          {newCoordinate && (
            <Popup
              className="w-64 opacity-70"
              longitude={newCoordinate.lng}
              latitude={newCoordinate.lat}
              anchor="top-left"
              focusAfterOpen={false}
              closeOnClick={false}
              onClose={() => setNewCoordinate(null)}
            >
              <form className="w-full h-64 flex flex-col justify-between text-gray-700">
                <label className="label font-semibold text-[#eb2f06]">
                  장소
                </label>
                <input
                  className="px-2 w-full border-b-[1px] border-gray-300 outline-none"
                  type="text"
                />
                <label className="label font-semibold text-[#eb2f06]">
                  리뷰
                </label>
                <textarea className="px-2 w-full border-[1px] border-gray-300 outline-none" />
                <label className="label font-semibold text-[#eb2f06]">
                  별점
                </label>
                <select className="w-full border-b-[1px] border-gray-300 outline-none">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="submit"
                  className="w-full border-none outline-none p-1 rounded-sm text-white bg-[#eb2f06] cursor-pointer"
                >
                  핀 하기
                </button>
              </form>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default App;
