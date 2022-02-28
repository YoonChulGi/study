const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken, deprecated } = require("./middlewares");
const { Domain, User } = require("../models").db;
const { Checkout } = require("../models").db2;

const router = express.Router();
router.use(deprecated);

router.post("/token", async (req, res) => {
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
        expiresIn: "1m", // 1분
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

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get("/checkout", verifyToken, async (req, res, next) => {
  Checkout.findAll(/*{
    where: { full_name: req.decoded.full_name }
  }*/)
    .then((results) => {
      console.log(results);
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

//   Post.findAll({ where: { userId: req.decoded.id } })
//     .then((posts) => {
//       res.json({
//         code: 200,
//         payload: posts,
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(500).json({
//         code: 500,
//         message: "서버 에러",
//       });
//     });

// router.get("/checkout", async (req, res, next) => {
//   console.log('router.get("/checkout")');
//   if (req.params.name) {
//   }

//   res.json();
// });

module.exports = router;
