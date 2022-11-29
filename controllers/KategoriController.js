

const kategoriModel         = require("../models").kategori;
const {validationResult}    = require('express-validator');
const sub_kategori          = require("../models").sub_kategori;
const course                = require("../models").course;

const create = async(req,res)=> {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                error: errors
            });
        } else {
            const { nama,gambar,deskripsi} = req.body;
            const url = nama.split(" ").length > 1 ? nama.split(" ").join("-") : nama;

            await kategoriModel.create({
                nama : nama,
                gambar:gambar,
                deskripsi: deskripsi,
                url : url,
            });

            return res.status(201).json({
                "status": true,
                "messange": "Kategori berhasil ditambahkan",
            });
        }
    } catch (error) {
        return res.status(409).json({
            "status": false,
            "message": "Data gagal ditambahkan.",
            "error" : error
        });
    }
}
const deleteByid = async (req,res) => {
    try{
        const { id } = req.params;

        const check = await kategoriModel.findOne({
            where : {
                id : id
            }
        });
        if(!check){
            return res.status(400).json({
                "status" : false,
                "message" : `kategori not found`
            })
        }
        const test = await kategoriModel.destroy({
            where: {
                id : id
            }
        })
        console.log(test)
        res.status(200).json({
            status : true,
            message : "Kategori berhasil Dihapus"
        });

    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal Diubah",
            error : error
        });
    }
}
const updateById = async(req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                errors: errors.array() 
            });
        } else {
            const {id} = req.params;
            const check = await kategoriModel.findOne({
                where : {
                    id : id
                }
            });
            if(!check){
                return res.status(400).json({
                    "status" : false,
                    "message" : `kategori not found`
                })
            }
            const { nama,gambar,deskripsi } = req.body;
            const data = {
                nama : nama,
                gambar : gambar,
                deskripsi : deskripsi,
                updatedAt : Date.now()
            }
            await kategoriModel.update(data, {
                where: {
                  id: id
                }
            });
            res.status(201).json({
                "status" : true,
                "messange" : "Data berhasil di update"
            });
        }

    } catch (error) {
        console.log(error);
    }
}
const getAll = async(req,res) => {
    try {
        const getAll =  await kategoriModel.findAll({
            attributes: ['nama','gambar','url']
          })
        return res.status(200).json({
            "status" : true,
            "data" : getAll
        })
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal didapatkan"
        });
    }
}
const findKategori = async(req,res) => {
    try {
        const {url} = req.params;
        const kategori = await kategoriModel.findOne({
            where : {
                url : url
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','deletedAt','id']
            },
            include: [
                {
                    model: sub_kategori,
                    attributes:['nama','gambar','url'],
                    include: [ 
                        {
                            model: course,
                          
                            attributes:['nama','created_by','url'],
                        }
                    ]
                },
            ]
        })
        res.status(200).json({
           status : true,
           data : kategori
        });
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal didapatkan"
        });
    }
}

module.exports = {
    create,
    getAll,
    deleteByid,
    updateById,
    findKategori
}