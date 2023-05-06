import { MutableRefObject, forwardRef, useRef, useState } from "react";
import axios from "axios";
import { User } from "../typings";
import AuthInput from "./AuthInput";

type SigninProps = {
  handleUser: React.Dispatch<React.SetStateAction<string | null>>;
};

const Signin = forwardRef<HTMLDialogElement, SigninProps>(
  ({ handleUser }, ref) => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const userInfo = {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      };

      try {
        const { data } = await axios.post<User>("/users/signin", userInfo);
        setIsError(false);
        emailRef.current!.value = "";
        passwordRef.current!.value = "";
        handleUser(data.username);
        window.localStorage.setItem("User", data.username);
        (ref as MutableRefObject<HTMLDialogElement>).current.close();
      } catch (error) {
        setIsError(true);
      }
    };

    const handleClose = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      setIsError(false);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      (ref as MutableRefObject<HTMLDialogElement>).current.close();
    };

    return (
      <dialog ref={ref} className="rounded-lg">
        <div className="m-auto flex h-80 w-96 flex-col items-center space-y-6 rounded-lg bg-white p-5 outline-none">
          <span className="mx-auto text-center text-xl font-semibold">
            📍 로그인
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col items-center justify-between"
          >
            <AuthInput ref={emailRef} type="email" placeholder="이메일" />
            <AuthInput
              ref={passwordRef}
              type="password"
              placeholder="비밀번호"
            />

            <div className="w-full space-y-1">
              {isError && (
                <span className="block w-full text-center text-sm font-semibold text-red-600">
                  입력한 정보를 확인해주세요! 🧐
                </span>
              )}
              <button className="w-full rounded-md bg-[#eb2f06] px-4 py-2 text-sm text-white hover:brightness-90">
                시작하기
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
  }
);

export default Signin;
