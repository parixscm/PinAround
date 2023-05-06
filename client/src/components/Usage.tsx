import { MutableRefObject, forwardRef } from "react";

const Usage = forwardRef<HTMLDialogElement>((props, ref) => {
  const handleClose = () =>
    (ref as MutableRefObject<HTMLDialogElement>).current.close();
  return (
    <dialog
      ref={ref}
      className="rounded-lg backdrop:bg-black backdrop:opacity-70"
    >
      <div className="m-auto flex h-80 w-96 flex-col items-center justify-around space-y-6 rounded-lg bg-white p-5 outline-none">
        <span className="mx-auto text-center font-jost text-xl font-semibold underline underline-offset-2">
          🔖 PinAround 사용하기
        </span>
        <ul className="space-y-1 text-center text-base">
          <li className="font-semibold">
            👉🏻 <span className="text-green-500">로그인</span>을 해야만 이용할 수
            있습니다.
          </li>
          <li>
            👉🏻 핀 하기 위해서 원하는 지역으로 이동한 후에 화면을{" "}
            <span className="text-orange-500">더블클릭</span>하세요.
          </li>
          <li>
            👉🏻 본인과 다른 유저의 핀이{" "}
            <span className="text-blue-600">색깔로 구별</span>됩니다. 다른
            유저의 추억을 살펴보세요!
          </li>
        </ul>
        <button
          onClick={handleClose}
          className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-center text-sm text-white outline-none hover:brightness-90"
        >
          닫기
        </button>
      </div>
    </dialog>
  );
});

export default Usage;
