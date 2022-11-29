const models = require('../models');
const { users } = models;
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
    register: async (req, res) => {
        try {

            const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: "Data yang diberikan tidak valid",
                errors: errors.array()
              });  
        } else {
            console.log(req.body);
            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = await users.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashPassword,
                role : "user"
            });
            console.log(newUser);
            res.status(201).send({
                status: true,
                message: "registrasi berhasil",
                email: `${newUser.email}`
            })    
        }
        } catch (error) {
            res.status(409).send({
                status: false,
                message: "registrasi gagal"
            })
        }
    },

}