const express = require('express')
const { createAlbum, getAlbums } = require('../controllers/album.controller')
const router = express.Router()


router.post('/createAlbum', createAlbum)
router.get('/getAlbums', getAlbums)

module.exports = router