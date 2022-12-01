const express                           = require('express')
const verifyToken                       = require("../../middleware/verifyToken");
const router                            = express.Router();
const {getAll,create,findCourse,deleteByid}    = require("../../controllers/CourseController.js")
const checkCourse                       = require("../../validators/ValidateCreateCourse")
const authPage                          = require("../../middleware/authPage");

router.get("/course/:url",         verifyToken, findCourse)
router.get("/all-course/",         verifyToken, getAll);
router.post("/course",             verifyToken, authPage(['admin']), checkCourse, create);
router.delete("/course/:id",       verifyToken, authPage(['admin']), deleteByid);

module.exports = router;

