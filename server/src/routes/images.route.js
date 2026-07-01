const express=require('express')
const upload=require('../middlewares/multer.middleware')
const {imageUploadController,getImages} = require('../controllers/images.controller.js')
const router=express.Router()


router.post('/upload',upload.array('image'),imageUploadController)
router.post('/getImages',getImages)

module.exports=router