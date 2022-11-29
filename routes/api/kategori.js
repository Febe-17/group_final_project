const express           = require('express')
const verifyToken       = require("../../middleware/verifyToken");
const router            = express.Router();
const {create,getAll,deleteByid,updateById,findKategori}          = require("../../controllers/KategoriController")
const checkKategori     = require("../../validators/ValidateCreateKategori")

router.get("/all-kategori",         getAll);
router.post("/kategori",           verifyToken, checkKategori ,create);
router.put("/kategori/:id",        verifyToken, checkKategori ,updateById);
router.delete("/kategori/:id",     verifyToken, deleteByid);
router.get("/all-kategori/:url",   verifyToken, findKategori);

module.exports = router;

