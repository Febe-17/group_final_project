'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const kategori = await queryInterface.bulkInsert(
      'kategori',
       [
        {
          nama: 'Seni Rupa',
          gambar : 'https://i.ibb.co/HB6F66x/Rectangle-1274.png',
          url : 'seni-rupa',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama: 'Seni Tari',
          gambar : 'https://i.ibb.co/8shkccZ/Rectangle-1273.png',
          url : 'seni-tari',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama: 'Seni Sastra',
          gambar : 'https://i.ibb.co/DLkpRGp/Rectangle-1274.png',
          url : 'seni-sastra',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama: 'Seni Musik',
          gambar : 'https://i.ibb.co/1qg8Bpm/Rectangle-1274.png',
          url : 'seni-musik',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama: 'Seni Pertujukan',
          gambar : 'https://i.ibb.co/rfhLtpY/Rectangle-1274.png',
          url : 'seni-pertunjukan',
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('kategori', null, {});
  }
};
