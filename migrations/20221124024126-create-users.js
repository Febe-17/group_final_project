'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      bio: {
        type: Sequelize.TEXT
      },
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ['perempuan', 'laki-laki']
      },
      image: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'user']
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt:{
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};