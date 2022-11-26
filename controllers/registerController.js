const models = require('../models');
const { users } = models;
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
                const salt = await bcrypt.genSalt(10);

                const hashPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = await users.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hashPassword
                });
                res.status(201).send({
                    status: true,
                    message: "registrasi berhasil",
                    email: `${newUser.email}`
                })
        } catch (error) {
            res.status(409).send({
                status: false,
                message: "registrasi gagal"
            })
        }
    },

}