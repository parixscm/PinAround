import { MutableRefObject, forwardRef, useRef, useState } from "react";
import axios from "axios";

const Signup = forwardRef<HTMLDialogElement>((props, ref) => {
  // 회원가입 정보
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // 회원가입 결과
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = {
      username: usernameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      await axios.post("/users/signup", userInfo);
      setIsError(false);
      setIsSuccess(true);
      usernameRef.current!.value = "";
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
    } catch (err) {
      setIsError(true);
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsError(false);
    setIsSuccess(false);
    usernameRef.current!.value = "";
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
    (ref as MutableRefObject<HTMLDialogElement>).current.close();
  };

  return (
    <dialog ref={ref}>
      <div className="p-5 m-auto space-y-6 w-96 h-80 flex flex-col items-center rounded-xl bg-white">
        <span className="mx-auto text-center text-xl font-semibold">
          ✈️ 추억을 <span className="text-[#eb2f06]">핀</span> 해보세요!
        </span>
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col items-center justify-between"
        >
          <input
            type="text"
            ref={usernameRef}
            placeholder="닉네임"
            className="px-2 py-1 w-80 text-sm outline-none border-b-[1px] border-gray-900 focus:border-b-[2px]"
          />
          <input
            type="email"
            ref={emailRef}
            placeholder="이메일"
            className="px-2 py-1 w-80 text-sm outline-none border-b-[1px] border-gray-900 focus:border-b-[2px]"
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="비밀번호"
            className="px-2 py-1 w-80 text-sm outline-none border-b-[1px] border-gray-900 focus:border-b-[2px]"
          />
          <div className="w-full space-y-1">
            {isSuccess && (
              <span className="block w-full text-green-600 text-sm font-semibold text-center">
                로그인 해서 핀 하세요! 😆
              </span>
            )}
            {isError && (
              <span className="block w-full text-red-600 text-sm font-semibold text-center">
                입력한 정보를 확인해주세요! 🧐
              </span>
            )}
            <button className="py-2 px-4 w-full rounded-md bg-[#eb2f06] text-white text-sm hover:brightness-90">
              가입하기
            </button>
            <div
              onClick={handleClose}
              className="py-2 px-4 w-full rounded-md bg-gray-500 text-white text-center text-sm cursor-pointer hover:brightness-90"
            >
              닫기
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default Signup;
