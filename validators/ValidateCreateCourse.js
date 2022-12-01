const {
    body,
    check
  } = require('express-validator');
const courseModel           = require("../models").course;
const kategoriModel         = require("../models").kategori;
const SubKategoriModel      = require("../models").sub_kategori;
module.exports = [
    
    check('id_sub_kategori').exists().withMessage("id sub kategori wajib diisi"),
    check('id_kategori').exists().withMessage("id kategori wajib diisi"),
    check('nama').exists().withMessage("Nama wajib diisi").isLength({ min: 5 }).withMessage('must be at least 5 chars long'), 
    check('created_by').exists().withMessage("Created By wajib diisi"),
    check('title').exists().withMessage("Title wajib diisi"),
    check('deskripsi').exists().withMessage("deskripsi wajib diisi"),
    check('type').exists().withMessage("Type wajib diisi"),
    check('link').exists().withMessage("Link wajib diisi"),
    check('thumbnail').exists().withMessage("Thumbnail wajib diisi"),
    body('id_kategori').custom( async (value) => {
        const CheckName = await kategoriModel.findOne({where : {id : value}});
        if (!CheckName) {
            throw new Error("id Kategori Tidak ditemukan");
        }
        return true;
    }),
    body('id_sub_kategori').custom( async (value) => {
        const CheckName = await SubKategoriModel.findOne({where : {id : value}});
        if (!CheckName) {
            throw new Error("id Sub Kategori Tidak ditemukan");
        }
        return true;
    }),
    
   
]