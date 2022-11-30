'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_kategori.hasMany(models.course,{
        foreignKey: 'id_sub_kategori'
      })
      sub_kategori.belongsTo(models.kategori,{
        foreignKey: 'id' 
      })
    }
  }
  sub_kategori.init({
    id_kategori: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    gambar: DataTypes.TEXT,
    deskripsi: DataTypes.TEXT,
    url: DataTypes.STRING,
    deletedAt  : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sub_kategori',
    tableName : 'sub_kategori',
    paranoid: true,

  });
  return sub_kategori;
};