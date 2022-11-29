'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content_course.init({
    id_course_section: DataTypes.INTEGER,
    link: DataTypes.TEXT,
    type : DataTypes.ENUM({
      values: ['image', 'video']
    })
  }, {
    sequelize,
    modelName: 'content_course',
    tableName : 'content_course',
    paranoid: true,
  });
  return content_course;
};