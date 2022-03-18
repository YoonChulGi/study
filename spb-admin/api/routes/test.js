const express = require("express");

const cors = require("cors");
const url = require("url");
const { Op } = require("sequelize");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { verifyToken, apiLimiter } = require("./middlewares");
const { Domain } = require("../models").db;
const { Banner } = require("../models").db2;

const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();

// router.use(async (req, res, next) => {
//   const domain = await Domain.findOne({
//     where: { host: url.parse(req.get("origin")).host },
//   });
//   if (domain) {
//     cors({
//       origin: req.get("origin"),
//       credentials: true,
//     })(req, res, next);
//   } else {
//     next();
//   }
// });

router.get("/banner", (req, res, next) => {
  let queryOption = {};
  console.dir(req.query);
  let { searchField, query, end_date, search_type, _page, _limit } = req.query;
  if (!searchField) searchField = "ad_title";
  query = "광고";
  _page = 1;
  _limit = 10;
  end_date = "2022-03-16";
  if (searchField || query || end_date) {
    queryOption.where = [];
    if (end_date) {
      //   queryOption.where["end_date"] = {};
    }
  }

  // if (
  //   req.query.query ||
  //   req.query.searchField ||
  //   req.query.from ||
  //   req.query.to
  // ) {
  //   queryOption.where = {};
  //   if (req.query.from || req.query.to) {
  //     queryOption.where["checkout_time"] = {};
  //   }
  // }
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
    queryOption.where.push({
      [searchField]: {
        [Op.like]: "%" + query + "%",
      },
    });
    // queryOption.where.searchField[Op.like] = "%" + query + "%";
    // console.log({ [Op.like]: query });
    // queryOption.where[searchField][Op.like] = "%" + query + "%";
  }
  if (end_date) {
    // queryOption.where["end_date"] = end_date + "T00:00:00.000Z";
    queryOption.where.push({ ["end_date"]: end_date + "T00:00:00.000Z" });
  }

  // if (req.query.from) {
  //   queryOption.where["checkout_time"][Op.gte] = req.query.from;
  // }

  // if (req.query.to) {
  //   queryOption.where["checkout_time"][Op.lte] = req.query.to;
  // }

  queryOption.order = [["id", "DESC"]];
  //   console.dir(queryOption);
  //   const obj = {
  //     where: [
  //       //   [Op.and]: [
  //       { end_date: "2022-03-16T00:00:00.000Z" },
  //       //   { ad_title: { [Op.like]: "%" + query + "%" } },
  //       //   ],
  //     ],
  //     limit: 10,
  //     offset: 0,
  //     order: [["id", "DESC"]],
  //   };
  const util = require("util");

  console.log(util.inspect(queryOption, { showHidden: false, depth: null }));
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

  // Checkout.findAll(queryOption)
  // .then((results) => {
  //   res.json({
  //     code: 200,
  //     payload: results,
  //   });
  // })
  // .catch((error) => {
  //   console.error(error);
  //   return res.status(500).json({
  //     code: 500,
  //     message: "서버 에러",
  //   });
  // });
});

module.exports = router;
