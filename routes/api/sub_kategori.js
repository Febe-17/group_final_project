const express           = require('express')
const verifyToken       = require("../../middleware/verifyToken");
const authPage          = require("../../middleware/authPage");
const router            = express.Router();
const {getAll,create,findSubKategori,deleteByid,updateById}          = require("../../controllers/SubKategoriController")
const checkCreateSubKategori  = require("../../validators/ValidateCreteSubKategori")
const checkUpdateSubKategori  = require("../../validators/ValidateUpdateSubKategori")

router.get("/sub-kategori/",            verifyToken, authPage(['admin']), getAll);
router.get("/sub-kategori/:url",        verifyToken, findSubKategori);
router.post("/sub-kategori",            verifyToken, authPage(['admin']),checkCreateSubKategori, create);
router.put("/sub-kategori/:id",         verifyToken, authPage(['admin']),checkUpdateSubKategori, updateById);
router.delete("/sub-kategori/:id",      verifyToken, authPage(['admin']),deleteByid);

module.exports = router;

