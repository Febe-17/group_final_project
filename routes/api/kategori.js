const express           = require('express')
const verifyToken       = require("../../middleware/verifyToken");
const router            = express.Router();
const {create,getAll,deleteByid,updateById,findKategori}          = require("../../controllers/KategoriController")
const checkKategori     = require("../../validators/ValidateCreateKategori")
const authPage          = require("../../middleware/authPage");

router.get("/all-kategori",        verifyToken, getAll);
router.post("/kategori",           verifyToken, authPage(['admin']), checkKategori ,create);
router.put("/kategori/:id",        verifyToken, authPage(['admin']), checkKategori ,updateById);
router.delete("/kategori/:id",     verifyToken, authPage(['admin']), deleteByid);
router.get("/all-kategori/:url",   verifyToken, findKategori);

module.exports = router;
