const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const v1 = require("./routes/v1");
const v2 = require("./routes/v2");
const passport = require("passport");
const { sequelize } = require("./models").db;
const { sequelize: sequelize2 } = require("./models").db2;
const passportConfig = require("./passport");

dotenv.config();
const authRouter = require("./routes/auth");
const indexRouter = require("./routes");
const apiRouter = require("./routes/api");
const logger = require("./logger");
const app = express();
passportConfig();
app.set("port", process.env.PORT || 3333);
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스1 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

sequelize2
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스2 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
// let corsOption = {
//   origin: "http://localhost:3000", // 허락하는 요청 주소
//   credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
// };
// app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/v1", v1);
app.use("/v2", v2);
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.error(error.message);
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
