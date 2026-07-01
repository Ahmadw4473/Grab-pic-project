const uploadFile = require('../services/s3.service')
const imageModel = require('../models/image.model')
async function imageUploadController(req, res) {
    try {

        await uploadFile({
            file: req.files,
            userId: req.body.userId,
            albumId: req.body.albumId
        })
        console.log(req.files)
        res.send({ message: 'images uploaded' })
    }
    catch (error) {
        console.log(error)
    }
}

async function getImages(req, res) {
    const images = await imageModel.find({ albumId: req.body.albumId })
    res.json(images)
}


module.exports = { imageUploadController, getImages }