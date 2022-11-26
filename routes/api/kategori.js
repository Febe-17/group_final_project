const express           = require('express')
const verifyToken       = require("../../middleware/verifyToken");
const router            = express.Router();
const {create,getAll,deleteByid,updateById}          = require("../../controllers/KategoriController")
const checkKategori  = require("../../validators/ValidateCreateKategori")

// router.use(verifyToken);

router.get("/get-all-kategori",    getAll);
router.post("/kategori",           checkKategori ,create);
router.put("/kategori/:id",        checkKategori ,updateById);
router.delete("/kategori/:id",     deleteByid);

module.exports = router;

