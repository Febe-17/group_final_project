const express = require('express')
const registerValidate  = require("../../validators/validateRegist")
const router = express.Router();

const {register}  = require("../../controllers/registerController")
router.post("/register", registerValidate, register);

module.exports = router;