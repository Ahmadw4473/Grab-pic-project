const albumModel = require('../models/album.model')

async function createAlbum(req, res) {

    try {
        console.log(req.body)
        await albumModel.create({
            albumName: req.body.name,
            userId: req.body.userId,
            joiningCode: req.body.joinCode,
            members: [req.body.userId]
        })
        res.status(201).send({ message: 'album created' })
    }
    catch (error) {
        console.log('didnt get album data ', error)
        res.status(500).send({ error: 'Could not create album' })
    }
}

async function getAlbums(req, res) {
    const albums = await albumModel.find({ members: req.query.userId })
    res.json(albums)
}

async function joinAlbum(req, res) {
    const album = await albumModel.findOneAndUpdate({ joiningCode: req.body.joinCode }, {
        $addToSet: {
            members: req.body.userId
        },

    },
        { new: true }
    )
    res.json(album)
}

module.exports = { createAlbum, getAlbums, joinAlbum }