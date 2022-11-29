

const courseModel           = require("../models").course;
const courseSectionModel    = require("../models").course_section;
const contentCourseModel    = require("../models").content_course;
const {validationResult}    = require('express-validator');
const {sequelize}           = require('../models')

const create = async(req,res)=> {
    const db = await sequelize.transaction();
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await db.commit();
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                error: errors
            });
        } else {
            const { id_sub_kategori,nama,created_by,title,deskripsi,type,link} = req.body;
            const url = nama.split(" ").length > 1 ? nama.split(" ").join("-") : nama;

            let course =  await courseModel.create({
                id_sub_kategori : id_sub_kategori,
                nama:nama,
                created_by: created_by,
                url : url,
            });
            const id_course = course.id;
            if(title.length > 0 ){
                for(let i = 0; i < title.length; i++){
                    console.log(type[i])
                    const courseSetion =  await courseSectionModel.create({
                        id_course : id_course,
                        title: title[i],
                        deskripsi: deskripsi[i]
                    });
                    const id_courseSetion = courseSetion.id;
                    await contentCourseModel.create({
                        id_course_section : id_courseSetion,
                        type: type[i],
                        link: link[i]
                    });
                }
            }
            await db.commit();
            return res.status(201).json({
                "status": true,
                "messange": "Kategori berhasil ditambahkan",
            });
          
        }
       
    } catch (error) {
        await db.rollback();
        return res.status(409).json({
            "status": false,
            "message": "Data gagal ditambahkan.",
            "error" : error
        });
    }
}

const findCourse =  async (req,res) => {
    try {
        const {url} = req.params;
        const getCourseByUrl = await courseModel.findOne({
            where : {
                url : url
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','deletedAt','id']
            },
            include: [
                {
                    model: courseSectionModel,
                    attributes:['title','deskripsi'],
                    include: [ 
                        {
                            model: contentCourseModel,
                            attributes:['link','type'],
                        }
                    ]
                },
            ]
        })
        return res.status(200).json({
            "status" : true,
            "data" : getCourseByUrl
        })
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal didapatkan"
        });
    }
}
const deleteByid = async (req,res) => {
    try{
        const { id } = req.params;

        const check = await courseModel.findOne({
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
        const test = await courseModel.destroy({
            where: {
                id : id
            }
        }).then((resp) => {
            
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

module.exports = {
    create,
    findCourse
}