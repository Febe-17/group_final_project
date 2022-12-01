'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.hasMany(models.course_section,{
        foreignKey: 'id_course'
      })
      course.hasOne(models.kategori,{
        foreignKey: 'id'
      })
    }
  }
  course.init({
    id_sub_kategori: DataTypes.INTEGER,
    id_kategori : DataTypes.INTEGER,
    thumbnail :  DataTypes.TEXT,
    nama: DataTypes.STRING,
    created_by: DataTypes.STRING,
    url: DataTypes.TEXT,
    deletedAt  : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'course',
    tableName : 'course',
    paranoid: true,
  });
  return course;
};