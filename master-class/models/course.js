"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: "User_Courses",
      }),
        Course.belongsTo(models.Category);
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course Title"
          }
        }
      },
      master: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course Master"
          }
        }
      },
      urlImg: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course urlImg"
          }
        }
      },
      urlVideo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course urlVideo"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Fill Course urlVideo"
          }
        }
      },
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
