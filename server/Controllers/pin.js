const pinModel = require("../Models/pin");

// ✅ 핀 생성하기
const createPin = async (req, res) => {
  const newPin = new pinModel(req.body);
  try {
    console.log(newPin); // 굿
    const savedPin = await newPin.save();
    console.log(savedPin); // 낫굿
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ 모든 핀 정보 가져오기
const getPins = async (req, res) => {
  try {
    const pins = await pinModel.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createPin, getPins };
