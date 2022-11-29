const express           = require('express')
const router            = express.Router();

// const LoginRouter        = require('./api/login.js')
const registerRouter = require('./api/register')
const userRouter = require('./api/user')

// api

// cth route login
// router.use("/api/auth",         LoginRouter);

router.use("/api/auth",         registerRouter);
router.use("/api/user",         userRouter);


module.exports = router;