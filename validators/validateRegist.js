const {
    body,
    check
  } = require('express-validator');
const User = require('../models').users;

module.exports = [
    check('fullname').exists().withMessage("Fullname wajib diisi"),
    check('email').exists().withMessage("Email wajib diisi"),
    check('password').exists().withMessage("Password wajib diisi"),
    check('password_confirmation').exists().withMessage("Password Confirmation wajib diisi"),
    check("password").isLength({min: 6 }).withMessage("Password Wajib 6 karakter"),
    body('email').custom( async (value) => {
        const duplikat = await User.findOne({where : {email : value}});
        if (duplikat) {
            throw new Error("Email Anda Telah digunakan");
        }
        return true;
    }),
    check("password").custom( async (value,{req}) => {
        if (value != req.body.password_confirmation ) {
            throw new Error("Password dan Confirm Password tidak sama");
        }
        return true;
    }),
]
