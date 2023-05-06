import axios from "axios";
import mapboxgl from "mapbox-gl";
import Map from "react-map-gl";
import { Pin, NewCoordinate, ViewState } from "./typings";
import { useState, useEffect, useRef, useCallback } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import {
  AuthButton,
  NewPinPlaceInfo,
  PinPlace,
  PinPlaceInfo,
  Signin,
  SigninAlert,
  Signup,
  Usage,
} from "./components";

function App() {
  // 지도 뷰 상태 정보
  const [viewState, setViewState] = useState<ViewState | null>({
    longitude: 2.294694,
    latitude: 48.858093,
    zoom: 4,
  });
  const [currentUser, setCurrentUser] = useState<string | null>(
    window.localStorage.getItem("User")
  );
  const [pins, setPins] = useState<Pin[] | null>(null);
  // 선택한 핀 정보
  const [currentPin, setCurrentPin] = useState<Pin | null>(null);
  // 새로운 핀 좌표 정보
  const [newCoordinate, setNewCoordinate] = useState<NewCoordinate | null>(
    null
  );
  const usageRef = useRef<HTMLDialogElement>(null);
  const signupRef = useRef<HTMLDialogElement>(null);
  const signinRef = useRef<HTMLDialogElement>(null);
  const signinAlertRef = useRef<HTMLDialogElement>(null);

  // 기존 핀 클릭
  const handleClickPin = useCallback((pin: Pin) => {
    setCurrentPin(pin);
    setNewCoordinate(null);
    setViewState(prev => ({ ...prev!, longitude: pin.lng, latitude: pin.lat }));
  }, []);

  // 새로운 핀 추가
  const handleAddNewPin = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setNewCoordinate({ lng, lat });
  }, []);

  const showSigninModal = useCallback(() => {
    signinRef.current!.showModal();
  }, []);

  const showSignupModal = useCallback(() => {
    signupRef.current!.showModal();
  }, []);

  const handleSignout = useCallback(() => {
    window.localStorage.removeItem("User");
    setCurrentUser(null);
  }, []);

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
        if (!currentUser) {
          signinAlertRef.current?.showModal();
        } else {
          handleAddNewPin(event);
          setCurrentPin(null);
        }
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <h1 className="absolute left-3 top-3 animate-text bg-gradient-to-r from-pink-500 to-green-500 bg-clip-text font-jost text-5xl font-black text-transparent">
        PinAround
      </h1>

      <div className="absolute right-3 top-3 flex items-center space-x-2">
        <button onClick={() => usageRef.current?.showModal()}>
          <BsFillQuestionCircleFill size={20} />
        </button>
        {currentUser ? (
          <AuthButton category="로그아웃" handleClick={handleSignout} />
        ) : (
          <div className="space-x-2">
            <AuthButton category="로그인" handleClick={showSigninModal} />
            <AuthButton category="회원가입" handleClick={showSignupModal} />
          </div>
        )}
      </div>

      {pins?.map((pin, idx) => (
        <div key={idx}>
          <PinPlace pin={pin} user={currentUser} handleClick={handleClickPin} />

          {pin._id === currentPin?._id && (
            <PinPlaceInfo pin={pin} handleCurrentPin={setCurrentPin} />
          )}
        </div>
      ))}

      {newCoordinate && (
        <NewPinPlaceInfo
          currentUser={currentUser}
          newCoordinate={newCoordinate}
          handlePins={setPins}
          handleNewCoordinate={setNewCoordinate}
        />
      )}

      <Usage ref={usageRef} />
      <Signup ref={signupRef} />
      <Signin ref={signinRef} handleUser={setCurrentUser} />
      <SigninAlert ref={signinAlertRef} />
    </Map>
  );
}

export default App;
