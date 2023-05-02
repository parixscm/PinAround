const bcrypt = require("bcrypt");
const validator = require("validator");
const userModel = require("../Models/user");

// ✅ 회원가입
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 👉🏻 이메일 중복 여부 확인
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("동일한 이메일 계정이 존재합니다.");

    // 👉🏻 가입 정보 누락 여부 확인
    if (!username || !email || !password)
      return res.status(400).json("올바른 정보를 입력해주세요.");

    // 👉🏻 이메일 유효성 검사
    if (!validator.isEmail(email))
      return res.status(400).json("이메일 형식이 올바르지 않습니다.");

    // 👉🏻 비밀번호 유효성 검사
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json(
          "비밀번호는 숫자/특수문자/소문자 알파벳/최소 1개의 대문자 알파벳을 포함해야 합니다."
        );

    // 🟠 회원가입 진행
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(200).json({ _id: newUser._id, username: newUser.username });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ 로그인
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    // 👉🏻 유저 정보가 없는 경우
    if (!user)
      return res.status(400).json("이메일 혹은 비밀번호를 확인해주세요.");

    // 👉🏻 비밀번호 일치 여부 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("이메일 혹은 비밀번호를 확인해주세요");

    // 🟠 로그인 진행
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { signUp, signIn };
