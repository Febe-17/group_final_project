
const Users                 = require("../models").users;
const bcrypt                = require("bcrypt");
const jwt                   = require("jsonwebtoken");
const {validationResult}    = require('express-validator');


const login = async (req, res) => {
    try {
        console.log(req.body.email);
        if(!req.body.email) return res.status(422).json({"status":false,"message" : "Email wajib diisi"});
        if(!req.body.password) return res.status(422).json({"status":false,"message" : "Password wajib diisi"});
        const User = await Users.findOne({where : {email : req.body.email}})
        if(!User){
            return res.status(422).json({
                "status": false,
                "message": "Email Tidak Terdaftar."
            });
        } 
        const check = await bcrypt.compare(req.body.password, User.password);
      
        if(!check){
            return res.status(422).json({
                "status": false,
                "message": "Password Anda Salah."
            });
        } 
      
        const user_id = User.id;
        const nama = User.nama;
        const email = User.email;
        const accessToken = jwt.sign({user_id,nama,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '60s'
        });
         const refreshToken = jwt.sign({user_id,nama,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        const getUser = await Users.update(
            {refresh_token: refreshToken},
            {
            where: {
                id: user_id }
         });
        res.cookie('jwt', refreshToken, {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            "status": true,
            "access_token": accessToken,
            "refresh_token": refreshToken,
        });
    } catch (error) {
        return res.status(409).json({
            "status": false,
            "message": "gagal Login."
        });
    }
}


module.exports = {
    login
}