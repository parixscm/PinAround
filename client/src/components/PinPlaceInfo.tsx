import "moment/locale/ko";
import moment from "moment";
import { Popup } from "react-map-gl";
import { Pin } from "../typings";
import { FaStar } from "react-icons/fa";

type PinPlaceInfoProps = {
  pin: Pin;
  handleCurrentPin: React.Dispatch<React.SetStateAction<Pin | null>>;
};

function PinPlaceInfo({ pin, handleCurrentPin }: PinPlaceInfoProps) {
  return (
    <Popup
      className="w-64 opacity-90"
      longitude={pin.lng}
      latitude={pin.lat}
      anchor="top-left"
      focusAfterOpen={false}
      closeOnClick={false}
      onClose={() => handleCurrentPin(null)}
    >
      <div className="flex h-64 w-full flex-col justify-around text-[14px]">
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
  );
}

export default PinPlaceInfo;
