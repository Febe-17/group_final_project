const express           = require('express')
const router            = express.Router();

const LogoutRouter      = require('./api/logout.js')

router.use("/api/auth",         LogoutRouter);


module.exports = router;