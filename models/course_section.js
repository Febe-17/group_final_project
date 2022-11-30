'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_section.hasOne(models.content_course,{
        foreignKey: 'id_course_section'
      })
    }
  }
  course_section.init({
    id_course: DataTypes.INTEGER,
    title: DataTypes.STRING,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'course_section',
    tableName : 'course_section',
    paranoid: true,
  });
  return course_section;
};