const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb://id:${encodeURIComponent("password")}@ip:27017/admin`,
    {
      dbName: "nodejs",
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};
mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러\n", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  setTimeout(() => {
    connect();
  }, 5000);
});
mongoose.connection.on("connected", () => {
  console.log("mongodb connected successfully");
});

module.exports = connect;
