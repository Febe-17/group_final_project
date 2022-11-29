const express                       = require('express')
const verifyToken                   = require("../../middleware/verifyToken");
const router                        = express.Router();
const {create,findCourse}           = require("../../controllers/CourseController.js")

// router.use(verifyToken);

router.post("/course",              create);
router.get("/course/:url",          findCourse)
// router.put("/kategori/:id",        checkKategori ,updateById);
// router.delete("/kategori/:id",     deleteByid);
// router.get("/all-kategori/:url",    findKategori);
module.exports = router;
