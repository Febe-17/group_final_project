const models = require('../models');
const { users } = models;
const { validationResult } = require('express-validator');

module.exports = {

  getUserByID: async (req, res) => {
    try {
      const { id } = req.params
      const user = await users.findByPk(id)
      res.status(200).send({
        status: true,
        message: "data user berhasil ditemukan",
        data: user
      })
    } catch (error) {
      res.status(409).send({
        status: false,
        message: "data user tidak dapat ditemukan"
      })
    }
  },

  getAllUser: async (req, res) => {
    try {
      const user = await users.findAll()
      res.status(200).send({
        status: true,
        message: "data user berhasil ditemukan",
        data: user
      })
    } catch (error) {
      res.status(409).send({
        status: false,
        message: "data user tidak dapat ditemukan"
      })
    }
  },

  updateUserByID: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ 
          status : false,
          message : "Data yang diberikan tidak valid",
          errors: errors.array()
        })
      } else {
        const updateUser = {
          fullname: req.body.fullname,
          tgl_lahir: req.body.tgl_lahir,
          alamat: req.body.alamat,
          updatedAt: Date.now()
        }
        await users.update(updateUser, {
          where: {
            id: req.params.id
          }
        });
        res.status(201).send({
          status: true,
          message: "data user berhasil di update"
        });
      }
    } catch (error) {
      res.status(409).send({
        status: false,
        message: "data user gagal di update"
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await user.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).send({
        status: true,
        message: "data user berhasil dihapus",
      })
    } catch (error) {
      res.status(409).send({
        status: false,
        message: "data user gagal terhapus"
      })
    }
  },

}