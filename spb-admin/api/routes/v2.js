const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const url = require("url");
const { Op } = require("sequelize");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { verifyToken, apiLimiter } = require("./middlewares");
const { Domain, User } = require("../models").db;
const { Checkout, Banner } = require("../models").db2;

const LoginLog = require("../schemas/LoginLog");

const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();

router.use(async (req, res, next) => {
  const domain = await Domain.findOne({
    where: { host: url.parse(req.get("origin")).host },
  });
  if (domain) {
    cors({
      origin: req.get("origin"),
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
});

router.post("/token", apiLimiter, async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        messasge: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m", // 1분
        issuer: "admin",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/test", verifyToken, apiLimiter, (req, res) => {
  res.json(req.decoded);
});

router.get("/checkout", apiLimiter, verifyToken, async (req, res, next) => {
  let queryOption = {};
  let { query, searchField, from, to, _limit, _page } = req.query;
  if (!searchField) searchField = "idx";
  if (query || searchField || from || to) {
    queryOption.where = {};
    if (from || to) {
      queryOption.where["checkout_time"] = {};
    }
  }
  if (_limit) {
    queryOption.limit = _limit * 1;
  }

  if (req.query._page) {
    _page *= 1;
    _limit *= 1;
    const offset = (_page - 1) * _limit;
    queryOption.offset = offset;
  }

  if (query && searchField) {
    queryOption.where[searchField] = query;
  }

  if (from) {
    queryOption.where["checkout_time"][Op.gte] = from;
  }

  if (to) {
    queryOption.where["checkout_time"][Op.lte] = to;
  }

  queryOption.order = [["checkout_time", "DESC"]];

  Checkout.findAll(queryOption)
    .then((results) => {
      res.json({
        code: 200,
        payload: results,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
});

router.post("/addAdmin", apiLimiter, verifyToken, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(499).json({
        code: 499,
        errorMessage: "이미 존재하는 이메일입니다.",
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.status(200).json({
      code: 200,
      message: "관리자 추가 성공",
      email,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/loginAdmin", apiLimiter, verifyToken, (req, res, next) => {
  const { email, password } = req.body;

  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.status(498).json({
        code: 498,
        errorMessage: "authenticate error",
        authError,
      });
    }
    if (!user) {
      console.dir(info);
      return res.status(497).json({
        code: 497,
        errorMessage: info.message,
      });
    }
    return res.status(200).json({
      code: 200,
      message: "관리자로 로그인 되었습니다.",
      email,
    });
  })(req, res, next);
});

router.get("/logoutAdmin", apiLimiter, verifyToken, (req, res, next) => {
  return res.status(200).json({
    code: 200,
    message: "관리자 로그아웃 완료.",
  });
});

router.post("/uploadBanner", apiLimiter, verifyToken, (req, res, next) => {
  return res.status(200).json({
    code: 200,
    message: "uploadOk",
  });
});

router.get("/banner", apiLimiter, verifyToken, (req, res, next) => {
  let queryOption = {};
  console.dir(req.query);
  let { searchField, query, end_date, _page, _limit } = req.query;
  if (!searchField) searchField = "id";
  if (searchField || query || end_date) {
    queryOption.where = [];
  }

  if (_limit) {
    queryOption.limit = _limit * 1;
  }

  if (_page) {
    _page *= 1;
    _limit *= 1;
    const offset = (_page - 1) * _limit;
    queryOption.offset = offset;
  }
  if (query && searchField) {
    if (searchField === "id" || searchField === "bid") {
      queryOption.where.push({
        [searchField]: query,
      });
    } else {
      queryOption.where.push({
        [searchField]: {
          [Op.like]: "%" + query + "%",
        },
      });
    }
  }
  if (end_date) {
    queryOption.where.push({
      ["end_date"]: end_date + "T00:00:00.000Z",
    });
  }

  queryOption.order = [["id", "DESC"]];
  console.dir(queryOption);
  Banner.findAll(queryOption)
    .then((results) => {
      res.json({
        code: 200,
        payload: results,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(445).json({
        code: 445,
        errorMessage: "서버 에러",
      });
    });
});

router.get("/loginLog", apiLimiter, verifyToken, async (req, res, next) => {
  console.dir(req.query);
  let { searchField, query, timestamp, _page, _limit } = req.query;
  let offset = 0;

  let queryOption = {};

  if (!searchField) {
    searchField = "user_id";
  }

  if (searchField && query) {
    queryOption[searchField] = { $regex: query.trim() };
  }

  if (timestamp) {
    let tomorrow = new Date(timestamp.trim() + "T00:00:00.000Z");
    tomorrow.setDate(tomorrow.getDate() + 1);

    queryOption["timestamp"] = {
      $gte: new Date(timestamp.trim() + "T00:00:00.000Z"),
      $lt: tomorrow,
    };
  }

  if (_limit) {
    _limit *= 1;
  }

  if (_page) {
    _page *= 1;
    _limit *= 1;
    offset = (_page - 1) * _limit;
  }

  try {
    const loginLogs = await LoginLog.find(queryOption)
      .skip(offset)
      .limit(_limit);
    res.status(200).json({
      code: 200,
      payload: loginLogs,
    });
  } catch (err) {
    console.error(err);
    return res.status(445).json({
      code: 445,
      errorMessage: "서버 에러",
    });
  }
});

module.exports = router;
