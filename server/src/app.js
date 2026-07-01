const express=require('express')
const imageUploadRoute=require('./routes/images.route')
const albumCreateRoute=require('./routes/album.route')
const app=express()

app.use(express.json());
app.use('/api/images/',imageUploadRoute)
app.use('/api/Albums/',albumCreateRoute)


module.exports=app