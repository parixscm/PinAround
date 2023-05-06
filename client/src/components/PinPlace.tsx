import { Marker } from "react-map-gl";
import { Pin } from "../typings";
import { FaMapMarkerAlt } from "react-icons/fa";

type PinProps = {
  pin: Pin;
  handleClick: (pin: Pin) => void;
  user: string | null;
};

function PinPlace({ pin, user, handleClick }: PinProps) {
  return (
    <Marker
      anchor="center"
      longitude={pin.lng}
      latitude={pin.lat}
      onClick={() => handleClick(pin)}
    >
      <FaMapMarkerAlt
        size={"1.8rem"}
        className={pin.username === user ? "text-[#eb2f06]" : "text-purple-500"}
      />
    </Marker>
  );
}

export default PinPlace;
