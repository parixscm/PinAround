import { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { Pin, NewCoordinate, ViewState, NewPin } from "./typings";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import mapboxgl from "mapbox-gl";
import { Signin, Signup } from "./components";

function App() {
  // 로그인 유저
  const [currentUser, setCurrentUser] = useState<string | null>(
    window.localStorage.getItem("User")
  );
  // 지도 뷰 상태 정보
  const [viewState, setViewState] = useState<ViewState | null>({
    longitude: 2.294694,
    latitude: 48.858093,
    zoom: 4,
  });
  // 불러온 핀 정보
  const [pins, setPins] = useState<Pin[] | null>(null);
  // 선택한 핀 정보
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);
  // 새로운 핀 좌표 정보
  const [newCoordinate, setNewCoordinate] = useState<NewCoordinate | null>(
    null
  );
  // 새로 입력한 핀 내용
  const placeRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const rateRef = useRef<HTMLSelectElement>(null);
  // 로그인, 로그아웃 Ref
  const signupRef = useRef<HTMLDialogElement>(null);
  const signinRef = useRef<HTMLDialogElement>(null);

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

  // ✅ 새로운 핀 정보 등록
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPin: NewPin = {
      username: currentUser!,
      place: placeRef.current?.value!,
      review: reviewRef.current?.value!,
      rating: +rateRef.current?.value!,
      lat: newCoordinate?.lat!,
      lng: newCoordinate?.lng!,
    };

    try {
      const { data } = await axios.post<Pin>("/pins", newPin);
      console.log(data);
      setPins(prev => [...prev!, data]);
      setNewCoordinate(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignout = () => {
    window.localStorage.removeItem("User");
    setCurrentUser(null);
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
    signupRef.current?.close();
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
                  {Array(pin.rating).fill(<FaStar />)}
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
              className="w-64 opacity-60"
              longitude={newCoordinate.lng}
              latitude={newCoordinate.lat}
              anchor="top-left"
              focusAfterOpen={false}
              closeOnClick={false}
              onClose={() => setNewCoordinate(null)}
            >
              <form
                onSubmit={handleSubmit}
                className="w-full h-64 flex flex-col justify-between text-gray-700"
              >
                <label className="label font-semibold text-[#eb2f06]">
                  장소
                </label>
                <input
                  ref={placeRef}
                  type="text"
                  className="px-2 w-full border-b-[1px] border-gray-400 outline-none focus:border-b-2"
                />
                <label className="label font-semibold text-[#eb2f06]">
                  리뷰
                </label>
                <textarea
                  ref={reviewRef}
                  className="px-2 w-full border-[1px] border-gray-400 outline-none focus:border-b-2"
                />
                <label className="label font-semibold text-[#eb2f06]">
                  별점
                </label>
                <select
                  ref={rateRef}
                  className="w-full border-b-[1px] border-gray-400 outline-none focus:border-b-2"
                >
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
          {currentUser ? (
            <button
              onClick={handleSignout}
              className="authBtn bg-violet-600 absolute top-3 right-3 text-base"
            >
              로그아웃
            </button>
          ) : (
            <div className="absolute top-3 right-3">
              <button
                onClick={() => signinRef.current!.showModal()}
                className="authBtn bg-green-600 text-base"
              >
                로그인
              </button>
              <button
                onClick={() => signupRef.current!.showModal()}
                className="authBtn bg-yellow-500 text-base"
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      ))}
      <Signup ref={signupRef} />
      <Signin ref={signinRef} handleUser={setCurrentUser} />
    </Map>
  );
}

export default App;
