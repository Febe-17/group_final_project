'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daerah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daerah.init({
    nama: DataTypes.STRING,
    thumbnail: DataTypes.TEXT,
    descripsi: DataTypes.TEXT,
    image: DataTypes.TEXT,
    url: DataTypes.STRING,
    deletedAt  : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'daerah',
    tableName : 'daerah',
    paranoid: true,
  });
  return daerah;
};