'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kategori.init({
    nama: DataTypes.STRING,
    gambar: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'kategori',
    tableName : 'kategori'
  });
  return kategori;
};