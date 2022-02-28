const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");
const Domain = require("./domain");
const Checkout = require("./checkout");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain;
db.Checkout = Checkout;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize);
//Checkout.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);
//Checkout.associate(db);

const db2 = {};
const sequelize2 = new Sequelize(
  "spb",
  config.username,
  config.password,
  config
);

db2.sequelize = sequelize2;
db2.Checkout = Checkout;
Checkout.init(sequelize2);

Checkout.associate(db2);

module.exports = { db, db2 };
