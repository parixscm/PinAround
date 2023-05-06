import { forwardRef } from "react";

type AuthInputProps = {
  type: string;
  placeholder: string;
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, placeholder }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-80 border-b-[1px] border-gray-900 px-2 py-1 text-sm outline-none focus:border-b-[2px]"
      />
    );
  }
);

export default AuthInput;
