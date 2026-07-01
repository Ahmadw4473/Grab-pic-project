const express=require('express')
const createAlbumControlelr=require('../controllers/album.controller')
const router=express.Router()


router.post('/createAlbum',createAlbumControlelr)

module.exports=router