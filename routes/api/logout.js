const express           = require('express')
const {logout}          = require("../../controllers/LogoutController")
const verifyToken       = require("../../middleware/verifyToken");
const router            = express.Router();

router.post("/logout",     verifyToken,logout);

module.exports = router;