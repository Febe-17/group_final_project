const express               = require('express')
const router                = express.Router();
const LoginRouter           = require('./api/login.js')
const LogoutRouter          = require('./api/logout.js')
const registerRouter        = require('./api/register')
const KategoriRouter        = require("./api/kategori.js");
const SubKategoriRouter     = require("./api/sub_kategori.js");
const CourseRouter          = require("./api/course.js");
const DaerahRouter          = require("./api/daerah");
const userRouter            = require('./api/user')

router.use("/api/auth",         registerRouter);
router.use("/api/auth",         LoginRouter);
router.use("/api/auth",         LogoutRouter);


router.use("/api",              KategoriRouter);
router.use("/api",              SubKategoriRouter);
router.use("/api",              CourseRouter);
router.use("/api",              DaerahRouter);

router.use("/api/user",         userRouter);

module.exports = router;