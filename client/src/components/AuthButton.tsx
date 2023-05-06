type AuthButtonProps = {
  category: string;
  handleClick: () => void;
};

function AuthButton({ category, handleClick }: AuthButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`authBtn ${
        category === "로그아웃"
          ? "bg-violet-600"
          : category === "로그인"
          ? "bg-green-600"
          : "bg-yellow-500"
      }`}
    >
      {category}
    </button>
  );
}

export default AuthButton;
