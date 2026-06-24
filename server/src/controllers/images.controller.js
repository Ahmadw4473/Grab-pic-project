const uploadFile = require('../services/s3.service')
async function imageUploadController(req,res){
    try{
        await uploadFile({
            file: req.file,
            userId: req.body.userId 
        })
     res.send("file sent to the service")
    }
    catch(error){
        console.log(error)
    }
}


module.exports=imageUploadController