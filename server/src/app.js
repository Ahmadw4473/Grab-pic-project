const express=require('express')
const imageUploadRoute=require('./routes/images.route')
const app=express()
app.use(express.json());
app.use('/api/images/',imageUploadRoute)


module.exports=app