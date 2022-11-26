const {
    body,
    check
  } = require('express-validator');
const kategoriModel = require('../models/').kategori;
module.exports = [
    check('nama').exists().withMessage("Nama wajib diisi").isLength({ min: 5 })
    
    .withMessage('must be at least 5 chars long'), body('nama').custom( async (value) => {
        const CheckName = await kategoriModel.findOne({where : {nama : value}});
        if (CheckName) {
            throw new Error("Nama Kategori Telah digunakan");
        }
        return true;
    }),
    check('gambar').exists().withMessage("Gambar wajib diisi"),
    check('deskripsi').exists().withMessage("deskripsi wajib diisi"),
   
]