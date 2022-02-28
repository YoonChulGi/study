const express = require("express");
const axios = require("axios");
const cors = require("cors");
const router = express.Router();

router.use(
  cors({
    credentials: true,
  })
);

const URL = "http://localhost:3333/v2";
axios.defaults.headers.origin = "http://localhost:3333"; // origin 헤더 추가

const request = async (req, api, method = "get") => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }
    if (method === "get") {
      return await axios.get(`${URL}${api}`, {
        headers: { authorization: req.session.jwt },
        params: req.query,
      }); // API 요청
    } else if (method === "post") {
      const headers = { authorization: req.session.jwt };
      return await axios.post(
        `${URL}${api}`,
        {
          ...req.body,
        },
        { headers }
      ); // API 요청
    }
  } catch (error) {
    if (error.response.status === 419) {
      // 토큰 만료 시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    } // 419 외의 다른 에러면
    return error.response;
  }
};

router.get("/checkout", async (req, res, next) => {
  try {
    console.log(req.query);
    const result = await request(req, "/checkout");
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

router.post("/addAdmin", async (req, res, next) => {
  console.log("api.js - req.body");
  console.log(req.body);
  try {
    const result = await request(req, "/addAdmin", "post");
    res.status(result.data.code).json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

router.get("/", (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
});

module.exports = router;
