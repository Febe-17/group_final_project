const express           = require('express')
const verifyToken       = require("../../middleware/verifyToken");
const router            = express.Router();
const {create,findSubKategori,deleteByid,updateById}          = require("../../controllers/SubKategoriController")
const checkCreateSubKategori  = require("../../validators/ValidateCreteSubKategori")
const checkUpdateSubKategori  = require("../../validators/ValidateUpdateSubKategori")


router.get("/sub-kategori/:url",        verifyToken, findSubKategori);
router.post("/sub-kategori",            verifyToken, checkCreateSubKategori, create);
router.put("/sub-kategori/:id",         verifyToken, checkUpdateSubKategori, updateById);
router.delete("/sub-kategori/:id",      verifyToken, deleteByid);

module.exports = router;

