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
      kategori.hasMany(models.sub_kategori,{
        foreignKey: 'id_kategori'
      })
    }
  }
  kategori.init({
    nama: DataTypes.STRING,
    gambar: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    url: DataTypes.TEXT,
    deletedAt  : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'kategori',
    tableName : 'kategori',
    paranoid: true,

  });
  return kategori;
};