

const DaerahModel           = require("../models").daerah;
const {validationResult}    = require('express-validator');



const getAll = async(req,res) => {
    try {
        const getAll = await DaerahModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','deletedAt','id']
            },
        });
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
            const { nama,thumbnail,deskripsi,image} = req.body;
            const url = nama.split(" ").length > 1 ? nama.split(" ").join("-") : nama;

            await DaerahModel.create({
                nama : nama,
                thumbnail:thumbnail,
                deskripsi: deskripsi,
                image : image,
                url : url,
            });

            return res.status(201).json({
                "status": true,
                "messange": "Daerah berhasil ditambahkan",
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

        const check = await DaerahModel.findOne({
            where : {
                id : id
            }
        });
        if(!check){
            return res.status(400).json({
                "status" : false,
                "message" : `Daerah not found`
            })
        }
        const test = await DaerahModel.destroy({
            where: {
                id : id
            }
        })
        console.log(test)
        res.status(200).json({
            status : true,
            message : "Daerah berhasil Dihapus"
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
            const check = await DaerahModel.findOne({
                where : {
                    id : id
                }
            });
            if(!check){
                return res.status(400).json({
                    "status" : false,
                    "message" : `Daerah not found`
                })
            }
            const { nama,thumbnail,deskripsi,image} = req.body;
            const data = {
                nama : nama,
                thumbnail : thumbnail,
                image : image,
                deskripsi : deskripsi,
                updatedAt : Date.now()
            }
            await DaerahModel.update(data, {
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
        res.status(409).json({
            status : true,
            message : "Data gagal Diubah",
            error : error
        });
    }
}
const findDaerah = async(req,res) => {
    try {
        const {url} = req.params;
        const daerah = await DaerahModel.findOne({
            where : {
                url : url
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','deletedAt','id']
            },
        })
        return res.status(200).json({
            "status" : true,
            "data" : daerah
        })
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal didapatkan"
        });
    }
}

module.exports = {
    getAll,
    create,
    deleteByid,
    updateById,
    findDaerah
}