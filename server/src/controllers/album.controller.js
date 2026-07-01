const albumModel = require('../models/album.model')

async function createAlbum(req, res) {

    try {
        console.log(req.body)
        albumModel.create({
            albumName: req.body.name,
            userId: req.body.userId
        })
        res.status(201).send({ message: 'album created' })
    }
    catch (error) {
        console.log('didnt get album data ', error)
        res.status(500).send({ error: 'Could not create album' })
    }
}

async function getAlbums(req, res) {
    const albums = await albumModel.find({})
    res.json(albums)
}

module.exports = { createAlbum, getAlbums }