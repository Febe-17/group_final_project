

const SubKategoriModel         = require("../models").sub_kategori;
const {validationResult}    = require('express-validator');

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
            const { id_kategori, nama,gambar,deskripsi} = req.body;
            const url = nama.split(" ").length > 1 ? nama.split(" ").join("-") : nama;

            await SubKategoriModel.create({
                id_kategori : id_kategori,
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

        const check = await SubKategoriModel.findOne({
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
        const test = await SubKategoriModel.destroy({
            where: {
                id : id
            }
        })
        console.log(test)
        res.status(200).json({
            status : true,
            message : "SubKategori berhasil Dihapus"
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
            const check = await SubKategoriModel.findOne({
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
            const {id_kategori, nama,gambar,deskripsi } = req.body;
            const data = {
                id_kategori : id_kategori,
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
const findSubKategori = async(req,res) => {
    try {
        const {url} = req.params;
        const subkategori = await SubKategoriModel.findOne({
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

module.exports = {
    create,
    deleteByid,
    updateById,
    findSubKategori
}