import { MutableRefObject, forwardRef, useRef, useState } from "react";
import axios from "axios";
import AuthInput from "./AuthInput";

const Signup = forwardRef<HTMLDialogElement>((props, ref) => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
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

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsError(false);
    setIsSuccess(false);
    usernameRef.current!.value = "";
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
    (ref as MutableRefObject<HTMLDialogElement>).current.close();
  };

  return (
    <dialog ref={ref} className="rounded-lg">
      <div className="m-auto flex h-80 w-96 flex-col items-center space-y-6 rounded-lg bg-white p-5 outline-none">
        <span className="mx-auto text-center text-xl font-semibold">
          ✈️ 추억을 <span className="text-[#eb2f06]">핀</span> 해보세요!
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col items-center justify-between"
        >
          <AuthInput ref={usernameRef} type="text" placeholder="닉네임" />
          <AuthInput ref={emailRef} type="email" placeholder="이메일" />
          <AuthInput ref={passwordRef} type="password" placeholder="비밀번호" />
          <div className="w-full space-y-1">
            {isSuccess && (
              <span className="block w-full text-center text-sm font-semibold text-green-600">
                로그인 해서 핀 하세요! 😆
              </span>
            )}
            {isError && (
              <span className="block w-full text-center text-sm font-semibold text-red-600">
                입력한 정보를 확인해주세요! 🧐
              </span>
            )}
            <button className="w-full rounded-md bg-[#eb2f06] px-4 py-2 text-sm text-white hover:brightness-90">
              가입하기
            </button>
          </div>
        </form>
        <button
          onClick={handleClose}
          className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-center text-sm text-white hover:brightness-90"
        >
          닫기
        </button>
      </div>
    </dialog>
  );
});

export default Signup;
