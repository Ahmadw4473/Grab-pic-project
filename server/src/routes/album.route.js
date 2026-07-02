const express = require('express')
const { createAlbum, getAlbums,joinAlbum } = require('../controllers/album.controller')
const router = express.Router()


router.post('/createAlbum', createAlbum)
router.get('/getAlbums', getAlbums)
router.post('/joinAlbum',joinAlbum)

module.exports = router