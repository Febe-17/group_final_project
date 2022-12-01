const express                       = require('express')
const router                        = express.Router();
const {getAll,create,deleteByid,updateById,findDaerah}           = require("../../controllers/DaerahController")
const checkDaerah                   = require("../../validators/validateCreateDaerah")
const verifyToken                   = require("../../middleware/verifyToken");
const authPage                      = require("../../middleware/authPage");

router.get("/all-daerah",           getAll);
router.get("/daerah/:url",          findDaerah)
router.post("/daerah",              verifyToken, authPage(['admin']), checkDaerah ,create);
router.put("/daerah/:id",           verifyToken, authPage(['admin']), checkDaerah ,updateById);
router.delete("/daerah/:id",        verifyToken, authPage(['admin']), deleteByid);


module.exports = router;
