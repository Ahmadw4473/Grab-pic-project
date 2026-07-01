const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: String,
    userid: String,
    orignalName: String,
    albumId: String
})

const imageModel = mongoose.model("image", imageSchema)

module.exports = imageModel