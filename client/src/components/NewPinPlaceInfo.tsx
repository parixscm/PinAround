import { FormEvent, useRef } from "react";
import { Popup } from "react-map-gl";
import { NewCoordinate, NewPin, Pin } from "../typings";
import axios from "axios";

type NewPinPlaceInfoProps = {
  currentUser: string | null;
  newCoordinate: NewCoordinate | null;
  handlePins: React.Dispatch<React.SetStateAction<Pin[] | null>>;
  handleNewCoordinate: React.Dispatch<
    React.SetStateAction<NewCoordinate | null>
  >;
};

function NewPinPlaceInfo({
  currentUser,
  newCoordinate,
  handlePins,
  handleNewCoordinate,
}: NewPinPlaceInfoProps) {
  // 🔵 새로 입력한 핀 내용
  const placeRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const rateRef = useRef<HTMLSelectElement>(null);

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
      handlePins(prev => [...prev!, data]);
      handleNewCoordinate(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Popup
      className="w-64"
      longitude={newCoordinate!.lng}
      latitude={newCoordinate!.lat}
      anchor="top-left"
      focusAfterOpen={false}
      closeOnClick={false}
      onClose={() => handleNewCoordinate(null)}
    >
      <form
        onSubmit={handleSubmit}
        className="flex h-64 w-full flex-col justify-between text-gray-700"
      >
        <label className="label">장소</label>
        <input
          ref={placeRef}
          type="text"
          className="w-full border-b-[1px] border-gray-400 px-2 outline-none focus:border-b-2"
        />
        <label className="label">리뷰</label>
        <textarea
          ref={reviewRef}
          className="w-full border-[1px] border-gray-400 px-2 outline-none focus:border-b-2"
        />
        <label className="label">별점</label>
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
          className="w-full cursor-pointer rounded-sm border-none bg-[#eb2f06] p-1 text-white outline-none"
        >
          핀 하기
        </button>
      </form>
    </Popup>
  );
}
export default NewPinPlaceInfo;
