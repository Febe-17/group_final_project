const express           = require('express')
const router            = express.Router();
const userValidate = require("../../validate/validateUser")

const {
    getAllUser,
    getUserByID,
    updateUserByID,
    deleteUser,
  } = require("../../controllers/adminController");
  

router.get("/", getAllUser);
router.get("/:id", getUserByID);
router.put("/update/:id", userValidate, updateUserByID);
router.delete("/delete_user/:id", deleteUser);

module.exports = router;