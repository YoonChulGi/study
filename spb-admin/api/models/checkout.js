const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        card_cvc: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        card_expiry: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        card_number: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        checkout_time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        detail_address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        extra_address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        full_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        postcode: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        prd_ids: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        qtys: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Checkout",
        tableName: "spb_checkout",
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
