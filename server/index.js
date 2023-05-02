const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const pinRoute = require("./Routes/pin");
const userRoute = require("./Routes/user");

const app = express();

// 미들웨어
app.use(express.json());
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB 연결 성공!"))
  .catch(err => console.log(err));

app.listen(8080, () => console.log("8080번 포트에서 서버가 실행중입니다."));
