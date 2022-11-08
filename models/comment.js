const Sequelize = require("sequelize");

//  Sequelize : id를 기본 키로 연결, 나머지 컬럼의 스펙은 정확하게 일치하도록 입력
// User = Sequelize.Model의 확장 class
// init(method) = 테이블 설정
// associate(method) = 다른 모델과의 관계
// super.init = p1:테이블 컬럼 설정, p2:테이블 자체 설정
module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "commenter",
      targetKey: "id",
    });
  }
};
