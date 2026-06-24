const express=require('express')
const upload=require('../middlewares/multer.middleware')
const imageUploadController = require('../controllers/images.controller.js')
const router=express.Router()


router.post('/upload',upload.single('file'),imageUploadController)

module.exports=router