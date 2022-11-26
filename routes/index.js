const express           = require('express')
const router            = express.Router();
const LoginRouter       = require('./api/login.js')
const LogoutRouter      = require('./api/logout.js')
const KategoriRouter    = require("./api/kategori.js");

router.use("/api/auth",         LogoutRouter);
router.use("/api/auth",         LoginRouter);
router.use("/api",              KategoriRouter);


module.exports = router;