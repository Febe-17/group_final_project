const {
    body,
    check
  } = require('express-validator');
const kategoriModel = require('../models/').kategori;
module.exports = [
    check('nama').exists().withMessage("Nama wajib diisi").isLength({ min: 5 }).withMessage('must be at least 5 chars long'), 
    check('image').exists().withMessage("Image wajib diisi"),
    check('thumbnail').exists().withMessage("thumbnail wajib diisi"),
    check('descripsi').exists().withMessage("deskripsi wajib diisi"),
]