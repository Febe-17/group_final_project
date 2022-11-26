

const kategoriModel         = require("../models").kategori;
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
            const { nama,gambar,deskripsi} = req.body;
            const url = nama.split(" ").join("-");
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

        checkKategori();
        await kategoriModel.destroy({
            where: {
                id : id
            }
        })
        res.status(200).json({
            status : true,
            message : "Kategori berhasil Dihapus"
        });

    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal Diubah"
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
            const { nama,gambar,deskripsi } = req.body;
            checkKategori();
            const data = {
                nama : nama,
                gambar : gambar,
                deskripsi : deskripsi,
                updateAt : Date.now()
            }
            await kategoriModel.update(data, {
                where: {
                  id: id_user
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
async function checkKategori(id){
    const check = await kategoriModel.findOne({
        where : {
            id
        }
    });
    if(!check){
        return res.status(400).json({
            "status" : false,
            "message" : `kategori with id ${id} not found`
        })
    }
}

module.exports = {
    create,
    getAll,
    deleteByid,
    updateById
}