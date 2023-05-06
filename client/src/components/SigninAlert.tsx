import { MutableRefObject, forwardRef } from "react";

const SigninAlert = forwardRef<HTMLDialogElement>((props, ref) => {
  // 모달 닫기
  const handleClose = () => {
    (ref as MutableRefObject<HTMLDialogElement>).current.close();
  };

  return (
    <dialog ref={ref} className="rounded-lg backdrop:backdrop-blur-sm">
      <div className="m-auto flex h-80 w-96 flex-col items-center justify-around space-y-6 rounded-xl p-5">
        <span className="text-xl font-semibold">로그인 후 이용해주세요 🥸</span>
        <button
          onClick={handleClose}
          className="w-full cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-center text-sm text-white hover:brightness-90"
        >
          닫기
        </button>
      </div>
    </dialog>
  );
});
export default SigninAlert;
