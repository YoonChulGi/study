const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();

const { Banner } = require("../models").db2;

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "spb-admin",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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

router.post("/loginAdmin", async (req, res, next) => {
  try {
    const result = await request(req, "/loginAdmin", "post");
    res.status(result.data.code).json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/logoutAdmin", async (req, res, next) => {
  try {
    const result = await request(req, "/logoutAdmin");
    res.status(result.data.code).json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/uploadBanner", upload.single("file"), async (req, res, next) => {
  console.log("uploadBanner!#!#!");
  const { bid, ad_title, ad_desc, end_date } = req.body;
  console.dir({ bid, ad_title, ad_desc, end_date });
  console.log(req.file);
  const { originalname, mimetype, size, bucket, key, location } = req.file;
  try {
    const banner = await Banner.create({
      bid,
      ad_title,
      ad_desc,
      originalname,
      mimetype,
      size,
      bucket,
      key,
      end_date,
      url: location,
    });
    res.status(200).json({
      banner,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: 444,
      errorMessage: error,
    });
  }
});

router.get("/banner", async (req, res, next) => {
  console.log("/banner - get");
  try {
    const result = await request(req, "/banner");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.code) {
      return res.status(error.code).json({
        code: error.code,
        errorMessage: error,
      });
    } else {
      next(error);
    }
  }
});

module.exports = router;
