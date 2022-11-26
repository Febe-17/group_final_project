const express           = require('express')
const router            = express.Router();

// const LoginRouter        = require('./api/login.js')
const registerRouter = require('./api/register.js')

// api

// cth route login
// router.use("/api/auth",         LoginRouter);
router.use("/api/auth", registerRouter);


module.exports = router;
