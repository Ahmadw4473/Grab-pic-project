const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: String,
    userId: String,
    joiningCode: String,
    members: [String]
})

const albumModel = mongoose.model('album', albumSchema)
module.exports = albumModel