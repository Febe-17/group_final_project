const express           = require('express')
const router            = express.Router();
const userValidate = require("../../validate/validateUser")

const {
    getAllUser,
    getUserByID,
    updateUserByID,
  } = require("../../controllers/userController");
  

router.get("/", getAllUser);
router.get("/:id", getUserByID);
router.put("/update/:id", userValidate, updateUserByID);

module.exports = router;