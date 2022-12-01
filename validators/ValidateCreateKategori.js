const {
    body,
    check
  } = require('express-validator');
const kategoriModel = require('../models/').kategori;
module.exports = [
    check('nama').exists().withMessage("Nama wajib diisi").isLength({ min: 5 }).withMessage('must be at least 5 chars long'), 
    check('gambar').exists().withMessage("Gambar wajib diisi"),
    check('deskripsi').exists().withMessage("deskripsi wajib diisi"),
]