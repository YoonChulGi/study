require("dotenv").config();

module.exports = {
  development: {
    username: process.env.SEQUELIZE_ID,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "spb-api_dev",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.SEQUELIZE_ID,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "spb-api_test",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.SEQUELIZE_ID,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "spb-api_production",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
    logging: false,
  },
};
