"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

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

    static search(search) {
      return new Promise((resolve, reject) => {
        Course.findAll({
          where: {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
        })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => reject(err));
      });
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course Title",
          },
        },
      },
      master: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course Master",
          },
        },
      },
      urlImg: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course urlImg",
          },
        },
      },
      urlVideo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fill Course urlVideo",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Fill Course urlVideo",
          },
        },
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
