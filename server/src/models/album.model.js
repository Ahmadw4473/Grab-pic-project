const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: String,
    userId: String
})

const albumModel = mongoose.model('album', albumSchema)
module.exports = albumModel