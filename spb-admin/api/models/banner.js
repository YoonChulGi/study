const Sequelize = require("sequelize");

module.exports = class Banner extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        bid: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ad_title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        ad_desc: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        originalname: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        mimetype: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        size: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bucket: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        key: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_yn: {
          type: Sequelize.CHAR,
          allowNull: false,
          defaultValue: "n",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Banner",
        tableName: "spb_banner",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.User.hasMany(db.Post);
    // db.User.belongsToMany(db.User, {
    //     foreignKey: 'followingId',
    //     as: 'Followers',
    //     through: 'Follow',
    // });
    // db.User.belongsToMany(db.User, {
    //     foreignKey: 'followerId',
    //     as: 'Followings',
    //     through: 'Follow',
    // });
    // db.User.hasMany(db.Domain);
  }
};
