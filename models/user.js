const Sequelize = require("sequelize");

//  Sequelize : id를 기본 키로 연결, 나머지 컬럼의 스펙은 정확하게 일치하도록 입력
// User = Sequelize.Model의 확장 class
// init(method) = 테이블 설정
// associate(method) = 다른 모델과의 관계
// super.init = p1:테이블 컬럼 설정, p2:테이블 자체 설정
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, {
      foreignKey: "commenter",
      sourceKey: "id",
    });
  }
};
