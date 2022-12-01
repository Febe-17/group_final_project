const {
    body,
    check
  } = require('express-validator');
const kategoriModel = require('../models/').kategori;
const SubKategoriModel = require('../models/').sub_kategori;
module.exports = [
 
    check('id_kategori').exists().withMessage("id_kategori wajib diisi"),
    check('nama').exists().withMessage("Nama wajib diisi").isLength({ min: 5 }).withMessage('must be at least 5 chars long'), 
    check('gambar').exists().withMessage("Gambar wajib diisi"),
    check('deskripsi').exists().withMessage("deskripsi wajib diisi"),
    body('id_kategori').custom( async (value) => {
        const CheckName = await kategoriModel.findOne({where : {id : value}});
        if (!CheckName) {
            throw new Error("Kategori Tidak ditemukan");
        }
        return true;
    }),
]