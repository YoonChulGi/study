const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const url = require("url");
const { Op } = require("sequelize");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { verifyToken, apiLimiter } = require("./middlewares");
const { Domain, User } = require("../models").db;
const { Checkout } = require("../models").db2;

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

  if (
    req.query.query ||
    req.query.searchField ||
    req.query.from ||
    req.query.to
  ) {
    queryOption.where = {};
    if (req.query.from || req.query.to) {
      queryOption.where["checkout_time"] = {};
    }
  }
  if (req.query._limit) {
    queryOption.limit = req.query._limit * 1;
  }

  if (req.query._page) {
    let { _page, _limit } = req.query; // _page: 1 _limit: 10 offset: 1   page:2 _limit:10 offset = 11
    _page *= 1;
    _limit *= 1;
    const offset = (_page - 1) * _limit;
    queryOption.offset = offset;
  }

  if (req.query.query && req.query.searchField) {
    queryOption.where[req.query.searchField] = req.query.query;
  }

  if (req.query.from) {
    queryOption.where["checkout_time"][Op.gte] = req.query.from;
  }

  if (req.query.to) {
    queryOption.where["checkout_time"][Op.lte] = req.query.to;
  }

  queryOption.order = [["checkout_time", "DESC"]];
  console.dir(queryOption);
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

router.post("/loginAdmin", isNotLoggedIn, (req, res, next) => {
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

module.exports = router;
